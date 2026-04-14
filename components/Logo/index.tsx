import { memo } from "react";
import { useColorMode, Image } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { ThemeMode } from "config/theme";

const logoEntrance = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
} as const;

const Logo = () => {
  const { colorMode } = useColorMode();
  const MotionImage = motion(Image);
  const logoSrc =
    colorMode === ThemeMode.Dark ? "/logo_dark_trans.png" : "/logo_trans.png";

  return (
    <Link href="/" passHref legacyBehavior>
      <a aria-label="Back to portfolio home">
        <MotionImage
          className={styles.logo}
          boxSize={{ base: "30px", xl: "50px" }}
          objectFit="cover"
          src={logoSrc}
          alt="Daniel Lu Logo"
          variants={logoEntrance}
          initial="initial"
          animate="animate"
          zIndex={2}
          loading="eager"
          style={{ willChange: "opacity, transform" }}
        />
      </a>
    </Link>
  );
};

export default memo(Logo);
