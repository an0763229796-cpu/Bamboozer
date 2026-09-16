import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Waves, Eye, Compass } from 'lucide-react';

interface ThreeQuantFabricProps {
  className?: string;
}

type VisualTheme = 'liquid-silk' | 'quantum-stardust' | 'cyber-matrix';

export const ThreeQuantFabric: React.FC<ThreeQuantFabricProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [activeTheme, setActiveTheme] = useState<VisualTheme>('liquid-silk');
  const [particleCountLabel, setParticleCountLabel] = useState<number>(350);

  // Keep a ref to the active theme so the animation loop can read it seamlessly
  const themeRef = useRef<VisualTheme>('liquid-silk');
  useEffect(() => {
    themeRef.current = activeTheme;
  }, [activeTheme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. WebGL Support Detection
    try {
      const canvasTest = document.createElement('canvas');
      const gl = canvasTest.getContext('webgl2') || canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    // 2. Scene Setup with Atmospheric Cinematic Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.018);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 750;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 120);
    camera.position.set(0, -12, 14);
    camera.lookAt(0, 0, -1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    // 3. Studio Lighting Rig (Lusion Signature: Multi-color dynamic rim lights)
    const ambientLight = new THREE.AmbientLight(0x081b22, 1.4);
    scene.add(ambientLight);

    // Dynamic Cursor Spotlight: travels in 3D space above the waves
    const cursorLight = new THREE.PointLight(0x00f5d4, 4.5, 30, 1.6);
    cursorLight.position.set(0, 0, 6);
    scene.add(cursorLight);

    // Secondary Accent Light: violet/indigo tone for chromatic luxury
    const accentLight = new THREE.PointLight(0x6366f1, 2.8, 26, 1.8);
    accentLight.position.set(12, 8, 8);
    scene.add(accentLight);

    // Rim Directional Lights
    const rimLightLeft = new THREE.DirectionalLight(0x10b981, 3.2);
    rimLightLeft.position.set(-16, 12, 12);
    scene.add(rimLightLeft);

    const rimLightRight = new THREE.DirectionalLight(0x06b6d4, 2.5);
    rimLightRight.position.set(16, -10, 10);
    scene.add(rimLightRight);

    // 4. Geometry: High-Density Wave Fabric Plane
    const gridX = 84;
    const gridY = 56;
    const planeWidth = 56;
    const planeHeight = 40;

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, gridX, gridY);
    const positionAttr = geometry.attributes.position;
    const vertexCount = positionAttr.count;

    // Cache initial coordinate grid
    const basePositions = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount; i++) {
      basePositions[i * 3] = positionAttr.getX(i);
      basePositions[i * 3 + 1] = positionAttr.getY(i);
      basePositions[i * 3 + 2] = positionAttr.getZ(i);
    }

    // 5. Materials:
    // A. High-Gloss Liquid Obsidian Silk (Physical Material with clearcoat & metalness)
    const silkMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x071e22,
      emissive: 0x021616,
      emissiveIntensity: 0.45,
      roughness: 0.22,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
      side: THREE.DoubleSide,
      flatShading: false,
    });

    const silkMesh = new THREE.Mesh(geometry, silkMaterial);
    silkMesh.rotation.x = -Math.PI * 0.16;
    scene.add(silkMesh);

    // B. Delicate Neon Contour Wireframe (Gives structured quant data texture)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });
    const wireMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireMesh.rotation.x = -Math.PI * 0.16;
    wireMesh.position.z = 0.04;
    scene.add(wireMesh);

    // C. Floating Stardust Particles (Bioluminescent Depth of Field)
    const createCircleGlowTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 64;
      pCanvas.height = 64;
      const ctx = pCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(34, 211, 238, 0.85)');
        gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.35)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    const particleTexture = createCircleGlowTexture();
    const dustCount = 380;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustScales = new Float32Array(dustCount);
    const dustSpeeds = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 55;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 42;
      dustPositions[i * 3 + 2] = (Math.random() - 0.2) * 22; // Layered Z-depth
      dustScales[i] = Math.random() * 0.4 + 0.15;
      dustSpeeds[i] = Math.random() * 0.6 + 0.2;
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.4,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustParticles);

    // D. Interactive Floating 3D Geometric Quantum Core (Lusion signature centerpiece)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(15, 6, 2); // Positioned elegantly in right-upper visual space

    const torusGeometry = new THREE.TorusKnotGeometry(2.4, 0.45, 140, 24, 2, 3);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x052e2b,
      emissive: 0x064e3b,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.75,
      wireframe: false,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    coreGroup.add(torusMesh);

    // Outer crystalline wireframe halo
    const icosaGeometry = new THREE.IcosahedronGeometry(4.2, 1);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const icosaMesh = new THREE.Mesh(icosaGeometry, icosaMaterial);
    coreGroup.add(icosaMesh);

    scene.add(coreGroup);

    // 6. Smooth Mouse Interaction Tracking
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      normalizedX: 0,
      normalizedY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = nx;
      mouse.targetY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouse.targetX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.targetY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 7. GPU Throttling when Out of View
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 8. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || 750;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. Master Animation Loop (Liquid Fluid Dynamics + Multi-frequency harmonics)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const time = clock.getElapsedTime();
      const currentTheme = themeRef.current;

      // Smooth inertia lerp for mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Camera parallax navigation
      camera.position.x = mouse.x * 3.2;
      camera.position.y = -12 + mouse.y * 2.0;
      camera.lookAt(mouse.x * 0.9, 0, -1);

      // Move cursor light in 3D world space
      const lightX = mouse.x * (planeWidth * 0.42);
      const lightY = mouse.y * (planeHeight * 0.38) - 2;
      cursorLight.position.set(lightX, lightY, 4.8 + Math.sin(time * 2.5) * 1.2);
      accentLight.position.x = 14 + Math.sin(time * 0.8) * 4;
      accentLight.position.y = 8 + Math.cos(time * 0.6) * 3;

      // Floating Quantum Core Animation
      coreGroup.rotation.x = time * 0.35 + mouse.y * 0.5;
      coreGroup.rotation.y = time * 0.45 + mouse.x * 0.6;
      coreGroup.position.y = 6 + Math.sin(time * 1.2) * 1.2;
      icosaMesh.rotation.z = -time * 0.2;

      // Theme-based shader configurations
      if (currentTheme === 'liquid-silk') {
        silkMaterial.roughness = 0.2;
        silkMaterial.metalness = 0.88;
        silkMaterial.emissiveIntensity = 0.4;
        wireframeMaterial.opacity = 0.07;
        dustMaterial.opacity = 0.55;
      } else if (currentTheme === 'quantum-stardust') {
        silkMaterial.roughness = 0.45;
        silkMaterial.metalness = 0.5;
        silkMaterial.emissiveIntensity = 0.2;
        wireframeMaterial.opacity = 0.04;
        dustMaterial.opacity = 0.95;
      } else {
        // cyber-matrix
        silkMaterial.roughness = 0.15;
        silkMaterial.metalness = 0.95;
        silkMaterial.emissiveIntensity = 0.6;
        wireframeMaterial.opacity = 0.18;
        dustMaterial.opacity = 0.4;
      }

      // Update Wave Vertices (Multi-octave organic undulation)
      const positions = geometry.attributes.position;
      const planeMouseX = mouse.x * (planeWidth * 0.42);
      const planeMouseY = mouse.y * (planeHeight * 0.42);

      for (let i = 0; i < vertexCount; i++) {
        const baseX = basePositions[i * 3];
        const baseY = basePositions[i * 3 + 1];

        // Harmonic organic flow
        const wave1 = Math.sin(baseX * 0.14 + time * 1.1) * Math.cos(baseY * 0.18 + time * 0.9) * 1.6;
        const wave2 = Math.sin(baseX * 0.26 - time * 0.8 + baseY * 0.14) * 0.85;
        const wave3 = Math.cos((baseX * 0.08 + baseY * 0.12) + time * 0.6) * 0.7;

        // Ripple from interactive cursor
        const dx = baseX - planeMouseX;
        const dy = baseY - planeMouseY;
        const distSq = dx * dx + dy * dy;
        const mouseLift = Math.exp(-distSq * 0.045) * 4.2 * Math.cos(Math.sqrt(distSq) * 0.9 - time * 3.4);

        const z = wave1 + wave2 + wave3 + mouseLift;
        positions.setZ(i, z);
      }

      positions.needsUpdate = true;
      // Recompute normals every frame so specular reflections glide like real liquid mercury
      geometry.computeVertexNormals();

      // Animate floating dust particles
      const dustPos = dustGeometry.attributes.position;
      const dustArr = dustPos.array as Float32Array;

      for (let i = 0; i < dustCount; i++) {
        const idx = i * 3;
        dustArr[idx + 1] += dustSpeeds[i] * 0.04; // Gentle upward thermal drift
        dustArr[idx] += Math.sin(time * 0.5 + i) * 0.02;

        // Wrap around when exiting view
        if (dustArr[idx + 1] > 22) {
          dustArr[idx + 1] = -22;
          dustArr[idx] = (Math.random() - 0.5) * 55;
        }
      }
      dustPos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      geometry.dispose();
      silkMaterial.dispose();
      wireframeMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      icosaGeometry.dispose();
      icosaMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Cinematic Vignette Overlay (Blends edges softly into obsidian black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c14]/30 via-transparent to-[#080c14] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#080c14_85%)] pointer-events-none opacity-80" />

      {/* Floating 3D Experience Control Pill (Interactive Aesthetic Controls) */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-auto hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-xl shadow-black/40 text-[11px]">
        <span className="px-2 py-1 text-slate-400 font-mono font-medium flex items-center gap-1.5 border-r border-slate-700/60 mr-0.5">
          <Compass className="w-3 h-3 text-cyan-400 animate-spin-slow" />
          <span>Three.js 3D</span>
        </span>

        <button
          type="button"
          onClick={() => setActiveTheme('liquid-silk')}
          className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
            activeTheme === 'liquid-silk'
              ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Mặt sóng lỏng obsidian bóng loáng phản xạ ánh sáng cao cấp"
        >
          <Waves className="w-3 h-3" />
          <span>Lụa Lỏng</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTheme('quantum-stardust')}
          className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
            activeTheme === 'quantum-stardust'
              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Bão hạt lượng tử bioluminescent phát sáng đa tầng"
        >
          <Sparkles className="w-3 h-3" />
          <span>Hạt Lượng Tử</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTheme('cyber-matrix')}
          className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
            activeTheme === 'cyber-matrix'
              ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Lưới không gian số Cyber Matrix phản xạ ánh kim"
        >
          <Eye className="w-3 h-3" />
          <span>Cyber Matrix</span>
        </button>
      </div>
    </div>
  );
};
