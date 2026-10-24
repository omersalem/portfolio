import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useEffectSettings } from '../../context/EffectSettingsContext';
import { useNearViewport } from '../../hooks/useNearViewport';

interface EngineeringCoreCanvasProps {
  activeNodeIndex?: number | null;
}

export const EngineeringCoreCanvas: React.FC<EngineeringCoreCanvasProps> = ({ activeNodeIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion, reducedEffects, webGLSupported, saveData } = useEffectSettings();
  const [useFallback, setUseFallback] = useState(false);
  const activeNodeRef = useRef<number | null | undefined>(activeNodeIndex);
  activeNodeRef.current = activeNodeIndex;

  const nearViewport = useNearViewport(containerRef);
  const shouldRenderStatic = reducedMotion || reducedEffects || !webGLSupported || saveData || useFallback || !nearViewport;

  useEffect(() => {
    if (shouldRenderStatic || !canvasRef.current || !containerRef.current) return;

    let animationFrameId: number;
    let isVisible = true;
    let inView = true;
    const updateVisible = () => {
      isVisible = inView && !document.hidden;
    };
    let renderer: THREE.WebGLRenderer | null = null;
    const armDisposables: { dispose: () => void }[] = [];

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

      // Soft pastel studio environment so metals read as pearl instead of black
      const envCanvas = document.createElement('canvas');
      envCanvas.width = 512;
      envCanvas.height = 256;
      const envCtx = envCanvas.getContext('2d');
      if (envCtx) {
        const grad = envCtx.createLinearGradient(0, 0, 0, 256);
        grad.addColorStop(0, '#2a2550');
        grad.addColorStop(0.3, '#f4f0ff'); // soft key softbox
        grad.addColorStop(0.5, '#c3b8ff');
        grad.addColorStop(0.72, '#1e1b3a');
        grad.addColorStop(0.88, '#ffb59a');
        grad.addColorStop(1, '#17142d');
        envCtx.fillStyle = grad;
        envCtx.fillRect(0, 0, 512, 256);
        envCtx.fillStyle = 'rgba(142, 227, 245, 0.45)';
        envCtx.fillRect(60, 50, 110, 50);
      }
      const envTexture = new THREE.CanvasTexture(envCanvas);
      envTexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envTexture;

      // Lights
      const ambientLight = new THREE.AmbientLight(0x2a2550, 1.6);
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
        color: 0xf4f0ff,
        metalness: 0.9,
        roughness: 0.14,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
      });

      // Soft lilac satin material
      const graphiteMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x3a3366,
        metalness: 0.45,
        roughness: 0.32,
        clearcoat: 0.7,
        clearcoatRoughness: 0.2,
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

      // 6 Radial Conduits and Peripheral Nodes with Multi-Color Tech Spectrum
      const channelMeshes: THREE.Mesh[] = [];
      const pulseMaterials: THREE.MeshBasicMaterial[] = [];
      const nodeColors = [
        0x8ee3f5, // 01 Cisco Core: Cyan
        0xff9e7d, // 02 Firewalls & WAF: Orange
        0xc4a8ff, // 03 Active Directory: Purple
        0x93c9ff, // 04 Exchange: Sky Blue
        0x7fe0b8, // 05 SCCM: Emerald
        0xf2a7d8, // 06 AI Agents: Magenta
      ];

      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const channelGroup = new THREE.Group();
        channelGroup.rotation.z = angle;

        // Arm
        const armGeo = new THREE.BoxGeometry(0.2, 1.8, 0.15);
        armDisposables.push(armGeo);
        const armMesh = new THREE.Mesh(armGeo, graphiteMaterial);
        armMesh.position.y = 1.6;
        channelGroup.add(armMesh);

        // Radiant Multi-Color Energy Conduit line
        const conduitGeo = new THREE.BoxGeometry(0.08, 1.6, 0.1);
        const pulseMat = new THREE.MeshBasicMaterial({
          color: nodeColors[i],
          transparent: true,
          opacity: 0.6,
        });
        pulseMaterials.push(pulseMat);
        armDisposables.push(conduitGeo);
        const conduitMesh = new THREE.Mesh(conduitGeo, pulseMat);
        conduitMesh.position.y = 1.6;
        conduitMesh.position.z = 0.06;
        channelGroup.add(conduitMesh);

        // Peripheral Node with Chrome & Color Accent
        const nodeGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 24);
        armDisposables.push(nodeGeo);
        const nodeMesh = new THREE.Mesh(nodeGeo, chromeMaterial);
        nodeMesh.position.y = 2.6;
        channelGroup.add(nodeMesh);

        // Glowing Core LED on each node
        const ledGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const ledMat = new THREE.MeshBasicMaterial({ color: nodeColors[i] });
        armDisposables.push(ledGeo, ledMat);
        const ledMesh = new THREE.Mesh(ledGeo, ledMat);
        ledMesh.position.set(0, 2.75, 0.05);
        channelGroup.add(ledMesh);

        coreGroup.add(channelGroup);
        channelMeshes.push(conduitMesh);
      }

      scene.add(coreGroup);

      // Visibility and observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            inView = entry.isIntersecting;
            updateVisible();
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      const handleVisibilityChange = () => {
        updateVisible();
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

        // Controlled multi-spectral signal pulse traveling through channels
        pulseMaterials.forEach((mat, idx) => {
          if (activeNodeRef.current === idx) {
            mat.opacity = 1.0;
            mat.color.setHex(0xffffff); // White-hot blaze on active
          } else {
            const wave = Math.sin(elapsedTime * 2.2 - idx * 1.05);
            mat.opacity = THREE.MathUtils.clamp(wave * 0.45 + 0.45, 0.2, 0.95);
            mat.color.setHex(nodeColors[idx]);
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
        envTexture.dispose();
        pulseMaterials.forEach((m) => m.dispose());
        armDisposables.forEach((d) => d.dispose());
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('Engineering 3D WebGL failed, using static fallback:', err);
      setUseFallback(true);
      if (renderer) {
        (renderer as THREE.WebGLRenderer).dispose();
      }
    }
  }, [shouldRenderStatic]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[480px] lg:max-w-[560px] mx-auto flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-radial-gradient from-chrome-orange/15 via-transparent to-transparent blur-3xl opacity-50 pointer-events-none" />

      {shouldRenderStatic ? (
        <picture className="w-full h-full object-contain relative z-10 flex items-center justify-center">
          <source srcSet="/assets/03-infrastructure-core.webp" type="image/webp" />
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
