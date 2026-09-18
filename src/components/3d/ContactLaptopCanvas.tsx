import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useEffectSettings } from '../../context/EffectSettingsContext';

export const ContactLaptopCanvas: React.FC = () => {
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

      // 1. Scene & Camera Setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 1.7, 5.1);
      camera.lookAt(0, 0.25, 0);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      // 2. Procedural Studio Environment Reflection Map
      const envCanvas = document.createElement('canvas');
      envCanvas.width = 512;
      envCanvas.height = 256;
      const envCtx = envCanvas.getContext('2d');
      if (envCtx) {
        const grad = envCtx.createLinearGradient(0, 0, 0, 256);
        grad.addColorStop(0, '#040507');
        grad.addColorStop(0.2, '#161820');
        grad.addColorStop(0.35, '#6a7282'); // balanced soft studio lighting
        grad.addColorStop(0.5, '#1e212a');
        grad.addColorStop(0.72, '#08090b');
        grad.addColorStop(0.86, '#ff5500'); // warm electric orange horizon streak
        grad.addColorStop(1.0, '#040507');
        envCtx.fillStyle = grad;
        envCtx.fillRect(0, 0, 512, 256);
      }
      const envTexture = new THREE.CanvasTexture(envCanvas);
      envTexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envTexture;

      // 3. Architectural Studio Lights
      const ambientLight = new THREE.AmbientLight(0x181a22, 1.4);
      scene.add(ambientLight);

      // Key light from top-front
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
      keyLight.position.set(2, 4.5, 3);
      scene.add(keyLight);

      // White edge rim light
      const rimLight = new THREE.DirectionalLight(0xffffff, 3.8);
      rimLight.position.set(-3.5, 3, -2.5);
      scene.add(rimLight);

      // Warm Electric Orange Underglow Light
      const orangeUnderglow = new THREE.PointLight(0xff5500, 7.5, 12);
      orangeUnderglow.position.set(0, -1.0, 0.2);
      scene.add(orangeUnderglow);

      // Screen Glow Projection Light (illuminates keyboard)
      const screenGlow = new THREE.PointLight(0xff6611, 4.5, 5);
      screenGlow.position.set(0, 1.1, 0.3);
      scene.add(screenGlow);

      // 4. Materials (Space Black Anodized Aluminum)
      const spaceBlackMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x12141a, // Anodized Matte Space Black
        metalness: 0.3,
        roughness: 0.6,
        clearcoat: 0.3,
        clearcoatRoughness: 0.25,
      });

      const polishedChromeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xf5f6fa, // Polished Mirror Chrome
        metalness: 1.0,
        roughness: 0.03,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
      });

      const keyboardWellMaterial = new THREE.MeshStandardMaterial({
        color: 0x08090c, // Deep recessed keyboard tray
        roughness: 0.85,
        metalness: 0.15,
      });

      const keycapMaterial = new THREE.MeshStandardMaterial({
        color: 0x181a22, // Matte dark keycaps
        roughness: 0.65,
        metalness: 0.2,
      });

      const accentKeyMaterial = new THREE.MeshStandardMaterial({
        color: 0xff5500, // Electric orange accent keycap (Esc / Enter)
        roughness: 0.45,
        metalness: 0.2,
      });

      const trackpadMaterial = new THREE.MeshStandardMaterial({
        color: 0x161820, // Matte glass trackpad
        roughness: 0.5,
        metalness: 0.25,
      });

      const matteBezelMaterial = new THREE.MeshStandardMaterial({
        color: 0x060709, // Matte black screen border
        roughness: 0.9,
        metalness: 0.05,
      });

      // 5. Dynamic Interactive Screen Canvas Texture
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1024;
      screenCanvas.height = 660;
      const sCtx = screenCanvas.getContext('2d')!;

      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      screenTexture.minFilter = THREE.LinearFilter;
      screenTexture.magFilter = THREE.LinearFilter;

      const screenMaterial = new THREE.MeshStandardMaterial({
        map: screenTexture,
        emissiveMap: screenTexture,
        emissive: 0xffffff,
        emissiveIntensity: 1.0, // High-visibility luminous glow
        roughness: 0.1,
        metalness: 0.05,
      });

      // 6. Assemble 3D Laptop
      const laptopGroup = new THREE.Group();
      laptopGroup.scale.set(0.92, 0.92, 0.92);

      // ================= BASE CHASSIS =================
      const baseGroup = new THREE.Group();

      // Main base slab: width=3.3, height=0.1, depth=2.3
      const baseBodyGeo = new THREE.BoxGeometry(3.3, 0.1, 2.3);
      const baseBody = new THREE.Mesh(baseBodyGeo, spaceBlackMaterial);
      baseBody.position.set(0, 0, 0);
      baseGroup.add(baseBody);

      // Polished chrome perimeter rim
      const baseRimGeo = new THREE.BoxGeometry(3.32, 0.016, 2.32);
      const baseRim = new THREE.Mesh(baseRimGeo, polishedChromeMaterial);
      baseRim.position.set(0, 0.046, 0);
      baseGroup.add(baseRim);

      // Recessed keyboard well
      const wellGeo = new THREE.BoxGeometry(2.9, 0.015, 1.35);
      const wellMesh = new THREE.Mesh(wellGeo, keyboardWellMaterial);
      wellMesh.position.set(0, 0.051, -0.32);
      baseGroup.add(wellMesh);

      // 3D Physical Keycaps Grid
      const keyGeo = new THREE.BoxGeometry(0.18, 0.02, 0.18);
      const keyGroup = new THREE.Group();
      keyGroup.position.set(0, 0.062, -0.32);

      const rows = 5;
      const cols = 14;
      const keySpacingX = 0.202;
      const keySpacingZ = 0.24;
      const startKeyX = -((cols - 1) * keySpacingX) / 2;
      const startKeyZ = -((rows - 1) * keySpacingZ) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Spacebar skip in bottom row
          if (r === 4 && c >= 4 && c <= 9) continue;

          // Orange accent key at Enter / Esc
          const isAccent = (r === 2 && c === 13) || (r === 0 && c === 0);
          const kMesh = new THREE.Mesh(keyGeo, isAccent ? accentKeyMaterial : keycapMaterial);
          kMesh.position.set(startKeyX + c * keySpacingX, 0, startKeyZ + r * keySpacingZ);
          keyGroup.add(kMesh);
        }
      }

      // Spacebar
      const spaceGeo = new THREE.BoxGeometry(1.15, 0.02, 0.18);
      const spaceMesh = new THREE.Mesh(spaceGeo, keycapMaterial);
      spaceMesh.position.set(0, 0, startKeyZ + 4 * keySpacingZ);
      keyGroup.add(spaceMesh);

      baseGroup.add(keyGroup);

      // Glass Trackpad
      const trackpadGeo = new THREE.BoxGeometry(1.1, 0.012, 0.7);
      const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMaterial);
      trackpadMesh.position.set(0, 0.052, 0.65);
      baseGroup.add(trackpadMesh);

      // Trackpad subtle border
      const trackpadBorderGeo = new THREE.BoxGeometry(1.12, 0.008, 0.72);
      const trackpadBorder = new THREE.Mesh(trackpadBorderGeo, polishedChromeMaterial);
      trackpadBorder.position.set(0, 0.051, 0.65);
      baseGroup.add(trackpadBorder);

      // Front thumb scoop notch
      const notchGeo = new THREE.BoxGeometry(0.5, 0.03, 0.05);
      const notchMesh = new THREE.Mesh(notchGeo, polishedChromeMaterial);
      notchMesh.position.set(0, 0.045, 1.15);
      baseGroup.add(notchMesh);

      laptopGroup.add(baseGroup);

      // ================= DISPLAY LID ASSEMBLY =================
      // Hinge sits along back edge at Z = -1.14, Y = 0.05
      const lidGroup = new THREE.Group();
      lidGroup.position.set(0, 0.05, -1.14);

      // Hinge cylinder
      const hingeGeo = new THREE.CylinderGeometry(0.045, 0.045, 2.6, 32);
      const hingeMesh = new THREE.Mesh(hingeGeo, polishedChromeMaterial);
      hingeMesh.rotation.z = Math.PI / 2;
      hingeMesh.position.set(0, 0, 0);
      lidGroup.add(hingeMesh);

      // Lid Outer Shell (Back cover)
      const lidCoverGeo = new THREE.BoxGeometry(3.3, 2.2, 0.06);
      const lidCover = new THREE.Mesh(lidCoverGeo, spaceBlackMaterial);
      lidCover.position.set(0, 1.1, -0.03);
      lidGroup.add(lidCover);

      // Lid polished chrome rim
      const lidRimGeo = new THREE.BoxGeometry(3.32, 2.22, 0.015);
      const lidRim = new THREE.Mesh(lidRimGeo, polishedChromeMaterial);
      lidRim.position.set(0, 1.1, 0);
      lidGroup.add(lidRim);

      // Matte black screen bezel
      const bezelGeo = new THREE.BoxGeometry(3.26, 2.16, 0.01);
      const bezelMesh = new THREE.Mesh(bezelGeo, matteBezelMaterial);
      bezelMesh.position.set(0, 1.1, 0.008);
      lidGroup.add(bezelMesh);

      // Active glowing screen plane (faces +Z towards user)
      const screenGeo = new THREE.PlaneGeometry(3.08, 1.98);
      const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
      screenMesh.position.set(0, 1.1, 0.016);
      lidGroup.add(screenMesh);

      // Open angle: tilted backward from vertical by ~18 degrees (-0.32 rad)
      lidGroup.rotation.x = -0.32;
      laptopGroup.add(lidGroup);

      // ================= ORBITAL CHROME RINGS & PARTICLES =================
      const ringGroup = new THREE.Group();

      // Outer sweeping chrome orbital ring
      const orbitRing1Geo = new THREE.TorusGeometry(2.7, 0.016, 32, 120);
      const orbitRing1 = new THREE.Mesh(orbitRing1Geo, polishedChromeMaterial);
      orbitRing1.rotation.x = Math.PI * 0.38;
      orbitRing1.rotation.y = Math.PI * 0.12;
      ringGroup.add(orbitRing1);

      // Inner electric orange accent ring
      const orbitRing2Geo = new THREE.TorusGeometry(2.2, 0.01, 32, 100);
      const orangeRingMat = new THREE.MeshBasicMaterial({ color: 0xff5500 });
      const orbitRing2 = new THREE.Mesh(orbitRing2Geo, orangeRingMat);
      orbitRing2.rotation.x = Math.PI * 0.58;
      orbitRing2.rotation.y = -Math.PI * 0.22;
      ringGroup.add(orbitRing2);

      // Floating Mirror Chrome Spheres
      const sphereGeo = new THREE.SphereGeometry(0.18, 32, 32);
      const sphereMesh = new THREE.Mesh(sphereGeo, polishedChromeMaterial);
      sphereMesh.position.set(2.4, 0.9, -0.5);
      ringGroup.add(sphereMesh);

      const sphereGeo2 = new THREE.SphereGeometry(0.12, 24, 24);
      const sphereMesh2 = new THREE.Mesh(sphereGeo2, polishedChromeMaterial);
      sphereMesh2.position.set(-2.2, -0.4, 0.6);
      ringGroup.add(sphereMesh2);

      laptopGroup.add(ringGroup);

      // Floor Shadow Plane
      const shadowGeo = new THREE.PlaneGeometry(4.4, 3.4);
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = 256;
      shadowCanvas.height = 256;
      const shCtx = shadowCanvas.getContext('2d');
      if (shCtx) {
        const shGrad = shCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
        shGrad.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
        shGrad.addColorStop(0.5, 'rgba(255, 85, 0, 0.15)');
        shGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        shCtx.fillStyle = shGrad;
        shCtx.fillRect(0, 0, 256, 256);
      }
      const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.85,
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.set(0, -0.85, 0);
      scene.add(shadowMesh);

      // Initial resting pose: classic 3/4 hero presentation angle
      laptopGroup.rotation.y = -0.35;
      laptopGroup.rotation.x = 0.18;
      laptopGroup.position.set(0, -0.05, 0);
      scene.add(laptopGroup);

      // 7. Pointer Parallax Tracking
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.35;
        targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.22;
      };
      window.addEventListener('pointermove', handlePointerMove, { passive: true });

      // 8. Observer & Resize
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

      // 9. Dynamic Screen Rendering Function (Interactive Terminal & Waveform)
      let lastScreenUpdate = 0;
      const renderScreenContent = (time: number) => {
        // Deep obsidian background
        sCtx.fillStyle = '#0a0c10';
        sCtx.fillRect(0, 0, 1024, 660);

        // Tech grid lines
        sCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        sCtx.lineWidth = 1;
        for (let x = 0; x < 1024; x += 36) {
          sCtx.beginPath();
          sCtx.moveTo(x, 0);
          sCtx.lineTo(x, 660);
          sCtx.stroke();
        }

        // Top App Bar
        sCtx.fillStyle = '#12141a';
        sCtx.fillRect(0, 0, 1024, 52);
        sCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        sCtx.strokeRect(0, 0, 1024, 52);

        // Window Controls (Red, Yellow, Green LEDs)
        sCtx.fillStyle = '#ff5f56';
        sCtx.beginPath();
        sCtx.arc(32, 26, 7, 0, Math.PI * 2);
        sCtx.fill();

        sCtx.fillStyle = '#ffbd2e';
        sCtx.beginPath();
        sCtx.arc(56, 26, 7, 0, Math.PI * 2);
        sCtx.fill();

        sCtx.fillStyle = '#27c93f';
        sCtx.beginPath();
        sCtx.arc(80, 26, 7, 0, Math.PI * 2);
        sCtx.fill();

        // Header Title
        sCtx.fillStyle = '#9ca3af';
        sCtx.font = 'bold 15px monospace';
        sCtx.fillText('OMER SALEM // SYSTEM MONITOR — MNE BRAIN V2', 115, 32);

        // Status Badge
        sCtx.fillStyle = 'rgba(255, 85, 0, 0.18)';
        sCtx.strokeStyle = 'rgba(255, 85, 0, 0.5)';
        sCtx.beginPath();
        sCtx.roundRect(825, 12, 170, 28, 6);
        sCtx.fill();
        sCtx.stroke();
        sCtx.fillStyle = '#ff5500';
        sCtx.font = 'bold 13px monospace';
        sCtx.fillText('● STATUS: ONLINE', 840, 31);

        // Left Column: Semantic Telemetry & Engineering Identity
        sCtx.font = '16px monospace';
        const lines = [
          { text: '> INITIALIZING OMER SALEM CORE...', color: '#6b7280' },
          { text: 'const engineer = "OMER SALEM";', color: '#ff5500' },
          { text: 'const role = "COMPUTER ENGINEER";', color: '#e5e7eb' },
          { text: 'const mission = "WEBSITES ENGINEERED TO SELL";', color: '#ffffff' },
          { text: 'infra_capabilities: [', color: '#9ca3af' },
          { text: '  "CISCO NETWORKS", "FORTIGATE FIREWALLS",', color: '#d1d5db' },
          { text: '  "F5 BIG-IP WAF", "VMWARE VIRTUALIZATION"', color: '#d1d5db' },
          { text: '];', color: '#9ca3af' },
          { text: 'frontend_stack: ["REACT 18", "THREE.JS", "TS"];', color: '#ff7733' },
          { text: 'cluster_latency: "0.2ms" | uptime: "99.999%"', color: '#34d399' },
          { text: '> READY TO ARCHITECT YOUR PLATFORM_', color: '#ff5500' },
        ];

        let startY = 95;
        lines.forEach((l, idx) => {
          sCtx.fillStyle = l.color;
          if (idx === lines.length - 1 && Math.sin(time * 6) < 0) {
            sCtx.fillText(l.text.replace('_', ' '), 35, startY + idx * 28);
          } else {
            sCtx.fillText(l.text, 35, startY + idx * 28);
          }
        });

        // Right Column: Live Telemetry Oscilloscope Box
        sCtx.fillStyle = '#0d0f14';
        sCtx.strokeStyle = 'rgba(255, 85, 0, 0.35)';
        sCtx.lineWidth = 1.5;
        sCtx.beginPath();
        sCtx.roundRect(580, 80, 405, 305, 10);
        sCtx.fill();
        sCtx.stroke();

        sCtx.fillStyle = '#ff5500';
        sCtx.font = 'bold 13px monospace';
        sCtx.fillText('REALTIME FREQUENCY & PACKET FLOW', 605, 112);

        // Animated Waveform
        sCtx.strokeStyle = '#ff5500';
        sCtx.lineWidth = 2.5;
        sCtx.beginPath();
        for (let px = 0; px < 355; px++) {
          const waveX = 605 + px;
          const waveY =
            230 +
            Math.sin(px * 0.045 + time * 4.5) * 40 * Math.sin(px * 0.016) +
            Math.cos(px * 0.09 - time * 2.5) * 18;
          if (px === 0) sCtx.moveTo(waveX, waveY);
          else sCtx.lineTo(waveX, waveY);
        }
        sCtx.stroke();

        // Animated Frequency Spectrum Bars
        for (let b = 0; b < 24; b++) {
          const barH = 14 + Math.sin(time * 5 + b * 0.6) * 14 + Math.cos(time * 3 + b) * 8;
          sCtx.fillStyle = b % 2 === 0 ? '#ff5500' : '#ffffff';
          sCtx.fillRect(605 + b * 15, 360 - barH, 10, barH);
        }

        // Bottom Engineering Credo Banner
        sCtx.fillStyle = '#13151c';
        sCtx.fillRect(35, 420, 950, 195);
        sCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        sCtx.strokeRect(35, 420, 950, 195);

        sCtx.fillStyle = '#ffffff';
        sCtx.font = 'bold 22px monospace';
        sCtx.fillText('PROVEN PERFORMANCE. ARCHITECTURAL RIGOR.', 65, 470);

        sCtx.fillStyle = '#9ca3af';
        sCtx.font = '15px monospace';
        sCtx.fillText('Modern commerce & digital platforms engineered for velocity, high security & uptime.', 65, 510);
        sCtx.fillText('Direct connection: omersalem@mne.gov.ps • +970 599 228 979', 65, 550);

        screenTexture.needsUpdate = true;
      };

      // 10. Main Animation Loop: Smooth levitation, 3D yaw/pitch precession & parallax
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // Update screen content at ~30fps
        if (elapsedTime - lastScreenUpdate > 0.033) {
          renderScreenContent(elapsedTime);
          lastScreenUpdate = elapsedTime;
        }

        // 1. Gentle Floating Levitation
        laptopGroup.position.y = -0.05 + Math.sin(elapsedTime * 1.1) * 0.08;

        // 2. Continuous Slow 3D Precession (Yaw & Pitch)
        // Pivots between -0.55 rad and -0.15 rad (around -0.35 rad)
        const targetRotY = -0.35 + Math.sin(elapsedTime * 0.4) * 0.2;
        const targetRotX = 0.18 + Math.cos(elapsedTime * 0.6) * 0.035;
        const targetRotZ = Math.sin(elapsedTime * 0.75) * 0.025;

        // 3. Pointer Parallax Drift with Smooth Inertia
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        laptopGroup.rotation.y = targetRotY + currentMouseX * 0.6;
        laptopGroup.rotation.x = targetRotX + currentMouseY * 0.4;
        laptopGroup.rotation.z = targetRotZ - currentMouseX * 0.1;

        // 4. Subtle Lid Breathing (-0.32 rad base)
        lidGroup.rotation.x = -0.32 + Math.sin(elapsedTime * 0.8) * 0.01;

        // 5. Counter-rotating Chrome Orbital Rings
        orbitRing1.rotation.z = elapsedTime * 0.14;
        orbitRing2.rotation.z = -elapsedTime * 0.18;

        // 6. Floating Mirror Chrome Spheres
        sphereMesh.position.y = 0.9 + Math.sin(elapsedTime * 1.4) * 0.08;
        sphereMesh2.position.y = -0.4 + Math.cos(elapsedTime * 1.2) * 0.06;

        // 7. Dynamic Pulsing Underglow
        orangeUnderglow.intensity = 6.0 + Math.sin(elapsedTime * 2.0) * 1.5;

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

        baseBodyGeo.dispose();
        baseRimGeo.dispose();
        wellGeo.dispose();
        keyGeo.dispose();
        spaceGeo.dispose();
        trackpadGeo.dispose();
        trackpadBorderGeo.dispose();
        notchGeo.dispose();
        hingeGeo.dispose();
        lidCoverGeo.dispose();
        lidRimGeo.dispose();
        bezelGeo.dispose();
        screenGeo.dispose();
        orbitRing1Geo.dispose();
        orbitRing2Geo.dispose();
        sphereGeo.dispose();
        sphereGeo2.dispose();
        shadowGeo.dispose();

        spaceBlackMaterial.dispose();
        polishedChromeMaterial.dispose();
        keyboardWellMaterial.dispose();
        keycapMaterial.dispose();
        accentKeyMaterial.dispose();
        trackpadMaterial.dispose();
        matteBezelMaterial.dispose();
        screenMaterial.dispose();
        orangeRingMat.dispose();
        shadowMat.dispose();
        screenTexture.dispose();
        shadowTexture.dispose();
        renderer?.dispose();
      };
    } catch (err) {
      console.warn('3D Laptop WebGL failed, switching to fallback:', err);
      setUseFallback(true);
      if (renderer) {
        (renderer as THREE.WebGLRenderer).dispose();
      }
    }
  }, [shouldRenderStatic]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-[1/1] max-w-[540px] xl:max-w-[620px] mx-auto flex items-center justify-center pointer-events-auto"
      aria-hidden="true"
    >
      {/* Background Architectural Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-chrome-orange/15 via-transparent to-transparent pointer-events-none blur-3xl opacity-60" />

      {shouldRenderStatic ? (
        /* Static High-Fidelity Fallback */
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src="/references/almalaki-store.png"
            alt="3D Engineering Laptop Interface"
            className="w-[85%] h-auto rounded-lg shadow-2xl border border-chrome-border/60 opacity-90 filter contrast-105"
            width={600}
            height={400}
          />
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-grab active:cursor-grabbing select-none"
          tabIndex={-1}
        />
      )}
    </div>
  );
};
