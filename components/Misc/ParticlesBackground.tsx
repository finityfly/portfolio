// import React, { useCallback } from "react";
import Particles from "@tsparticles/react";
// import { loadLinksPreset } from "@tsparticles/preset-links";
// import type { Engine } from "@tsparticles/engine";
import React, { useCallback } from "react";
import { loadLinksPreset } from "@tsparticles/preset-links";
import type { Engine } from "@tsparticles/engine";

const ParticlesBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadLinksPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit} // fix this later
      options={{
        preset: "links",
        background: {
          color: "#000000", // Set your desired background color
        },
        particles: {
          color: {
            value: "#ffffff", // Set your desired particle color
          },
          links: {
            color: "#ffffff", // Set your desired link color
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
          },
          number: {
            density: {
              enable: true,
              // area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
