import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useEffectSettings } from '../../context/EffectSettingsContext';

export const CVBridgeCanvas: React.FC = () => {
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
      scene.background = new THREE.Color(0xf4f1ea);

      const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
      camera.position.set(0, 0.8, 5.0);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;

      // Soft daylight lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
      keyLight.position.set(2, 4, 3);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xf0ece1, 1.0);
      fillLight.position.set(-3, 2, 2);
      scene.add(fillLight);

      const sculptureGroup = new THREE.Group();

      // Platform 1 (Left Lower Stone Slab)
      const stoneMat = new THREE.MeshStandardMaterial({
        color: 0xe6e1d5,
        roughness: 0.8,
        metalness: 0.1,
      });
      const slab1Geo = new THREE.BoxGeometry(1.4, 0.5, 1.0);
      const slab1 = new THREE.Mesh(slab1Geo, stoneMat);
      slab1.position.set(-1.1, -0.6, 0);
      sculptureGroup.add(slab1);

      // Platform 2 (Right Elevated Stone Column)
      const slab2Geo = new THREE.BoxGeometry(0.8, 1.1, 0.8);
      const slab2 = new THREE.Mesh(slab2Geo, stoneMat);
      slab2.position.set(1.2, -0.3, 0);
      sculptureGroup.add(slab2);

      // Liquid Chrome Bridge Material
      const chromeMat = new THREE.MeshPhysicalMaterial({
        color: 0xeeeeef,
        metalness: 0.98,
        roughness: 0.04,
        clearcoat: 1.0,
      });

      // Arching Bridge Curve
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.45, -0.35, 0),
        new THREE.Vector3(0.35, 0.6, 0.1),
        new THREE.Vector3(0.85, 0.25, 0)
      );
      const bridgeGeo = new THREE.TubeGeometry(curve, 32, 0.09, 16, false);
      const bridge = new THREE.Mesh(bridgeGeo, chromeMat);
      sculptureGroup.add(bridge);

      // Accent Electric Orange Sphere at Connection Apex
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xff5500,
        emissive: 0xff5500,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.3,
      });
      const sphereGeo = new THREE.SphereGeometry(0.12, 32, 32);
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(0.85, 0.38, 0);
      sculptureGroup.add(sphere);

      // Gyroscopic Liquid Chrome Ring around Apex
      const ringGeo = new THREE.TorusGeometry(0.38, 0.02, 24, 64);
      const ringMesh = new THREE.Mesh(ringGeo, chromeMat);
      ringMesh.position.set(0.85, 0.38, 0);
      ringMesh.rotation.x = Math.PI * 0.35;
      ringMesh.rotation.y = Math.PI * 0.2;
      sculptureGroup.add(ringMesh);

      // Outer Molten Orange Accent Ring
      const orangeRingGeo = new THREE.TorusGeometry(0.52, 0.012, 24, 64);
      const orangeRingMesh = new THREE.Mesh(orangeRingGeo, sphereMat);
      orangeRingMesh.position.set(0.85, 0.38, 0);
      orangeRingMesh.rotation.x = -Math.PI * 0.25;
      orangeRingMesh.rotation.y = Math.PI * 0.4;
      sculptureGroup.add(orangeRingMesh);

      // Orbiting Energy Satellite traversing the Bridge
      const satelliteGeo = new THREE.SphereGeometry(0.065, 24, 24);
      const satelliteMesh = new THREE.Mesh(satelliteGeo, chromeMat);
      sculptureGroup.add(satelliteMesh);

      scene.add(sculptureGroup);

      // Pointer Parallax
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.3;
        targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.2;
      };
      window.addEventListener('pointermove', handlePointerMove, { passive: true });

      // Visibility
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

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // Smooth Parallax
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Base oscillation + pointer tilt
        const baseAngle = Math.sin((elapsedTime * Math.PI * 2) / 12) * 0.044;
        sculptureGroup.rotation.y = baseAngle + currentMouseX * 0.35;
        sculptureGroup.rotation.x = currentMouseY * 0.25;

        // Animate Gyroscopic Rings around Apex
        ringMesh.rotation.z = elapsedTime * 0.4;
        orangeRingMesh.rotation.z = -elapsedTime * 0.5;

        // Orbiting Satellite traversing bridge curve
        const t = (Math.sin(elapsedTime * 0.8) + 1) / 2; // 0 to 1
        const pt = curve.getPoint(t);
        satelliteMesh.position.set(pt.x, pt.y + 0.05, pt.z);

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        observer.disconnect();

        slab1Geo.dispose();
        slab2Geo.dispose();
        bridgeGeo.dispose();
        sphereGeo.dispose();
        ringGeo.dispose();
        orangeRingGeo.dispose();
        satelliteGeo.dispose();

        stoneMat.dispose();
        chromeMat.dispose();
        sphereMat.dispose();
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('CV Bridge 3D WebGL failed, using static fallback:', err);
      setUseFallback(true);
      if (renderer) {
        (renderer as THREE.WebGLRenderer).dispose();
      }
    }
  }, [shouldRenderStatic]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] w-full rounded overflow-hidden bg-stone-200/50 shadow-sm border border-stone-300 pointer-events-none"
      aria-hidden="true"
    >
      {shouldRenderStatic ? (
        <picture className="w-full h-full object-cover block">
          <source srcSet="/assets/04-cv-object.png" type="image/png" />
          <img
            src="/assets/04-cv-object.png"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-right select-none scale-110"
            width={480}
            height={270}
          />
        </picture>
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          tabIndex={-1}
        />
      )}
    </div>
  );
};
