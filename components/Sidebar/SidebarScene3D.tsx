"use client";

/* eslint-disable react/no-multi-comp -- R3F scene uses inner Scene + mesh components */
/* eslint-disable react/no-unknown-property -- Three.js/R3F primitives use intensity, position, geometry, etc. */

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";

const SPHERE_OPACITY = 0.05;
const ROTATION_SPEED = 0.05;
const SPHERE_RADIUS = 0.42;
const SPHERE_OFFSET_X = -0.2;
const MOUSE_PARALLAX = 0.1;
const SCROLL_ROTATION_Y_SCALE = 0.0003;
const SMOOTH = 0.08;  

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface ParallaxRefs {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
}

function SphereArc({ color, parallaxRefs }: { color: string; parallaxRefs: ParallaxRefs }) {
  const ref = useRef<THREE.LineSegments>(null);
  const smoothMouse = useRef({ x: 0, y: 0 });
  const smoothScroll = useRef(0);
  const autoRotationY = useRef(0);
  const edgesGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(SPHERE_RADIUS, 32, 24);
    return new THREE.EdgesGeometry(geo);
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current) {
      return;
    }
    const { mouse, scroll } = parallaxRefs;
    smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.current.x, SMOOTH);
    smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.current.y, SMOOTH);
    smoothScroll.current = lerp(smoothScroll.current, scroll.current, SMOOTH);

    autoRotationY.current += ROTATION_SPEED * delta;
    const mx = smoothMouse.current.x;
    const my = smoothMouse.current.y;
    const sy = smoothScroll.current;

    ref.current.rotation.x = -my * MOUSE_PARALLAX;
    ref.current.rotation.y = autoRotationY.current + mx * MOUSE_PARALLAX + sy * SCROLL_ROTATION_Y_SCALE;
  });

  return (
    <lineSegments ref={ref} geometry={edgesGeometry} position={[SPHERE_OFFSET_X, 0, 0]}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={SPHERE_OPACITY}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function Scene({ color, parallaxRefs }: { color: string; parallaxRefs: ParallaxRefs }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[2, 1, 2]} intensity={0.3} />
      <SphereArc color={color} parallaxRefs={parallaxRefs} />
    </>
  );
}

export default function SidebarScene3D() {
  const accentColor = useColorModeValue("#319795", "#97DFFC"); // teal.500 / sidebar cyan
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current = { x, y };
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const parallaxRefs: ParallaxRefs = { mouse: mouseRef, scroll: scrollRef };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      width={{ lg: "40%", xl: "34%" }}
      height="100vh"
      display={{ base: "none", lg: "block" }}
      zIndex={0}
      pointerEvents="none"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 1.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene color={accentColor} parallaxRefs={parallaxRefs} />
      </Canvas>
    </Box>
  );
}
