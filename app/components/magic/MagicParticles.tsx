
"use client";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";

export function MagicParticles({ count = 5000 }) {
  const { viewport } = useThree();

  const pointsRef = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * (viewport.width * 2);
      const y = (Math.random() - 0.5) * (viewport.height * 2);
      const z = (Math.random() - 0.5) * 15;
      temp[i3] = x;
      temp[i3 + 1] = y;
      temp[i3 + 2] = z;
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame((state, delta) => {
    pointsRef.current.rotation.y += delta / 15;
    pointsRef.current.rotation.x += delta / 25;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#8774d9"
        sizeAttenuation
        transparent
        opacity={0.7}
        fog={false}
      />
    </points>
  );
}
