import { useEffect } from "react";
import {
  Container,
  Box,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, Variants, useAnimation } from "framer-motion";
import Logo from "../Logo";
import styles from "./styles.module.css";
import Navigation from "./Navigation";
import { mobileBreakpointsMap } from "config/theme";
import useScrollDirection, { ScrollDirection } from "hooks/useScrollDirection";

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: [1, 0.85, 0],
    transition: {
      ease: "easeInOut",
      duration: 0.35,
    },
  },
  show: {
    opacity: [0, 0.85, 1],
    transition: {
      ease: "easeInOut",
      duration: 0.28,
    },
  },
};

const Menu = () => {
  const bg = useColorModeValue("gray.100", "black");
  const controls = useAnimation();
  const isMobile = useBreakpointValue(mobileBreakpointsMap);
  const scrollDirection = useScrollDirection(true, isMobile);
  useEffect(() => {
    if (scrollDirection === ScrollDirection.Down && isMobile) {
      controls.start("hidden");
    } else {
      controls.start("show");
    }
  }, [isMobile, controls, scrollDirection]);
  return (
    <motion.div
      initial={isMobile ? "hidden" : false}
      variants={mobileMenuVariants}
      animate={controls}
      className={isMobile ? styles.mobileMenuContainer : ""}
    >
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={{ base: 5 }}
        paddingY={{ base: 5 }}
        backgroundColor={isMobile ? bg : "transparent"}
        width={{ base: "100vw", xl: "100%" }}
        maxWidth={{ base: "100vw", xl: "100%" }}
        margin={0}
      >
        <Box position="relative" zIndex={1401}>
          <Logo />
        </Box>
        <Navigation />
      </Container>
    </motion.div>
  );
};

export default Menu;
