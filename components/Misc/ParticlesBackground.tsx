import { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  Container,
  ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";
import { useColorModeValue } from "@chakra-ui/react";

const ParticlesBackground: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const bg = useColorModeValue(
    "rgba(237, 242, 247, 0.95)",
    "rgba(18, 18, 18, 0.9)"
  );

  const nodes = useColorModeValue("#000000", "#ffffff");

  const options: ISourceOptions = useMemo(
    () => ({
      preset: "links",
      background: {
        color: bg,
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      particles: {
        color: {
          value: nodes,
        },
        links: {
          color: nodes,
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
        },
        number: {
          density: {
            enable: true,
            area: 400,
          },
          value: 30,
        },
        opacity: {
          value: 0.1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      interactivity: {
        detectsOn: "window",
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
    }),
    [bg]
  );

  return init ? (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  ) : null;
};

export default ParticlesBackground;
