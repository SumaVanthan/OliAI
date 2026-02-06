import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex Shader: Gentle Waves
const vertexShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vElevation;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    vec3 newPosition = position;
    
    // Wave simulation
    float waveInfo = sin(position.y * 3.0 + uTime * 1.5) * 0.1;
    float waveInfo2 = cos(position.x * 2.0 + uTime) * 0.1;
    
    // Expansion/Breathing effect
    float breathe = sin(uTime * 0.5) * 0.05;

    // Apply displacement
    float displacement = waveInfo + waveInfo2 + breathe;
    
    // Push vertices out along normal
    newPosition += normal * displacement;

    vElevation = displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Fragment Shader: Sun Glow
const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying float vElevation;

  void main() {
    // Colors
    // Core: Signal Amber (#E6B566)
    // High: Gold/Yellow (#F4DC9F)
    // Low/Shadow: Deep Green mixed with Amber (#5E8C7D)
    
    vec3 colorCore = vec3(0.90, 0.71, 0.40); // Amber/Signal
    vec3 colorHigh = vec3(0.96, 0.86, 0.62); // Light Gold
    vec3 colorShadow = vec3(0.37, 0.55, 0.49); // Sage/Shadow

    // Mix based on elevation/displacement
    float mixStrength = smoothstep(-0.2, 0.2, vElevation);
    vec3 color = mix(colorShadow, colorCore, mixStrength);
    
    // Add highlights
    color = mix(color, colorHigh, smoothstep(0.1, 0.3, vElevation));

    // Fresnel / Rim Light (Glowing edges)
    vec3 viewDirection = normalize(vec3(0.0, 0.0, 1.0));
    float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);
    
    // Rim color: Bright Amber/White
    vec3 rimColor = vec3(1.0, 0.9, 0.7);
    color += rimColor * fresnel * 0.8;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function SunSphere() {
    const meshRef = useRef();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uHover: { value: 0 }
    }), []);

    useFrame((state) => {
        const { clock } = state;
        // Rotation
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.z = clock.getElapsedTime() * 0.05;

        // Uniforms
        uniforms.uTime.value = clock.getElapsedTime();
    });

    return (
        <mesh ref={meshRef} scale={2.4}>
            {/* High poly count for smooth waves */}
            <sphereGeometry args={[1, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            // transparent={true}
            />
        </mesh>
    );
}

export default function VoiceSphere() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <SunSphere />
            </Canvas>
        </div>
    );
}
