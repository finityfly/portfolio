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
}

// A fixed-length dash sliding along a fixed L-shaped track (pathLength +
// pathOffset together, mapped by Framer to stroke-dasharray/dashoffset —
// paint-only, no opacity fade).
const NavZipLine = ({ path, pathLength, pathOffset, color }: NavZipLineProps) => {
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
        initial={false}
        animate={{ pathLength, pathOffset }}
        transition={prefersReducedMotion ? { duration: 0 } : SPRING_PHYSICS}
      />
    </svg>
  );
};

export default NavZipLine;
