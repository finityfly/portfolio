import { motion, useReducedMotion } from "framer-motion";
import styles from "./styles.module.css";
import { SPRING_PHYSICS } from "@/config/animations";

export interface ZipPath {
  d: string;
  viewBox: string;
  // Length of the resting horizontal (top bar) and vertical (dock spine)
  // segments, each as a fraction of the whole track's length.
  restingHorizontalFraction: number;
  restingHorizontalOffset: number;
  restingVerticalFraction: number;
}

interface NavZipLineProps {
  path: ZipPath | null;
  pathLength: number;
  pathOffset: number;
  color: string;
  entranceDelay?: number;
}

const NavZipLine = ({
  path,
  pathLength,
  pathOffset,
  color,
  entranceDelay = 0,
}: NavZipLineProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (!path) {
    return null;
  }

  return (
    <svg className={styles.zipLineLayer} viewBox={path.viewBox} aria-hidden>
      <motion.path
        d={path.d}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        shapeRendering="crispEdges"
        initial={{ pathLength: 0, pathOffset }}
        animate={{ pathLength, pathOffset }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { ...SPRING_PHYSICS, delay: entranceDelay }
        }
      />
    </svg>
  );
};

export default NavZipLine;
