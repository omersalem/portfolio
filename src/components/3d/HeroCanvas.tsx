import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useEffectSettings } from '../../context/EffectSettingsContext';

export const HeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion, reducedEffects, webGLSupported, saveData } = useEffectSettings();
  const [useFallback, setUseFallback] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);

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

      // 1. Scene & Camera Setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0.1, 5.8);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;

      // 2. High-Fidelity Studio Environment Reflection Map
      const envCanvas = document.createElement('canvas');
      envCanvas.width = 1024;
      envCanvas.height = 512;
      const ctx = envCanvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0, '#040508');
        grad.addColorStop(0.15, '#161922');
        grad.addColorStop(0.3, '#ffffff'); // bright softbox slit
        grad.addColorStop(0.42, '#202430');
        grad.addColorStop(0.68, '#06070a');
        grad.addColorStop(0.82, '#ff5500'); // intense electric orange horizon band
        grad.addColorStop(0.9, '#ff7700');  // warm amber core
        grad.addColorStop(1.0, '#040508');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);

        // Add specular softbox reflections
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillRect(200, 100, 160, 80);
        ctx.fillRect(680, 90, 180, 90);

        // Add orange side rim accent
        ctx.fillStyle = 'rgba(255, 85, 0, 0.4)';
        ctx.fillRect(400, 380, 240, 60);
      }
      const envTexture = new THREE.CanvasTexture(envCanvas);
      envTexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envTexture;

      // 3. Architectural Studio Lights
      const ambientLight = new THREE.AmbientLight(0x222634, 1.8);
      scene.add(ambientLight);

      // Top Key Light
      const topKey = new THREE.DirectionalLight(0xffffff, 4.2);
      topKey.position.set(2.5, 5, 4);
      scene.add(topKey);

      // White edge rim light
      const whiteRim = new THREE.DirectionalLight(0xffffff, 6.5);
      whiteRim.position.set(-4.5, 2.5, -2.5);
      scene.add(whiteRim);

      // Controlled electric orange rim light
      const orangeRim = new THREE.PointLight(0xff5500, 9.0, 22);
      orangeRim.position.set(4.2, 0.6, -1.2);
      scene.add(orangeRim);

      // Dynamic Interactive Mouse Spotlight (sweeps across chrome surfaces)
      const mouseSpot = new THREE.PointLight(0xff7722, 5.0, 10);
      mouseSpot.position.set(0, 0, 3);
      scene.add(mouseSpot);

      // 4. Materials
      // High-Sheen Liquid Mirror Chrome Material
      const liquidChromeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xf2f4fa,
        metalness: 1.0,
        roughness: 0.02,
        clearcoat: 1.0,
        clearcoatRoughness: 0.015,
        reflectivity: 1.0,
        ior: 2.6,
      });

      // Molten Glowing Orange Neon Material (for the inner core rim)
      const moltenOrangeMaterial = new THREE.MeshStandardMaterial({
        color: 0xff5500,
        emissive: 0xff5500,
        emissiveIntensity: 1.6,
        roughness: 0.3,
        metalness: 0.8,
      });

      // Thin Chrome Material
      const thinChromeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.03,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
      });

      // 5. 3D Gyroscopic Orbital System
      const gyroscopicGroup = new THREE.Group();

      // --- Ring 1: Primary Heavy Liquid Chrome Torus ---
      const primaryRingGeo = new THREE.TorusGeometry(2.15, 0.125, 48, 140);
      const primaryRing = new THREE.Mesh(primaryRingGeo, liquidChromeMaterial);
      primaryRing.rotation.x = Math.PI * 0.32;
      primaryRing.rotation.y = Math.PI * 0.18;
      primaryRing.rotation.z = -Math.PI * 0.20;
      primaryRing.position.set(0.12, 0.22, -0.45);
      gyroscopicGroup.add(primaryRing);

      // --- Ring 1 Inner: Concentric Molten Orange Rim ---
      const innerOrangeRingGeo = new THREE.TorusGeometry(2.02, 0.035, 32, 120);
      const innerOrangeRing = new THREE.Mesh(innerOrangeRingGeo, moltenOrangeMaterial);
      innerOrangeRing.rotation.x = primaryRing.rotation.x;
      innerOrangeRing.rotation.y = primaryRing.rotation.y;
      innerOrangeRing.rotation.z = primaryRing.rotation.z;
      innerOrangeRing.position.set(0.12, 0.22, -0.45);
      gyroscopicGroup.add(innerOrangeRing);

      // --- Ring 2: Secondary Thin Gyroscopic Orbital Ring ---
      // Tilted ~29 degrees so it frames head and shoulders without crossing the face
      const secondaryRingGeo = new THREE.TorusGeometry(2.55, 0.022, 32, 130);
      const secondaryRing = new THREE.Mesh(secondaryRingGeo, thinChromeMaterial);
      secondaryRing.rotation.x = Math.PI * 0.16;
      secondaryRing.rotation.y = -Math.PI * 0.10;
      secondaryRing.rotation.z = -Math.PI * 0.12;
      secondaryRing.position.set(0.05, 0.12, -0.50);
      gyroscopicGroup.add(secondaryRing);

      // --- Floating Mirror Chrome Spheres (Satellites on 3D Orbits) ---
      // Sphere 1: Major mirror sphere (mid-left resting against primary ring)
      const sphere1Geo = new THREE.SphereGeometry(0.38, 48, 48);
      const sphere1 = new THREE.Mesh(sphere1Geo, liquidChromeMaterial);
      sphere1.position.set(-1.58, 0.05, -0.30);
      gyroscopicGroup.add(sphere1);

      // Sphere 2: Right mid mirror sphere (resting along thin ring)
      const sphere2Geo = new THREE.SphereGeometry(0.22, 36, 36);
      const sphere2 = new THREE.Mesh(sphere2Geo, liquidChromeMaterial);
      sphere2.position.set(1.78, 0.32, -0.35);
      gyroscopicGroup.add(sphere2);

      // Sphere 3: Subtle top background accent satellite
      const sphere3Geo = new THREE.SphereGeometry(0.08, 24, 24);
      const sphere3 = new THREE.Mesh(sphere3Geo, moltenOrangeMaterial);
      sphere3.position.set(-0.95, 1.65, -0.60);
      gyroscopicGroup.add(sphere3);

      scene.add(gyroscopicGroup);

      // --- 6. Floating Cosmic Micro-Particles (3D Stardust) ---
      const particleCount = 70;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleScales = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const radius = 1.8 + Math.random() * 2.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.8;

        particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) + 0.1;
        particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi) - 0.2;
        particleScales[i] = Math.random() * 0.8 + 0.3;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      // Particle texture
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 64;
      pCanvas.height = 64;
      const pCtx = pCanvas.getContext('2d');
      if (pCtx) {
        const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        pGrad.addColorStop(0, 'rgba(255, 140, 50, 1.0)');
        pGrad.addColorStop(0.4, 'rgba(255, 85, 0, 0.6)');
        pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        pCtx.fillStyle = pGrad;
        pCtx.fillRect(0, 0, 64, 64);
      }
      const pTexture = new THREE.CanvasTexture(pCanvas);

      const particleMat = new THREE.PointsMaterial({
        size: 0.08,
        map: pTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.75,
      });

      const particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      // --- 7. Omer's Portrait Plane Inside Three.js for True 3D Interlocking Depth ---
      const textureLoader = new THREE.TextureLoader();
      let portraitMesh: THREE.Mesh | null = null;
      let portraitGeo: THREE.PlaneGeometry | null = null;
      let portraitMat: THREE.MeshBasicMaterial | null = null;

      textureLoader.load(
        '/assets/omer-portrait-cutout.png',
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;

          // Aspect ratio: 1270 / 1080 = 1.176
          const pWidth = 3.8;
          const pHeight = pWidth / 1.176; // ~3.23

          portraitGeo = new THREE.PlaneGeometry(pWidth, pHeight);
          portraitMat = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            alphaTest: 0.08,
            depthTest: true,
            depthWrite: true,
          });

          portraitMesh = new THREE.Mesh(portraitGeo, portraitMat);
          // Positioned at Z=0.1: Omer sits cleanly in foreground while rings frame him
          portraitMesh.position.set(0.05, -0.62, 0.1);
          scene.add(portraitMesh);
          setIs3DReady(true);
        },
        undefined,
        (err) => {
          console.warn('Could not load 3D portrait texture, relying on DOM overlay:', err);
          setIs3DReady(false);
        }
      );

      // 8. Pointer Parallax State
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.28;
        targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.22;
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });

      // 9. Observer & Visibility
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

      // 10. Main Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // 1. Multi-Axis Harmonious Gyroscopic Rotation
        // Primary Ring + Inner Molten Orange Core: slow, weighted rotation & rocking
        primaryRing.rotation.z = -Math.PI * 0.20 + elapsedTime * 0.05;
        primaryRing.rotation.x = Math.PI * 0.32 + Math.sin(elapsedTime * 0.35) * 0.04;
        primaryRing.rotation.y = Math.PI * 0.18 + Math.cos(elapsedTime * 0.25) * 0.03;

        innerOrangeRing.rotation.z = primaryRing.rotation.z;
        innerOrangeRing.rotation.x = primaryRing.rotation.x;
        innerOrangeRing.rotation.y = primaryRing.rotation.y;

        // Secondary Thin Orbital Ring: slow independent counter-rotation framing the head and shoulders
        secondaryRing.rotation.z = -Math.PI * 0.12 - elapsedTime * 0.04;
        secondaryRing.rotation.x = Math.PI * 0.16 + Math.cos(elapsedTime * 0.30) * 0.03;
        secondaryRing.rotation.y = -Math.PI * 0.10 + Math.sin(elapsedTime * 0.20) * 0.02;

        // 2. Floating Mirror Spheres (Elliptical 3D Lissajous Orbits)
        sphere1.position.y = 0.05 + Math.sin(elapsedTime * 0.8) * 0.06;
        sphere1.position.z = -0.30 + Math.cos(elapsedTime * 0.6) * 0.06;

        sphere2.position.y = 0.32 + Math.cos(elapsedTime * 0.7) * 0.05;
        sphere2.position.x = 1.78 + Math.sin(elapsedTime * 0.5) * 0.06;

        sphere3.position.y = 1.65 + Math.cos(elapsedTime * 0.9) * 0.04;

        // 3. Stardust Particle Swirl
        particleSystem.rotation.y = elapsedTime * 0.04;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.2) * 0.03;

        // 4. Smooth Pointer Parallax Drift
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Gyroscopic group reacts with natural depth tilt
        gyroscopicGroup.rotation.y = currentMouseX * 0.45;
        gyroscopicGroup.rotation.x = currentMouseY * 0.35;

        // Camera shifts subtly for authentic 3D perspective parallax
        camera.position.x = currentMouseX * 0.55;
        camera.position.y = 0.1 - currentMouseY * 0.40;
        camera.lookAt(0, 0.05, 0);

        // Interactive mouse spotlight follows pointer across chrome
        mouseSpot.position.x = currentMouseX * 7;
        mouseSpot.position.y = -currentMouseY * 5;

        // 5. Pulsing Electric Orange Rim-Light
        orangeRim.intensity = 8.0 + Math.sin(elapsedTime * 1.6) * 2.5;

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

        primaryRingGeo.dispose();
        innerOrangeRingGeo.dispose();
        secondaryRingGeo.dispose();
        sphere1Geo.dispose();
        sphere2Geo.dispose();
        sphere3Geo.dispose();
        particleGeo.dispose();

        liquidChromeMaterial.dispose();
        moltenOrangeMaterial.dispose();
        thinChromeMaterial.dispose();
        particleMat.dispose();

        if (portraitGeo) portraitGeo.dispose();
        if (portraitMat) portraitMat.dispose();

        envTexture.dispose();
        pTexture.dispose();
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('Hero 3D WebGL failed, switching to static fallback:', err);
      setUseFallback(true);
      if (renderer) {
        (renderer as THREE.WebGLRenderer).dispose();
      }
    }
  }, [shouldRenderStatic]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[1/1] max-w-[580px] xl:max-w-[640px] mx-auto flex items-end justify-center pointer-events-auto select-none"
      aria-hidden="true"
    >
      {/* Background Architectural Glow and Orange Horizon Line */}
      <div className="absolute top-0 right-[28%] w-[2px] h-full bg-gradient-to-b from-transparent via-[#FF5500] to-transparent blur-[0.5px] pointer-events-none opacity-85 z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-chrome-orange/15 via-transparent to-transparent pointer-events-none blur-3xl opacity-60" />

      {shouldRenderStatic ? (
        /* Static Optimized Fallback */
        <picture className="w-full h-full object-contain relative z-10 flex items-end justify-center">
          <source srcSet="/assets/portfolio-hero-with-portrait.png" type="image/png" />
          <img
            src="/assets/portfolio-hero-with-portrait.png"
            alt="Omer Salem — Computer Engineer"
            className="w-full h-full object-cover object-right select-none filter contrast-105"
            loading="eager"
            width={720}
            height={720}
          />
        </picture>
      ) : (
        <div className="relative w-full h-full flex items-end justify-center overflow-visible">
          {/* True 3D WebGL Canvas with Integrated Spatial Depth & Gyroscopic Rings */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0 block cursor-grab active:cursor-grabbing"
            tabIndex={-1}
          />

          {/* Seamless DOM Fallback for portrait while Three.js texture initializes */}
          {!is3DReady && (
            <div className="relative z-10 w-[88%] sm:w-[82%] max-w-[480px] xl:max-w-[520px] flex items-end justify-center pointer-events-none transition-opacity duration-300">
              <img
                src="/assets/omer-portrait-cutout.png"
                alt="Omer Salem — Computer Engineer"
                className="w-full h-auto object-contain select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter contrast-[1.02]"
                loading="eager"
                width={640}
                height={780}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
