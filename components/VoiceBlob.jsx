import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function VoiceBlob() {
    const containerRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        // Light background requires no fog or white fog if we wanted depth
        // but transparency works best here.

        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 4.5;
        camera.position.y = 1;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle count - slightly denser for liquid feel
        const particleCount = 10000;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const randoms = new Float32Array(particleCount); // For phase offset

        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;

            const radius = 2.2; // Base radius

            positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
            positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Light Mode Colors: Deep Indigo to Bright Blue
            // We want distinct points against white background
            const colorMix = Math.random();
            if (colorMix > 0.5) {
                // Indigo-600 #4f46e5
                colors[i * 3] = 0.31;
                colors[i * 3 + 1] = 0.27;
                colors[i * 3 + 2] = 0.90;
            } else {
                // Blue-500 #3b82f6
                colors[i * 3] = 0.23;
                colors[i * 3 + 1] = 0.51;
                colors[i * 3 + 2] = 0.96;
            }

            // Size variation
            sizes[i] = Math.random() * 2.5 + 0.5;
            randoms[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

        // Shader material for Light Mode
        // Uses NormalBlending so particles are visible against white
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
            },
            vertexShader: `
                attribute float size;
                attribute float aRandom;
                attribute vec3 color;
                
                varying vec3 vColor;
                varying float vAlpha;
                
                uniform float uTime;
                uniform vec2 uMouse;
                uniform float uPixelRatio;
                
                // Simplex Noise Function
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                float snoise(vec3 v) {
                    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
                    vec3 i  = floor(v + dot(v, C.yyy) );
                    vec3 x0 = v - i + dot(i, C.xxx) ;
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min( g.xyz, l.zxy );
                    vec3 i2 = max( g.xyz, l.zxy );
                    vec3 x1 = x0 - i1 + C.xxx;
                    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
                    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
                    i = mod289(i);
                    vec4 p = permute( permute( permute(
                                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                    float n_ = 0.142857142857; // 1.0/7.0
                    vec3  ns = n_ * D.wyz - D.xzx;
                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
                    vec4 x = x_ *ns.x + ns.yyyy;
                    vec4 y = y_ *ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);
                    vec4 b0 = vec4( x.xy, y.xy );
                    vec4 b1 = vec4( x.zw, y.zw );
                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));
                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                    vec3 p0 = vec3(a0.xy,h.x);
                    vec3 p1 = vec3(a0.zw,h.y);
                    vec3 p2 = vec3(a1.xy,h.z);
                    vec3 p3 = vec3(a1.zw,h.w);
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                    p0 *= norm.x;
                    p1 *= norm.y;
                    p2 *= norm.z;
                    p3 *= norm.w;
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                                dot(p2,x2), dot(p3,x3) ) );
                }
                
                void main() {
                    vColor = color;
                    
                    vec3 pos = position;
                    
                    // Organic Liquid Displacement (Simplex Noise)
                    float noiseFreq = 0.6;
                    float noiseAmp = 0.2;
                    float noiseTime = uTime * 0.3;
                    
                    float n = snoise(vec3(pos.x * noiseFreq + noiseTime, pos.y * noiseFreq, pos.z * noiseFreq));
                    pos += normal * n * noiseAmp;

                    // Mouse influence - repel effect
                    float d = distance(pos.xy, uMouse * 4.0);
                    float force = max(0.0, 1.0 - d);
                    pos += normal * force * 0.5 * aRandom;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    
                    // Fade edges slightly
                    vAlpha = 1.0; 
                    
                    gl_PointSize = size * uPixelRatio * (200.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    // Soft Circle
                    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                    float r = dot(cxy, cxy);
                    if (r > 1.0) discard;
                    
                    // Solid core with soft edge
                    float alpha = (1.0 - r) * vAlpha;
                    
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending // Changed from Additive to Normal for Light Mode
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const handleMouseMove = (event) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animationId;
        const clock = new THREE.Clock();

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Smoother, fluid rotation
            particles.rotation.y = elapsedTime * 0.08;
            particles.rotation.z = Math.sin(elapsedTime * 0.05) * 0.05;

            material.uniforms.uTime.value = elapsedTime;
            material.uniforms.uMouse.value.set(
                mouseRef.current.x,
                mouseRef.current.y
            );

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="voice-blob-container" />
    );
}

export default VoiceBlob;
