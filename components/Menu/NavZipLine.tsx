import { motion, useReducedMotion } from "framer-motion";
import styles from "./styles.module.css";
import { SPRING_PHYSICS } from "@/config/animations";

export interface ZipPath {
  d: string;
  viewBox: string;
  // Length of the resting horizontal (top bar) and vertical (dock spine)
  // segments, each as a fraction of the whole track's length.
  restingHorizontalFraction: number;
  restingVerticalFraction: number;
}

interface NavZipLineProps {
  path: ZipPath | null;
  pathLength: number;
  pathOffset: number;
  color: string;
  entranceDelay?: number;
}

// A fixed-length dash sliding along a fixed L-shaped track (pathLength +
// pathOffset together, mapped by Framer to stroke-dasharray/dashoffset —
// paint-only, no opacity fade). On mount it draws in from zero length at
// the same offset, then settles — a slide-in using the same technique as
// the scroll-triggered transitions, instead of a separate opacity fade.
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
        strokeWidth={1}
        strokeLinecap="round"
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
