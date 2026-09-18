import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useEffectSettings } from '../../context/EffectSettingsContext';

interface EngineeringCoreCanvasProps {
  activeNodeIndex?: number | null;
}

export const EngineeringCoreCanvas: React.FC<EngineeringCoreCanvasProps> = ({ activeNodeIndex }) => {
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
      camera.position.set(0, 0, 6.2);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;

      // Lights
      const ambientLight = new THREE.AmbientLight(0x16181f, 1.5);
      scene.add(ambientLight);

      const topLight = new THREE.DirectionalLight(0xffffff, 2.2);
      topLight.position.set(1, 3, 4);
      scene.add(topLight);

      const rimWhite = new THREE.DirectionalLight(0xdde5ff, 3.0);
      rimWhite.position.set(-3, 2, -2);
      scene.add(rimWhite);

      // Central core group
      const coreGroup = new THREE.Group();

      // Mirror chrome material
      const chromeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xcccccc,
        metalness: 0.95,
        roughness: 0.08,
        clearcoat: 1.0,
      });

      // Dark machined graphite material
      const graphiteMaterial = new THREE.MeshStandardMaterial({
        color: 0x181a1f,
        metalness: 0.8,
        roughness: 0.25,
      });

      // Central Hub
      const hubGeo = new THREE.CylinderGeometry(1.1, 1.2, 0.45, 48);
      const hubMesh = new THREE.Mesh(hubGeo, graphiteMaterial);
      coreGroup.add(hubMesh);

      // Chrome cap on hub
      const capGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.15, 48);
      const capMesh = new THREE.Mesh(capGeo, chromeMaterial);
      capMesh.position.y = 0.25;
      coreGroup.add(capMesh);

      // 6 Radial Conduits and Peripheral Nodes
      const channelMeshes: THREE.Mesh[] = [];
      const pulseMaterials: THREE.MeshBasicMaterial[] = [];

      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const channelGroup = new THREE.Group();
        channelGroup.rotation.z = angle;

        // Arm
        const armGeo = new THREE.BoxGeometry(0.2, 1.8, 0.15);
        const armMesh = new THREE.Mesh(armGeo, graphiteMaterial);
        armMesh.position.y = 1.6;
        channelGroup.add(armMesh);

        // Orange Energy Conduit line
        const conduitGeo = new THREE.BoxGeometry(0.06, 1.6, 0.08);
        const pulseMat = new THREE.MeshBasicMaterial({
          color: 0xff5500,
          transparent: true,
          opacity: 0.4,
        });
        pulseMaterials.push(pulseMat);
        const conduitMesh = new THREE.Mesh(conduitGeo, pulseMat);
        conduitMesh.position.y = 1.6;
        conduitMesh.position.z = 0.06;
        channelGroup.add(conduitMesh);

        // Peripheral Node
        const nodeGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 24);
        const nodeMesh = new THREE.Mesh(nodeGeo, chromeMaterial);
        nodeMesh.position.y = 2.6;
        channelGroup.add(nodeMesh);

        coreGroup.add(channelGroup);
        channelMeshes.push(conduitMesh);
      }

      scene.add(coreGroup);

      // Visibility and observer
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

        // Slow 45-second rotation
        coreGroup.rotation.z = elapsedTime * 0.14;

        // Controlled signal pulse traveling through channels
        pulseMaterials.forEach((mat, idx) => {
          if (activeNodeIndex === idx) {
            mat.opacity = 0.95;
            mat.color.setHex(0xff7722);
          } else {
            const wave = Math.sin(elapsedTime * 1.5 - idx * 1.05);
            mat.opacity = THREE.MathUtils.clamp(wave * 0.6 + 0.3, 0.15, 0.85);
            mat.color.setHex(0xff5500);
          }
        });

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

        hubGeo.dispose();
        capGeo.dispose();
        chromeMaterial.dispose();
        graphiteMaterial.dispose();
        pulseMaterials.forEach((m) => m.dispose());
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('Engineering 3D WebGL failed, using static fallback:', err);
      setUseFallback(true);
      if (renderer) {
        (renderer as THREE.WebGLRenderer).dispose();
      }
    }
  }, [shouldRenderStatic, activeNodeIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[480px] lg:max-w-[560px] mx-auto flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-radial-gradient from-chrome-orange/15 via-transparent to-transparent blur-3xl opacity-50 pointer-events-none" />

      {shouldRenderStatic ? (
        <picture className="w-full h-full object-contain relative z-10 flex items-center justify-center">
          <source srcSet="/assets/03-infrastructure-core.png" type="image/png" />
          <img
            src="/assets/03-infrastructure-core.png"
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
