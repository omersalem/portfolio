import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useEffectSettings } from '../../context/EffectSettingsContext';

export const ContactLoopCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion, reducedEffects, webGLSupported, saveData } = useEffectSettings();
  const [useFallback, setUseFallback] = useState(false);

  const shouldRenderStatic = reducedMotion || reducedEffects || !webGLSupported || saveData || useFallback;

  useEffect(() => {
    if (shouldRenderStatic || !canvasRef.current || !containerRef.current) return;

    let animationFrameId: number;
    let isVisible = true;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0, 5.5);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // Studio Environment for Liquid Chrome Reflections
      const envCanvas = document.createElement('canvas');
      envCanvas.width = 512;
      envCanvas.height = 256;
      const ctx = envCanvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 0, 256);
        grad.addColorStop(0, '#040507');
        grad.addColorStop(0.18, '#1e2129');
        grad.addColorStop(0.32, '#ffffff'); // bright studio softbox
        grad.addColorStop(0.45, '#242834');
        grad.addColorStop(0.7, '#08090b');
        grad.addColorStop(0.85, '#ff5500'); // orange horizon reflection
        grad.addColorStop(1.0, '#040507');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 256);
      }
      const envTexture = new THREE.CanvasTexture(envCanvas);
      envTexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envTexture;

      // Studio Lights
      const ambientLight = new THREE.AmbientLight(0x20242e, 1.5);
      scene.add(ambientLight);

      // Key light from top
      const topLight = new THREE.DirectionalLight(0xffffff, 3.5);
      topLight.position.set(2, 4, 3);
      scene.add(topLight);

      // White edge rim light
      const whiteRim = new THREE.DirectionalLight(0xffffff, 5.0);
      whiteRim.position.set(-3.5, 2, -2);
      scene.add(whiteRim);

      // Warm electric-orange bounce light from below/horizon
      const orangeBounce = new THREE.PointLight(0xff5500, 7.0, 16);
      orangeBounce.position.set(0, -2.5, 1.5);
      scene.add(orangeBounce);

      // Liquid Chrome Material
      const chromeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xe8e9ed,
        metalness: 0.98,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
      });

      // Continuous, Closed Abstract Chrome Torus Knot
      // Explicitly closed and symmetrical — never resembles a "G" or letterform
      const torusGeo = new THREE.TorusGeometry(1.55, 0.45, 64, 128);
      const torusMesh = new THREE.Mesh(torusGeo, chromeMaterial);
      torusMesh.rotation.x = Math.PI * 0.28;
      torusMesh.rotation.y = Math.PI * 0.15;
      scene.add(torusMesh);

      // Inner delicate floating orbit ring
      const innerRingGeo = new THREE.TorusGeometry(2.3, 0.02, 32, 120);
      const innerRingMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.02,
      });
      const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
      innerRing.rotation.x = Math.PI * 0.45;
      scene.add(innerRing);

      // Observer & Visibility
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting && !document.hidden;
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      const handleVisibilityChange = () => {
        isVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      const handleResize = () => {
        if (!container || !renderer) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener('resize', handleResize);

      // Animation Loop (Slow rotation: ~36 seconds per revolution)
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // Continuous slow rotation on multiple axes
        torusMesh.rotation.y = elapsedTime * 0.17;
        torusMesh.rotation.x = Math.PI * 0.28 + Math.sin(elapsedTime * 0.1) * 0.08;

        innerRing.rotation.z = -elapsedTime * 0.12;

        // Gentle orange reflection sweep across underside
        orangeBounce.position.x = Math.sin(elapsedTime * 0.3) * 2.0;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        observer.disconnect();

        torusGeo.dispose();
        innerRingGeo.dispose();
        chromeMaterial.dispose();
        innerRingMat.dispose();
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('Contact 3D WebGL failed, using static fallback:', err);
      setUseFallback(true);
      if (renderer) {
        (renderer as THREE.WebGLRenderer).dispose();
      }
    }
  }, [shouldRenderStatic]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[480px] lg:max-w-[540px] mx-auto flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-radial-gradient from-chrome-orange/15 via-transparent to-transparent blur-3xl opacity-50 pointer-events-none" />

      {shouldRenderStatic ? (
        <picture className="w-full h-full object-contain relative z-10 flex items-center justify-center">
          <source srcSet="/assets/05-contact-object.png" type="image/png" />
          <img
            src="/assets/05-contact-object.png"
            alt=""
            className="w-full h-full object-contain filter contrast-105 drop-shadow-2xl"
            loading="lazy"
            width={600}
            height={600}
          />
        </picture>
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full relative z-10 block"
          tabIndex={-1}
        />
      )}
    </div>
  );
};
