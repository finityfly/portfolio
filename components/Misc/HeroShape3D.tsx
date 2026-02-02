"use client";

/* eslint-disable react/no-multi-comp -- R3F scene uses inner Scene + mesh components */
/* eslint-disable react/no-unknown-property -- Three.js/R3F primitives use intensity, position, geometry, etc. */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";

const ROTATION_SPEED = 0.15;

function FloatingIcosahedron({ color }: { color: string }) {
  const ref = useRef<THREE.LineSegments>(null);
  const edgesGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 0);
    return new THREE.EdgesGeometry(geo);
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += ROTATION_SPEED * delta;
      ref.current.rotation.x += ROTATION_SPEED * 0.3 * delta;
    }
  });

  return (
    <lineSegments ref={ref} geometry={edgesGeometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function Scene({ color }: { color: string }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} intensity={0.4} />
      <FloatingIcosahedron color={color} />
    </>
  );
}

export default function HeroShape3D() {
  const accentColor = useColorModeValue("#319795", "#81E6D9"); // teal.500 / cyan.200

  return (
    <Box
      position="absolute"
      top={{ base: "12%", lg: "20%" }}
      right={{ base: "2%", md: "4%", lg: "8%" }}
      width={{ base: "100px", md: "120px", lg: "140px" }}
      height={{ base: "100px", md: "120px", lg: "140px" }}
      zIndex={0}
      pointerEvents="none"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Scene color={accentColor} />
      </Canvas>
    </Box>
  );
}
