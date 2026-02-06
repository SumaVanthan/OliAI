import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex Shader: Handles displacement and varying transfer
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  // Simplex Noise (simplified for brevity)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

  float cnoise(vec3 P) {
      vec3 Pi0 = floor(P); // Integer part for indexing
      vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
      Pi0 = mod289(Pi0);
      Pi1 = mod289(Pi1);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.y, Pi0.y, Pi1.y, Pi1.y);
      vec4 iz = vec4(Pi0.z, Pi0.z, Pi0.z, Pi1.z);
      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy1 = permute(ixy + iz);
      vec4 ixy0 = permute(ixy + (iz - 1.0)); // Adjusted to match standard simplex
      vec4 gx0 = ixy1 / 7.0;
      vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);
      vec4 gx1 = ixy0 / 7.0;
      vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);
      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;
      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);
      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
      return 2.2 * n_xyz;
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    // Noise Displacement
    float noise = cnoise(position * 2.0 + uTime * 0.5); // Base noise
    float mouseInfluence = distance(uv, uMouse + 0.5); // Simple mouse distance
    
    // Displace vertices along normal
    float displacement = noise * 0.3; // Amplitude
    vDisplacement = displacement;
    
    vec3 newPosition = position + normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Fragment Shader: Handles Fresnel, color, and glow
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying float vDisplacement;

  void main() {
    // Colors (Forest/Sage Theme)
    vec3 colorBase = vec3(0.06, 0.24, 0.18); // Deep Forest Green (#0F3D2E approx)
    vec3 colorHigh = vec3(0.5, 0.66, 0.61); // Sage Green (#7FA99B approx)
    vec3 colorRim = vec3(0.65, 0.84, 0.77); // Mint (#A7D7C5 approx)

    // View direction (approximated for standard camera)
    vec3 viewDirection = normalize(vec3(0.0, 0.0, 1.0));
    
    // Fresnel Effect (Rim Lighting)
    float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);
    
    // Pattern based on displacement
    float pattern = smoothstep(0.0, 1.0, vDisplacement + 0.5);
    
    // Mix colors
    vec3 finalColor = mix(colorBase, colorHigh, pattern);
    finalColor = mix(finalColor, colorRim, fresnel); // Add rim
    
    // Add extra glow intensity based on Fresnel
    float alpha = 0.9 + fresnel * 0.5;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function QTSphere() {
    const meshRef = useRef();
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) }
    }), []);

    useFrame((state) => {
        const { clock, pointer } = state;
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.1; // Slow rotation
        meshRef.current.rotation.x = pointer.y * 0.05;

        // Update uniforms
        uniforms.uTime.value = clock.getElapsedTime();
        // Smooth pointer transition could be added here
        uniforms.uMouse.value.x = THREE.MathUtils.lerp(uniforms.uMouse.value.x, pointer.x, 0.1);
        uniforms.uMouse.value.y = THREE.MathUtils.lerp(uniforms.uMouse.value.y, pointer.y, 0.1);
    });

    return (
        <mesh ref={meshRef} position={[2, 0, 0]} scale={2.8}>
            {/* High segment count for smooth displacement */}
            <sphereGeometry args={[1, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export default function VoiceSphere() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }} // Tighter FOV for cinematic look
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <QTSphere />
            </Canvas>
        </div>
    );
}
