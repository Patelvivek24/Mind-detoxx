"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function MindDetoxExperience() {
  const glCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const warpCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const pctRef = useRef<HTMLSpanElement | null>(null);
  const barFillRef = useRef<HTMLElement | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = Math.min(window.innerWidth, window.innerHeight) < 700;

    // ───────────────────────── Word reveal ─────────────────────────
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal");
    revealElements.forEach((el) => {
      const walk = (node: Node) => {
        const childNodes = Array.from(node.childNodes);
        childNodes.forEach((n) => {
          if (n.nodeType === 3) {
            // Text node
            const frag = document.createDocumentFragment();
            const parts = (n.textContent || "").split(/(\s+)/);
            parts.forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(part));
                return;
              }
              const s = document.createElement("span");
              s.className = "w";
              s.textContent = part;
              frag.appendChild(s);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && (n as HTMLElement).tagName !== "BR") {
            walk(n);
          }
        });
      };
      walk(el);
      el.querySelectorAll<HTMLElement>(".w").forEach((w, i) => {
        w.style.transitionDelay = i * 0.06 + "s";
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle("in", e.isIntersecting));
      },
      { threshold: 0.2 }
    );

    let revealReady = false;
    function startReveal() {
      if (revealReady) return;
      revealReady = true;
      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    }

    // ───────────────────────── Loader (warp streaks) ─────────────────────────
    const warp = warpCanvasRef.current;
    let warpAnimId: number | null = null;
    let loaderOn = true;

    if (warp) {
      const wctx = warp.getContext("2d");
      const STREAK_COLS = ["#ffffff", "#9ff5cf", "#5cf2ae", "#6f6bff", "#8ab4ff"];
      interface Streak {
        x: number;
        y: number;
        len: number;
        sp: number;
        c: string;
        a: number;
      }
      const streaks: Streak[] = [];

      const sizeWarp = () => {
        if (!warp) return;
        warp.width = window.innerWidth * window.devicePixelRatio;
        warp.height = window.innerHeight * window.devicePixelRatio;
      };
      sizeWarp();

      const newStreak = (anywhere: boolean): Streak => ({
        x: Math.random() * warp.width * 1.3,
        y: anywhere ? Math.random() * warp.height : -Math.random() * 200,
        len: (40 + Math.random() * 120) * window.devicePixelRatio,
        sp: (6 + Math.random() * 14) * window.devicePixelRatio,
        c: STREAK_COLS[(Math.random() * STREAK_COLS.length) | 0],
        a: 0.25 + Math.random() * 0.6,
      });

      for (let i = 0; i < 180; i++) streaks.push(newStreak(true));

      const DX = -0.34;
      const DY = 0.94;

      const drawWarp = () => {
        if (!loaderOn || !wctx) return;
        wctx.clearRect(0, 0, warp.width, warp.height);
        wctx.lineWidth = 1.2 * window.devicePixelRatio;
        for (const s of streaks) {
          s.x += DX * s.sp;
          s.y += DY * s.sp;
          if (s.y - s.len > warp.height || s.x < -50) Object.assign(s, newStreak(false));
          const g = wctx.createLinearGradient(s.x, s.y, s.x - DX * s.len, s.y - DY * s.len);
          g.addColorStop(0, s.c);
          g.addColorStop(1, "transparent");
          wctx.strokeStyle = g;
          wctx.globalAlpha = s.a;
          wctx.beginPath();
          wctx.moveTo(s.x, s.y);
          wctx.lineTo(s.x - DX * s.len, s.y - DY * s.len);
          wctx.stroke();
        }
        wctx.globalAlpha = 1;
        warpAnimId = requestAnimationFrame(drawWarp);
      };
      drawWarp();
    }

    // ───────────────────────── Three.js Scene ─────────────────────────
    const canvas = glCanvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.error(e);
      setLoaderDone(true);
      startReveal();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, window.innerWidth < 700 ? 9.5 : 7);

    const N = isSmall ? 38000 : 91000;
    const rnd = Math.random;
    const gauss = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(6.2831853 * rnd());
    const sstep = (a: number, b: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };

    const aTorus = new Float32Array(N * 3);
    const aGal = new Float32Array(N * 3);
    const aWave = new Float32Array(N * 3);
    const aBrain = new Float32Array(N * 3);
    const aRnd = new Float32Array(N * 4);
    const aCol = new Float32Array(N * 4);

    /* 0 · Torus — stored as a (u,v) lattice so the shader can animate its lumps */
    {
      const U = Math.round(Math.sqrt(N * 2.2));
      const V = Math.max(8, Math.round(N / U));
      for (let i = 0; i < N; i++) {
        const iu = i % U;
        const iv = Math.floor(i / U) % V;
        const u = ((iu + (rnd() - 0.5) * 0.25) / U) * Math.PI * 2;
        const v = ((iv + (rnd() - 0.5) * 0.25) / V) * Math.PI * 2;
        aTorus[i * 3] = u;
        aTorus[i * 3 + 1] = v;
        aTorus[i * 3 + 2] = gauss() * 0.018;
      }
    }

    /* 1 · Galaxy — concentric rings + spiral core + halo */
    for (let i = 0; i < N; i++) {
      const p = rnd();
      let r: number, a: number, y: number;
      if (p < 0.34) {
        r = 2.75 + gauss() * 0.08;
        a = rnd() * 6.2832;
        y = gauss() * 0.03;
      } else if (p < 0.52) {
        r = 1.85 + gauss() * 0.06;
        a = rnd() * 6.2832;
        y = gauss() * 0.03;
      } else if (p < 0.62) {
        r = 1.12 + gauss() * 0.045;
        a = rnd() * 6.2832;
        y = gauss() * 0.03;
      } else if (p < 0.78) {
        const arm = (rnd() * 2) | 0;
        r = Math.pow(rnd(), 1.25) * 0.8;
        a = arm * Math.PI + r * 5.2 + gauss() * 0.22;
        y = gauss() * 0.05;
      } else {
        r = 0.35 + Math.pow(rnd(), 0.8) * 3.4 + gauss() * 0.12;
        a = rnd() * 6.2832;
        y = gauss() * 0.09;
      }
      aGal[i * 3] = r * Math.cos(a);
      aGal[i * 3 + 1] = y;
      aGal[i * 3 + 2] = r * Math.sin(a);
      aCol[i * 4 + 1] = p >= 0.62 && p < 0.78 ? 0.02 : sstep(0.3, 2.8, r) * 0.95 + 0.05;
    }

    /* 2 · Wave — a bright horizontal line with a violet cloud at its heart */
    for (let i = 0; i < N; i++) {
      const p = rnd();
      let x: number, y: number, z: number, t: number;
      if (p < 0.6) {
        x = (rnd() * 2 - 1) * 6.8;
        y = gauss() * 0.03;
        z = gauss() * 0.05;
        t = 0.55 + sstep(0.2, 3, Math.abs(x)) * 0.45;
      } else if (p < 0.8) {
        x = gauss() * 0.5 + 0.15;
        y = gauss() * 0.55;
        z = gauss() * 0.35;
        t = 0.03;
      } else if (p < 0.86) {
        const a = Math.PI * (0.15 + rnd() * 1.0);
        x = -0.55 + Math.cos(a) * 0.5;
        y = Math.sin(a) * 0.42;
        z = gauss() * 0.02;
        t = 0.6;
      } else {
        x = (rnd() * 2 - 1) * 5.5;
        y = gauss() * 0.16;
        z = gauss() * 0.35;
        t = 0.4 + sstep(0, 4, Math.abs(x)) * 0.6;
      }
      aWave[i * 3] = x;
      aWave[i * 3 + 1] = y;
      aWave[i * 3 + 2] = z;
      aCol[i * 4 + 2] = t;
    }

    /* 3 · Brain — two folded hemispheres, cerebellum, brain stem (side view) */
    function folds(x: number, y: number, z: number) {
      const f =
        Math.sin(x * 6.1 + Math.sin(y * 4.3 + z * 2.1) * 1.7) +
        Math.sin(y * 6.7 + Math.sin(z * 5.3 + x * 1.3) * 1.6) +
        Math.sin(z * 5.9 + Math.sin(x * 4.7) * 1.5);
      return Math.pow(1 - Math.abs(Math.sin(f * 1.9)), 7); // 1 inside a groove
    }

    for (let i = 0; i < N; i++) {
      let x = 0,
        y = 0,
        z = 0,
        tries = 0;
      const p = rnd();
      while (true) {
        tries++;
        if (p < 0.84) {
          // cerebrum
          const s = rnd() < 0.5 ? -1 : 1;
          let dx = gauss(),
            dy = gauss(),
            dz = gauss();
          const l = Math.hypot(dx, dy, dz);
          dx /= l;
          dy /= l;
          dz /= l;
          const rx = 1.55;
          let ry = dy > 0 ? 1.12 : 0.72;
          const rz = 0.66;
          x = dx * rx;
          y = dy * ry;
          z = dz * rz;
          if (y < 0 && x < -0.35) y *= 0.72; // frontal lobe sits higher
          if (y < 0 && x > -0.3 && x < 1.0) y -= 0.18 * Math.sin(((x + 0.3) / 1.3) * Math.PI) * -dy; // temporal lobe hangs lower
          if (x > 0) y += 0.06 * x; // slight backward rise
          const g = folds(x, y, z + s);
          if (rnd() < g * 0.9 && tries < 10) continue; // thinner in the grooves
          const k = 1 - 0.11 * g + gauss() * 0.014;
          x *= k;
          y *= k;
          z = z * k + s * 0.64;
          break;
        } else if (p < 0.95) {
          // cerebellum
          let dx = gauss(),
            dy = gauss(),
            dz = gauss();
          const l = Math.hypot(dx, dy, dz);
          dx /= l;
          dy /= l;
          dz /= l;
          const k = 1 - 0.05 * Math.pow(Math.abs(Math.sin(dy * 22)), 4);
          x = 0.98 + dx * 0.5 * k;
          y = -0.62 + dy * 0.33 * k;
          z = dz * 0.78 * k;
          break;
        } else {
          // stem
          const t = rnd(),
            a = rnd() * 6.2832,
            r = 0.17 * (1 - t * 0.2);
          x = 0.5 + t * 0.18 + Math.cos(a) * r;
          y = -0.5 - t * 0.75;
          z = Math.sin(a) * r;
          break;
        }
      }
      const S = 1.2;
      aBrain[i * 3] = (x - 0.2) * S;
      aBrain[i * 3 + 1] = y * S + 0.15;
      aBrain[i * 3 + 2] = z * S;
      aCol[i * 4 + 3] = Math.min(1, Math.max(0, (y + 1.25) / 2.3));
      aRnd[i * 4] = rnd();
      aRnd[i * 4 + 1] = rnd();
      aRnd[i * 4 + 2] = rnd();
      aRnd[i * 4 + 3] = rnd();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute("aTorus", new THREE.BufferAttribute(aTorus, 3));
    geo.setAttribute("aGal", new THREE.BufferAttribute(aGal, 3));
    geo.setAttribute("aWave", new THREE.BufferAttribute(aWave, 3));
    geo.setAttribute("aBrain", new THREE.BufferAttribute(aBrain, 3));
    geo.setAttribute("aRnd", new THREE.BufferAttribute(aRnd, 4));
    geo.setAttribute("aCol", new THREE.BufferAttribute(aCol, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);

    const uniforms = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uIntro: { value: 0 },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uMouseStr: { value: 0 },
      uAspect: { value: window.innerWidth / window.innerHeight },
      uPR: { value: renderer.getPixelRatio() },
      uSize: { value: isSmall ? 6.2 : 5.4 },
      uFade: { value: 1 },
      uTilt: { value: new THREE.Vector2() },
    };

    const vert = /* glsl */ `
      uniform float uTime,uMorph,uIntro,uMouseStr,uAspect,uPR,uSize;
      uniform vec2 uMouse,uTilt;
      attribute vec3 aTorus,aGal,aWave,aBrain;
      attribute vec4 aRnd,aCol;
      varying vec3 vColor; varying float vAlpha;

      mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s, 0.,1.,0., s,0.,c);}
      mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0., 0.,c,s, 0.,-s,c);}

      vec3 palette(float t){
        vec3 v=vec3(.47,.28,1.), b=vec3(.30,.62,1.), g=vec3(.38,1.,.68);
        return t<.5 ? mix(v,b,t*2.) : mix(b,g,(t-.5)*2.);
      }

      vec3 torusPos(){
        float u=aTorus.x, v=aTorus.y, t=uTime;
        float R=1.28;
        float lump = .05*sin(7.*u+t*.7) + .05*sin(4.*v+3.*u-t*.9) + .04*sin(11.*u-t*1.1+2.*v) + .035*sin(9.*v+t*.6+u);
        float r=.64*(1.+lump)+aTorus.z;
        float ring=R+.03*sin(3.*u+t*.5);
        vec3 p=vec3((ring+r*cos(v))*cos(u),(ring+r*cos(v))*sin(u),r*sin(v));
        p=rotY(sin(t*.3)*.35+uTilt.x*.45)*rotX(.12+sin(t*.23)*.18-uTilt.y*.35)*p;
        return p;
      }
      vec3 galPos(){
        vec3 p=aGal; float r=length(p.xz);
        p=rotY(uTime*.18*(1.6/(r+.45)))*p;
        p.y+=sin(r*3.-uTime*1.4)*.03;
        return rotX(.28+uTilt.y*.15)*rotY(uTilt.x*.2)*p;
      }
      vec3 wavePos(){
        vec3 p=aWave;
        float env=exp(-p.x*p.x*.04);
        p.y+=sin(p.x*1.1-uTime*1.5)*.10*env + sin(p.x*3.3+uTime*2.1)*.025;
        if(aRnd.x>.8) p.xy+=vec2(sin(uTime*.7+aRnd.y*30.),cos(uTime*.9+aRnd.z*30.))*.05;
        return rotX(uTilt.y*.2)*p;
      }
      vec3 brainPos(){
        vec3 p=aBrain*(1.+.018*sin(uTime*1.3));
        return rotY(-.2+sin(uTime*.25)*.35+uTilt.x*.6)*rotX(.08+uTilt.y*.25)*p;
      }
      vec3 shapePos(int k){
        vec3 p = torusPos();
        if(k == 1) p = galPos();
        else if(k == 2) p = wavePos();
        else if(k >= 3) p = brainPos();
        return p;
      }
      float shapeCol(int k,vec3 p){
        float c = clamp((p.y+1.9)/3.6,0.,1.);
        if(k == 1) c = aCol.y;
        else if(k == 2) c = aCol.z;
        else if(k >= 3) c = aCol.w;
        return c;
      }

      void main(){
        // staggered morph so particles don't all leave at once
        float m=clamp(uMorph+(aRnd.x-.5)*.3*(1.-step(2.999,uMorph)),0.,3.);
        int k0=int(floor(m)); int k1=min(k0+1,3);
        float f=m-float(k0); f=f*f*(3.-2.*f);

        vec3 p0=shapePos(k0), p1=shapePos(k1);
        vec3 pos=mix(p0,p1,f);
        float colT=mix(shapeCol(k0,p0),shapeCol(k1,p1),f);

        // burst outward mid-transition
        float burst=sin(f*3.14159);
        vec3 dir=normalize(vec3(aRnd.x-.5,aRnd.y-.5,aRnd.z-.5)+1e-4);
        pos+=dir*burst*(1.5+aRnd.w*3.5);
        pos+=vec3(sin(uTime*.8+aRnd.y*40.),cos(uTime*.6+aRnd.z*40.),sin(uTime*.7+aRnd.x*40.))*burst*.35;

        // intro assembly from a far cloud
        float e=clamp(uIntro*1.5-aRnd.w*.5,0.,1.); e=1.-pow(1.-e,3.);
        vec3 far=dir*(7.+aRnd.w*9.);
        pos=mix(far,pos,e);

        vec4 mv=modelViewMatrix*vec4(pos,1.);
        vec4 cp=projectionMatrix*mv;
        vec2 ndc=cp.xy/cp.w;
        vec2 d=ndc-uMouse; d.x*=uAspect;
        float dist=length(d);
        float infl=exp(-dist*dist/.008)*uMouseStr;
        mv.xy+=normalize(d+1e-5)*infl*.015;

        gl_Position=projectionMatrix*mv;

        float sparkle=step(.993,aRnd.z);
        float size=uSize*(.55+aRnd.y*.8)*(1.+sparkle*1.1)*(1.+infl*1.6)*(1.+burst*.4);
        gl_PointSize=size*uPR*(4.2/-mv.z);

        vec3 c=palette(colT);
        c=mix(c,vec3(.85,1.,.97),clamp(infl*1.2+sparkle*.55,0.,1.));
        vColor=c;
        vAlpha=(.62+aRnd.w*.38+sparkle*.3+infl)*e*(1.-burst*.35);
      }
    `;

    const frag = /* glsl */ `
      uniform float uFade;
      varying vec3 vColor; varying float vAlpha;
      void main(){
        float d=length(gl_PointCoord-.5);
        float a=smoothstep(.5,.05,d);
        a*=a;
        gl_FragColor=vec4(vColor*a*vAlpha*uFade, a*vAlpha*uFade);
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    /* Floating dust in the background */
    const DN = isSmall ? 250 : 600;
    const dPos = new Float32Array(DN * 3);
    const dR = new Float32Array(DN);
    for (let i = 0; i < DN; i++) {
      dPos[i * 3] = (rnd() * 2 - 1) * 12;
      dPos[i * 3 + 1] = (rnd() * 2 - 1) * 7;
      dPos[i * 3 + 2] = -rnd() * 10 + 1;
      dR[i] = rnd();
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
    dGeo.setAttribute("aR", new THREE.BufferAttribute(dR, 1));
    const dMat = new THREE.ShaderMaterial({
      uniforms: { uTime: uniforms.uTime, uPR: uniforms.uPR, uScroll: { value: 0 } },
      vertexShader: `
        uniform float uTime,uPR,uScroll; attribute float aR; varying float vA; varying float vR;
        void main(){ 
          vec3 p=position; 
          p.y+=mod(uTime*.05*(.3+aR)+uScroll*(.5+aR)+7.,14.)-7.; 
          p.x+=sin(uTime*.2+aR*20.)*.3;
          vec4 mv=modelViewMatrix*vec4(p,1.); 
          gl_Position=projectionMatrix*mv;
          gl_PointSize=(2.+aR*5.)*uPR*(5./-mv.z); 
          vA=.25+.5*abs(sin(uTime*.6+aR*30.)); 
          vR=aR; 
        }
      `,
      fragmentShader: `
        varying float vA; varying float vR; 
        void main(){ 
          float d=length(gl_PointCoord-.5); 
          float a=smoothstep(.5,0.,d);
          vec3 c=mix(vec3(.55,.5,1.),vec3(.5,1.,.8),vR); 
          gl_FragColor=vec4(c*a*vA,a*vA); 
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dGeo, dMat);
    dust.frustumCulled = false;
    scene.add(dust);

    /* ───────────────────────── Input & Tracking ───────────────────────── */
    const mouse = new THREE.Vector2(9, 9);
    const tilt = new THREE.Vector2();
    const tiltT = new THREE.Vector2();
    let mouseActive = 0;
    let lastMove = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mouse.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
      tiltT.set(mouse.x, mouse.y);
      lastMove = performance.now();
    };

    const handlePointerLeave = () => {
      lastMove = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    const stages = Array.from(document.querySelectorAll<HTMLElement>("section.stage"));
    const cardWrap = document.querySelector<HTMLElement>(".card-wrap");

    function targetMorph() {
      const y = window.scrollY;
      let m = 0;
      for (let i = 0; i < stages.length - 1; i++) {
        const a = stages[i].offsetTop;
        const b = stages[i + 1].offsetTop;
        if (y >= a) {
          const k = (y - a) / (b - a);
          m = i + sstep(0.45, 0.95, k);
        }
      }
      return Math.min(3, m);
    }

    function targetFade() {
      if (!cardWrap) return 1;
      const top = cardWrap.getBoundingClientRect().top;
      return Math.max(0.15, Math.min(1, (top / window.innerHeight) * 1.3));
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uAspect.value = window.innerWidth / window.innerHeight;
      camera.position.z = window.innerWidth < 700 ? 9.5 : 7;
      if (warp) {
        warp.width = window.innerWidth * window.devicePixelRatio;
        warp.height = window.innerHeight * window.devicePixelRatio;
      }
    };
    window.addEventListener("resize", handleResize);

    /* ───────────────────────── Loader timing ───────────────────────── */
    const pctEl = pctRef.current;
    const barEl = barFillRef.current;
    const loadStart = performance.now();
    const LOAD_MS = reduceMotion ? 300 : 2400;
    let introStart = 0;

    function finishLoader() {
      setLoaderDone(true);
      setTimeout(() => {
        loaderOn = false;
        if (warpAnimId) cancelAnimationFrame(warpAnimId);
      }, 1000);
      introStart = performance.now();
      startReveal();
    }

    /* ───────────────────────── Animation Loop ───────────────────────── */
    let lastTime = performance.now();
    let morph = 0;
    let fade = 1;
    let loaded = false;
    let animFrameId: number;

    function tick() {
      const now = performance.now();
      const dt = Math.min((now - lastTime) * 0.001, 0.05);
      lastTime = now;
      uniforms.uTime.value += reduceMotion ? dt * 0.25 : dt;

      if (!loaded) {
        const p = Math.min(1, (now - loadStart) / LOAD_MS);
        const eased = 1 - Math.pow(1 - p, 2);
        if (pctEl) pctEl.textContent = Math.round(eased * 100) + "%";
        if (barEl) barEl.style.width = eased * 100 + "%";
        if (p >= 1) {
          loaded = true;
          finishLoader();
        }
      } else {
        uniforms.uIntro.value = Math.min(1, (now - introStart) / (reduceMotion ? 200 : 2600));
      }

      morph += (targetMorph() - morph) * Math.min(1, dt * 3.2);
      uniforms.uMorph.value = morph;
      fade += (targetFade() - fade) * Math.min(1, dt * 4);
      uniforms.uFade.value = fade;
      dMat.uniforms.uScroll.value = window.scrollY * 0.0015;

      const active = lastMove && now - lastMove < 2500 ? 1 : 0;
      mouseActive += (active - mouseActive) * Math.min(1, dt * 4);
      uniforms.uMouse.value.lerp(mouse, Math.min(1, dt * 10));
      uniforms.uMouseStr.value = mouseActive * (reduceMotion ? 0.3 : 1);
      tilt.lerp(tiltT, Math.min(1, dt * 2));
      uniforms.uTilt.value.copy(tilt);

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      if (warpAnimId) cancelAnimationFrame(warpAnimId);
      cancelAnimationFrame(animFrameId);
      io.disconnect();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      dGeo.dispose();
      dMat.dispose();
    };
  }, []);

  return (
    <>
      {/* ───────── Aurora (soft blurred light behind the particles) ───────── */}
      <div className="aurora" aria-hidden="true">
        <i className="a1" />
        <i className="a2" />
        <i className="a3" />
        <i className="a4" />
      </div>

      {/* ───────── Three.js Canvas ───────── */}
      <canvas id="gl" ref={glCanvasRef} aria-hidden="true" />

      {/* ───────── Loader with warp streaks ───────── */}
      <div id="loader" ref={loaderRef} className={loaderDone ? "done" : ""} aria-hidden="true">
        <canvas id="warp" ref={warpCanvasRef} />
        <div className="tag">
          MIND DETOXX <span>/ BREATH — SYS.01</span>
        </div>
        <div className="status">
          <span>INITIALIZING ENVIRONMENT</span>
          <span id="pct" ref={pctRef}>
            0%
          </span>
        </div>
        <div className="bar">
          <b id="barFill" ref={barFillRef} />
        </div>
      </div>

      {/* ───────── Nav ───────── */}
      <nav>
        <a className="logo" href="#">
          <svg className="star" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6">
            <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
          </svg>
          Mind DetoxX
        </a>
        <div className="links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Activities</a>
          <a href="#">Schedule</a>
          <a href="#">Retreats</a>
        </div>
        <a className="cta" href="#">
          Contact Us ·
        </a>
      </nav>

      {/* ───────── Sections ───────── */}
      <main>
        {/* 0 · Torus */}
        <section className="stage hero" data-shape="0">
          <div className="pin">
            <h1 className="reveal">
              Detox the mind,
              <br />
              in motion
            </h1>
            <div className="rule" />
            <p className="kicker reveal">Breathe — move — reset. A yoga &amp; wellness studio on VIP Road, Surat.</p>
            <p className="desc reveal">
              A calm space to slow down, unclutter your thoughts and come back to yourself — one breath at a time.
            </p>
            <div className="tags">
              <span>[ YOGA ]</span>
              <em>•</em>
              <span>[ MEDITATION ]</span>
              <em>•</em>
              <span>[ RETREATS ]</span>
            </div>
            <div className="actions">
              <button className="btn">Book a Class</button>
              <span className="btn-sq">
                <svg className="star" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.6">
                  <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
                </svg>
              </span>
            </div>
          </div>
        </section>

        {/* 1 · Galaxy */}
        <section className="stage center" data-shape="1">
          <div className="pin">
            <h2 className="reveal">
              Find your centre,
              <br />
              in stillness
            </h2>
            <p className="sub reveal">
              Every breath here is a reply to you — slow, steady
              <br />
              and answered with a quieter mind.
            </p>
            <div className="stats">
              <div>
                <b>₹3,500</b>
                <span>Monthly membership</span>
              </div>
              <div>
                <b>₹3,000</b>
                <span>Each, group of five</span>
              </div>
              <div>
                <b>Mon–Fri</b>
                <span>Weekly classes</span>
              </div>
              <div>
                <b>₹1,500/hr</b>
                <span>Weekend studio rental</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2 · Wave */}
        <section className="stage center" data-shape="2">
          <div className="pin">
            <h2 className="reveal">
              Every breath,
              <br />
              a wave
            </h2>
            <p className="sub reveal" style={{ bottom: "12vh" }}>
              Inhale. Hold. Let it go. Guided practice that turns
              <br />
              restless energy into one calm, steady line.
            </p>
          </div>
        </section>

        {/* 3 · Brain */}
        <section className="stage brain-s" data-shape="3">
          <div className="pin">
            <h2 className="t1 reveal">A lighter mind</h2>
            <p className="side sl reveal">Leave the noise at the door — the mind gets lighter with every session</p>
            <p className="side sr reveal">Rest, reset, return</p>
            <h2 className="t2 reveal">starts here</h2>
          </div>
        </section>
      </main>

      {/* ───────── White card (rises over the scene) ───────── */}
      <div className="card-wrap">
        <div className="card">
          <div className="left">
            <h2 className="reveal">A living practice</h2>
            <div className="cols">
              <p>
                <b>[ 01 ]</b>Mind DetoxX is a studio for yoga, breathwork and meditation — built for people who want to feel lighter, not busier.
              </p>
              <p>
                <b>[ 02 ]</b>Classes run Monday to Friday every week, with monthly membership and group pricing for five.
              </p>
            </div>
          </div>
          <div className="visual" role="img" aria-label="Studio visual art representation" />
        </div>
      </div>

      {/* ───────── Footer ───────── */}
      <footer>
        <span>© Mind DetoxX, Surat</span>
        <span>VIP Road · Surat, Gujarat</span>
      </footer>
    </>
  );
}
