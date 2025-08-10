import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingGlobe() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((_state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.15;
      mesh.current.rotation.x = Math.sin(_state.clock.elapsedTime * 0.1) * 0.05;
    }
  });
  return (
    <group>
      <mesh ref={mesh}>
        <sphereGeometry args={[1.5, 64, 64]} />
        {/* @ts-ignore r3f material props typing in TS */}
        <meshStandardMaterial {...({ color: "hsl(210, 80%, 60%)", roughness: 0.9, metalness: 0.05 } as any)} />
      </mesh>
      {/* subtle atmosphere */}
      <mesh scale={1.03}>
        <sphereGeometry args={[1.5, 64, 64]} />
        {/* @ts-ignore r3f material props typing in TS */}
        <meshBasicMaterial {...({ color: "hsl(210, 100%, 98%)", transparent: true, opacity: 0.06 } as any)} />
      </mesh>
    </group>
  );
}

export default function Globe() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 50 }} className="pointer-events-none">
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <RotatingGlobe />
    </Canvas>
  );
}
