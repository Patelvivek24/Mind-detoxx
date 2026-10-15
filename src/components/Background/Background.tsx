"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Background.module.scss";

/**
 * Mind Detoxx — 3D Interactive Galaxy & Neural Mind Cosmic Background
 *
 * A continuous, high-performance WebGL experience unifying:
 * 1. A 3D Logarithmic Spiral Galaxy with differential orbital mechanics & stardust
 * 2. An intertwined 3D Neural Mind (Brain / Consciousness Constellation) with firing synaptic pulses
 * 3. Reactive pointer physics (tilt, magnetic vortex, synaptic illumination, click ripples)
 * 4. Silky-smooth scroll depth parallax across all pages
 */
export default function Background() {
  const glCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = glCanvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = Math.min(window.innerWidth, window.innerHeight) < 768;

    // ───────────────────────── WebGL Renderer ─────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.error("Three.js WebGL init error:", e);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, isSmall ? 8.6 : 6.8);

    // ───────────────────────── Particle Distribution ─────────────────────────
    // Total count balanced for smooth 60fps across all devices
    const N = isSmall ? 42000 : 86000;
    const GALAXY_COUNT = Math.floor(N * 0.58);

    const rnd = Math.random;
    const gauss = () => Math.sqrt(-2 * Math.log(Math.max(1e-7, 1 - rnd()))) * Math.cos(6.2831853 * rnd());

    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const rands = new Float32Array(N * 4);
    const types = new Float32Array(N); // 0 = Galaxy Star, 1 = Neural Mind Node
    const params = new Float32Array(N * 4); // [radius, armAngle, layer, extra]

    // ─── 1. Galaxy System (Logarithmic Multi-Arm Spiral & Core Stardust) ───
    const NUM_ARMS = 3;
    const GALAXY_RADIUS = 5.2;

    for (let i = 0; i < GALAXY_COUNT; i++) {
      const idx3 = i * 3;
      const idx4 = i * 4;
      const p = rnd();

      let x = 0, y = 0, z = 0;
      let r = 0;
      let rColor = 0.25, gColor = 0.85, bColor = 0.85;

      if (p < 0.22) {
        // High density cosmic nucleus / core
        r = Math.pow(rnd(), 1.8) * 0.95 + 0.05;
        const theta = rnd() * Math.PI * 2;
        const phi = (rnd() - 0.5) * Math.PI * 0.65;
        x = r * Math.cos(theta) * Math.cos(phi);
        y = r * Math.sin(phi) * 0.55 + gauss() * 0.04;
        z = r * Math.sin(theta) * Math.cos(phi);

        // Core warm stardust & radiant turquoise
        if (rnd() < 0.45) {
          // Warm gold
          rColor = 0.92; gColor = 0.76; bColor = 0.42;
        } else {
          // Bright cyan core
          rColor = 0.35; gColor = 0.95; bColor = 0.92;
        }
      } else if (p < 0.82) {
        // Spiral Arms
        const arm = Math.floor(rnd() * NUM_ARMS);
        const armBaseAngle = (arm * 2 * Math.PI) / NUM_ARMS;
        const distNorm = Math.pow(rnd(), 1.35); // concentration toward inner-mid
        r = 0.7 + distNorm * (GALAXY_RADIUS - 0.7);

        // Logarithmic spiral angle + Gaussian dispersion
        const spiralSpread = 2.1 * Math.log(r + 0.4);
        const dispersion = (gauss() * 0.28) / (r * 0.45 + 0.35);
        const theta = armBaseAngle + spiralSpread + dispersion;

        x = r * Math.cos(theta);
        z = r * Math.sin(theta);
        y = gauss() * (0.08 + r * 0.045);

        // Arms color gradation: Teal -> Emerald -> Cyan -> Cosmic Indigo
        const tColor = r / GALAXY_RADIUS;
        if (tColor < 0.35) {
          // Vibrant cyan
          rColor = 0.18; gColor = 0.89; bColor = 0.82;
        } else if (tColor < 0.65) {
          // Mind Detoxx emerald teal
          rColor = 0.16 + (rnd() * 0.1); gColor = 0.72 + (rnd() * 0.2); bColor = 0.65;
        } else if (tColor < 0.85) {
          // Mint green
          rColor = 0.32; gColor = 0.92; bColor = 0.65;
        } else {
          // Cosmic violet fringe
          rColor = 0.42; gColor = 0.45; bColor = 0.95;
        }
      } else {
        // Outer celestial halo & interstellar stardust
        r = 1.2 + Math.pow(rnd(), 0.9) * (GALAXY_RADIUS * 1.25);
        const theta = rnd() * Math.PI * 2;
        x = r * Math.cos(theta);
        z = r * Math.sin(theta);
        y = gauss() * 0.45;

        // Indigo / soft cyan interstellar dust
        rColor = 0.35 + rnd() * 0.2;
        gColor = 0.55 + rnd() * 0.3;
        bColor = 0.92;
      }

      positions[idx3] = x;
      positions[idx3 + 1] = y;
      positions[idx3 + 2] = z;

      colors[idx3] = rColor;
      colors[idx3 + 1] = gColor;
      colors[idx3 + 2] = bColor;

      types[i] = 0.0; // Galaxy star

      params[idx4] = r;
      params[idx4 + 1] = Math.atan2(z, x);
      params[idx4 + 2] = 0;
      params[idx4 + 3] = 0;

      rands[idx4] = rnd();
      rands[idx4 + 1] = rnd();
      rands[idx4 + 2] = rnd();
      rands[idx4 + 3] = rnd();
    }

    // ─── 2. Neural Mind System (3D Brain / Synaptic Cortex) ───
    // Folds harmonic equation for brain cortical sulci & gyri
    function brainFoldHarmonics(x: number, y: number, z: number) {
      const f =
        Math.sin(x * 6.2 + Math.sin(y * 4.4 + z * 2.2) * 1.8) +
        Math.sin(y * 6.8 + Math.sin(z * 5.2 + x * 1.4) * 1.6) +
        Math.sin(z * 6.0 + Math.sin(x * 4.8) * 1.5);
      return Math.pow(1.0 - Math.abs(Math.sin(f * 1.85)), 6);
    }

    const BRAIN_SCALE = 1.35;
    // Collect key neural nuclei to build synaptic connector bridges
    const neuralHubs: THREE.Vector3[] = [];

    for (let i = GALAXY_COUNT; i < N; i++) {
      const idx3 = i * 3;
      const idx4 = i * 4;
      const p = rnd();

      let x = 0, y = 0, z = 0;
      let tries = 0;
      let layerType = 0;

      while (tries < 15) {
        tries++;
        if (p < 0.82) {
          // Cerebral Hemispheres (Left & Right Cortex)
          layerType = 0;
          const s = rnd() < 0.5 ? -1 : 1; // Left or Right hemisphere
          let dx = gauss(), dy = gauss(), dz = gauss();
          const len = Math.hypot(dx, dy, dz) || 1;
          dx /= len; dy /= len; dz /= len;

          const rx = 1.52;
          const ry = dy > 0 ? 1.15 : 0.72;
          const rz = 0.68;

          x = dx * rx;
          y = dy * ry;
          z = dz * rz;

          // Anatomical temporal indents and frontal slope
          if (y < 0 && x < -0.32) y *= 0.74;
          if (y < 0 && x > -0.28 && x < 0.95) {
            y -= 0.16 * Math.sin(((x + 0.28) / 1.23) * Math.PI) * -dy;
          }
          if (x > 0) y += 0.05 * x;

          // Cortical folds
          const fold = brainFoldHarmonics(x, y, z + s);
          if (rnd() < fold * 0.88 && tries < 10) continue;

          const k = 1.0 - 0.1 * fold + gauss() * 0.015;
          x *= k;
          y *= k;
          // Separate hemispheres slightly along the fissure
          z = z * k + s * 0.58;
          break;
        } else if (p < 0.94) {
          // Cerebellum (Lower rear)
          layerType = 1;
          let dx = gauss(), dy = gauss(), dz = gauss();
          const len = Math.hypot(dx, dy, dz) || 1;
          dx /= len; dy /= len; dz /= len;

          const fineFolds = 1.0 - 0.06 * Math.pow(Math.abs(Math.sin(dy * 24)), 4);
          x = 0.96 + dx * 0.48 * fineFolds;
          y = -0.6 + dy * 0.32 * fineFolds;
          z = dz * 0.74 * fineFolds;
          break;
        } else {
          // Brainstem & Pineal Gateway
          layerType = 2;
          const t = rnd();
          const ang = rnd() * Math.PI * 2;
          const rad = 0.16 * (1.0 - t * 0.2);
          x = 0.48 + t * 0.16 + Math.cos(ang) * rad;
          y = -0.5 - t * 0.72;
          z = Math.sin(ang) * rad;
          break;
        }
      }

      // Center brain in space
      const bx = (x - 0.18) * BRAIN_SCALE;
      const by = (y * BRAIN_SCALE) + 0.12;
      const bz = z * BRAIN_SCALE;

      positions[idx3] = bx;
      positions[idx3 + 1] = by;
      positions[idx3 + 2] = bz;

      // Color coding for Neural Mind
      // Frontal cortex: Radiant Mind Cyan & Gold
      // Cerebrum: Teal & Mint
      // Crown: Ethereal Light
      let rCol = 0.22, gCol = 0.92, bCol = 0.88;
      const elevation = (by + 1.2) / 2.4;

      if (rnd() < 0.14) {
        // Active firing synaptic spark (Golden/Amber)
        rCol = 0.96; gCol = 0.84; bCol = 0.45;
      } else if (layerType === 2) {
        // Stem
        rCol = 0.24; gCol = 0.72; bCol = 0.88;
      } else {
        // Smooth gradient along brain depth
        rCol = 0.16 + elevation * 0.2;
        gCol = 0.78 + elevation * 0.2;
        bCol = 0.74 + (1 - elevation) * 0.22;
      }

      colors[idx3] = rCol;
      colors[idx3 + 1] = gCol;
      colors[idx3 + 2] = bCol;

      types[i] = 1.0; // Mind Node

      params[idx4] = Math.hypot(bx, bz);
      params[idx4 + 1] = Math.atan2(bz, bx);
      params[idx4 + 2] = layerType;
      params[idx4 + 3] = elevation;

      rands[idx4] = rnd();
      rands[idx4 + 1] = rnd();
      rands[idx4 + 2] = rnd();
      rands[idx4 + 3] = rnd();

      // Sample a subset for neural synaptic connection lines
      if (neuralHubs.length < 160 && rnd() < 0.04) {
        neuralHubs.push(new THREE.Vector3(bx, by, bz));
      }
    }

    // ─── 3. Synaptic Network Connectors (Neural Dendrite Lines) ───
    const synapticPairs: number[] = [];
    const maxDist = 0.75;
    for (let a = 0; a < neuralHubs.length; a++) {
      let connections = 0;
      for (let b = a + 1; b < neuralHubs.length; b++) {
        const d = neuralHubs[a].distanceTo(neuralHubs[b]);
        if (d < maxDist && connections < 3) {
          synapticPairs.push(
            neuralHubs[a].x, neuralHubs[a].y, neuralHubs[a].z,
            neuralHubs[b].x, neuralHubs[b].y, neuralHubs[b].z
          );
          connections++;
        }
      }
    }

    const synGeo = new THREE.BufferGeometry();
    synGeo.setAttribute("position", new THREE.Float32BufferAttribute(synapticPairs, 3));
    
    // Synapse pulse shader
    const synMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAlpha: { value: 0.28 },
      },
      vertexShader: `
        uniform float uTime;
        varying float vPulse;
        void main() {
          vec3 p = position;
          // Subtle neural breath expansion
          float breath = 1.0 + 0.03 * sin(uTime * 0.75);
          p *= breath;
          vPulse = sin(uTime * 2.8 + p.x * 3.5 + p.y * 4.2);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uAlpha;
        varying float vPulse;
        void main() {
          float glow = smoothstep(0.4, 0.98, vPulse);
          vec3 baseCol = vec3(0.18, 0.74, 0.72);
          vec3 pulseCol = vec3(0.95, 0.88, 0.52);
          vec3 col = mix(baseCol, pulseCol, glow);
          float alpha = (uAlpha * 0.45 + glow * 0.55);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const synLines = new THREE.LineSegments(synGeo, synMat);
    scene.add(synLines);

    // ─── 4. Main Point Cloud BufferGeometry ───
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aRnd", new THREE.BufferAttribute(rands, 4));
    geo.setAttribute("aType", new THREE.BufferAttribute(types, 1));
    geo.setAttribute("aParam", new THREE.BufferAttribute(params, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);

    // Uniforms for interactive experience
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uMouseStr: { value: 0 },
      uScrollRot: { value: 0 },
      uTilt: { value: new THREE.Vector2() },
      uAspect: { value: window.innerWidth / window.innerHeight },
      uPR: { value: renderer.getPixelRatio() },
      uBaseSize: { value: isSmall ? 5.8 : 5.0 },
      uClickPulse: { value: 0 },
      uClickPos: { value: new THREE.Vector2(0, 0) },
    };

    // Vertex Shader: Blending 3D Galaxy differential rotation with Neural Mind respiration & cursor physics
    const vertShader = /* glsl */ `
      uniform float uTime, uMouseStr, uScrollRot, uAspect, uPR, uBaseSize, uClickPulse;
      uniform vec2 uMouse, uTilt, uClickPos;
      attribute vec3 aColor;
      attribute vec4 aRnd, aParam;
      attribute float aType;

      varying vec3 vColor;
      varying float vAlpha;

      mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
      mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
      mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c, s, 0., -s, c, 0., 0., 0., 1.); }

      void main() {
        vec3 p = position;
        float isMind = aType;
        float isGalaxy = 1.0 - aType;

        // 1. GALAXY PHYSICS: Differential Keplerian orbital rotation
        if (isGalaxy > 0.5) {
          float r = aParam.x;
          // Inner orbits faster, outer trails gracefully
          float orbitalSpeed = (0.16 / (pow(r + 0.35, 0.65))) * uTime * 0.9;
          // Spiral oscillation wave
          float spiralWave = sin(r * 2.2 - uTime * 1.1) * 0.035;
          p = rotY(orbitalSpeed + uScrollRot * 0.4) * p;
          p.y += spiralWave;
          // Galaxy majestic tilt angle
          p = rotX(0.42 + uTilt.y * 0.22) * rotZ(-0.18 + uTilt.x * 0.15) * p;
        }

        // 2. MIND / NEURAL PHYSICS: Meditative breathing cycle & thought waves
        if (isMind > 0.5) {
          // Mind Detoxx meditative breath rhythm (~0.12Hz)
          float breathInhale = sin(uTime * 0.72) * 0.038;
          float finePulse = sin(uTime * 1.8 + aParam.w * 3.14) * 0.015;
          float breath = 1.0 + breathInhale + finePulse;
          p *= breath;

          // Thought wave ripple travelling through lobes
          float thoughtWave = sin(p.x * 2.4 + p.y * 3.1 - uTime * 2.2) * 0.02;
          p.z += thoughtWave;

          // Mind 3D orientation & subtle responsive tilt
          p = rotY(-0.18 + sin(uTime * 0.2) * 0.12 + uTilt.x * 0.45 + uScrollRot * 0.5) 
            * rotX(0.12 + uTilt.y * 0.28) * p;
        }

        // Combined subtle space drift
        p += vec3(
          sin(uTime * 0.3 + aRnd.x * 6.28) * 0.04,
          cos(uTime * 0.25 + aRnd.y * 6.28) * 0.04,
          sin(uTime * 0.28 + aRnd.z * 6.28) * 0.04
        );

        // Project to view space
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vec4 cp = projectionMatrix * mv;
        vec2 ndc = cp.xy / cp.w;

        // 3. MOUSE INTERACTIVITY: Magnetic attractor & consciousness wake
        vec2 mDist = ndc - uMouse;
        mDist.x *= uAspect;
        float distToMouse = length(mDist);
        float mouseAttract = exp(-distToMouse * distToMouse * 22.0) * uMouseStr;

        // Subtle gravitational swirl near pointer
        mv.xy += normalize(mDist + 1e-4) * mouseAttract * 0.022;

        // 4. CLICK PULSE WAVE
        float clickDist = length(ndc - uClickPos);
        float pulseBand = abs(clickDist - uClickPulse);
        float shock = smoothstep(0.18, 0.0, pulseBand) * step(0.01, uClickPulse);

        gl_Position = projectionMatrix * mv;

        // Point size calculations
        float sparkle = step(0.985, aRnd.w); // Stardust twinkle
        float neuralSpark = isMind * step(0.97, aRnd.z) * sin(uTime * 6.0 + aRnd.x * 20.0);
        
        float size = uBaseSize * (0.65 + aRnd.x * 0.75) 
          * (1.0 + sparkle * 0.95 + neuralSpark * 1.4) 
          * (1.0 + mouseAttract * 1.7) 
          * (1.0 + shock * 0.8);

        // Perspective point attenuation
        gl_PointSize = size * uPR * (4.5 / -mv.z);

        // Color blending with interactive highlights
        vec3 col = aColor;
        // Near mouse: illuminate into celestial turquoise-gold
        vec3 lightHighlight = mix(vec3(0.55, 1.0, 0.92), vec3(0.98, 0.88, 0.58), isMind);
        col = mix(col, lightHighlight, clamp(mouseAttract * 1.35 + shock * 0.9 + sparkle * 0.6, 0.0, 1.0));

        vColor = col;
        // Dynamic alpha: glowing center, subtle depth
        float baseAlpha = isGalaxy > 0.5 ? (0.68 + aRnd.y * 0.3) : (0.75 + aRnd.y * 0.25);
        vAlpha = clamp(baseAlpha + mouseAttract * 0.4 + shock * 0.35 + neuralSpark * 0.5, 0.15, 1.0);
      }
    `;

    // Fragment Shader: Soft circular particle with luminous core glow
    const fragShader = /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // Distance from point center [0, 0.5]
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;

        // Smooth gaussian-like celestial radial falloff
        float core = smoothstep(0.5, 0.02, d);
        core = core * core;
        float hotCore = smoothstep(0.2, 0.0, d) * 0.45;

        vec3 finalCol = vColor + vec3(hotCore);
        float finalA = core * vAlpha;

        gl_FragColor = vec4(finalCol * finalA, finalA);
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    // ─── 5. Ambient Floating Cosmic Stardust (Deep Space Depth) ───
    const DUST_N = isSmall ? 180 : 380;
    const dPos = new Float32Array(DUST_N * 3);
    const dSpd = new Float32Array(DUST_N);

    for (let i = 0; i < DUST_N; i++) {
      dPos[i * 3] = (rnd() * 2 - 1) * 14;
      dPos[i * 3 + 1] = (rnd() * 2 - 1) * 9;
      dPos[i * 3 + 2] = -rnd() * 12 + 1;
      dSpd[i] = 0.2 + rnd() * 0.8;
    }

    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
    dGeo.setAttribute("aSpd", new THREE.BufferAttribute(dSpd, 1));

    const dMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: uniforms.uTime,
        uPR: uniforms.uPR,
        uScroll: { value: 0 },
      },
      vertexShader: `
        uniform float uTime, uPR, uScroll;
        attribute float aSpd;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.y += mod(uTime * 0.04 * aSpd + uScroll * 0.5 + 8.0, 16.0) - 8.0;
          p.x += sin(uTime * 0.15 + aSpd * 20.0) * 0.25;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (2.2 + aSpd * 3.5) * uPR * (5.0 / -mv.z);
          vAlpha = 0.2 + 0.45 * abs(sin(uTime * 0.5 + aSpd * 15.0));
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.0, d);
          vec3 col = vec3(0.35, 0.92, 0.82);
          gl_FragColor = vec4(col * a * vAlpha, a * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const dust = new THREE.Points(dGeo, dMat);
    dust.frustumCulled = false;
    scene.add(dust);

    // ───────────────────────── Interaction & Listeners ─────────────────────────
    const mouse = new THREE.Vector2(99, 99);
    const tilt = new THREE.Vector2();
    const tiltTarget = new THREE.Vector2();
    let mouseActive = 0;
    let lastMouseMove = 0;
    let clickPulse = 0;

    const onPointerMove = (e: PointerEvent) => {
      mouse.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
      tiltTarget.set(mouse.x, mouse.y);
      lastMouseMove = performance.now();
    };

    const onPointerLeave = () => {
      lastMouseMove = 0;
    };

    const onPointerDown = (e: PointerEvent) => {
      uniforms.uClickPos.value.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
      clickPulse = 0.01;
    };

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      uniforms.uAspect.value = width / height;
      camera.position.z = Math.min(width, height) < 768 ? 8.6 : 6.8;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("resize", onResize);

    // ───────────────────────── Animation Loop ─────────────────────────
    let lastTime = performance.now();
    let animId: number;
    let smoothScroll = 0;

    function renderFrame() {
      const now = performance.now();
      const dt = Math.min((now - lastTime) * 0.001, 0.05);
      lastTime = now;

      // Time progression (gentler if motion reduced)
      uniforms.uTime.value += reduceMotion ? dt * 0.35 : dt;
      synMat.uniforms.uTime.value = uniforms.uTime.value;

      // Smooth scroll parallax across all pages
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      smoothScroll += (scrollY * 0.0012 - smoothScroll) * Math.min(1, dt * 4.0);
      uniforms.uScrollRot.value = smoothScroll;
      dMat.uniforms.uScroll.value = smoothScroll;

      // Mouse inactivity decay
      const isActive = lastMouseMove && now - lastMouseMove < 3000 ? 1 : 0;
      mouseActive += (isActive - mouseActive) * Math.min(1, dt * 5.0);
      uniforms.uMouse.value.lerp(mouse, Math.min(1, dt * 8.0));
      uniforms.uMouseStr.value = mouseActive * (reduceMotion ? 0.35 : 1.0);

      // Smooth camera / scene tilt
      tilt.lerp(tiltTarget, Math.min(1, dt * 3.0));
      uniforms.uTilt.value.copy(tilt);

      // Click ripple propagation
      if (clickPulse > 0) {
        clickPulse += dt * 1.8;
        if (clickPulse > 2.2) clickPulse = 0;
      }
      uniforms.uClickPulse.value = clickPulse;

      // Synchronize synLines tilt and breathing
      synLines.rotation.y = -0.18 + Math.sin(uniforms.uTime.value * 0.2) * 0.12 + tilt.x * 0.45 + smoothScroll * 0.5;
      synLines.rotation.x = 0.12 + tilt.y * 0.28;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderFrame);
    }

    renderFrame();

    // ───────────────────────── Cleanup ─────────────────────────
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);

      renderer.dispose();
      geo.dispose();
      mat.dispose();
      synGeo.dispose();
      synMat.dispose();
      dGeo.dispose();
      dMat.dispose();
    };
  }, []);

  return (
    <>
      {/* ───────── Aurora Layer (Deep ethereal backlighting) ───────── */}
      <div className={styles.aurora} aria-hidden="true">
        <i className={styles.a1} />
        <i className={styles.a2} />
        <i className={styles.a3} />
        <i className={styles.a4} />
      </div>

      {/* ───────── 3D Galaxy & Mind WebGL Canvas ───────── */}
      <canvas className={styles.glCanvas} ref={glCanvasRef} aria-hidden="true" />
    </>
  );
}
