import { memo, useCallback, useState, useEffect, MouseEvent } from "react";
import {
  Container,
  Button,
  Flex,
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
  useToken,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { motion, useCycle } from "framer-motion";
import NextLink from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import MobileMenu from "./toggle";
import { ThemeMode, mobileBreakpointsMap } from "config/theme";
import { easing, menuAnim } from "config/animations";

const Navigation = () => {
  const router = useRouter();
  const { toggleColorMode, colorMode } = useColorMode();
  const MotionContainer = motion(Container);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const isMobile = useBreakpointValue(mobileBreakpointsMap) ?? false;
  const menuButtonSize = useBreakpointValue({
    base: "xl",
    md: "sm",
  });

  const bg = useColorModeValue(
    "rgba(237, 242, 247, 0.95)",
    "rgba(18, 18, 18, 0.9)"
  );
  const emphasis = useColorModeValue("teal.500", "cyan.200");
  const [
    teal500,
    teal300,
    blue400,
    purple400,
    cyan500,
    cyan200,
    pink200,
    purple200,
  ] = useToken("colors", [
    "teal.500",
    "teal.300",
    "blue.400",
    "purple.400",
    "cyan.500",
    "cyan.200",
    "pink.200",
    "purple.200",
  ]);

  const borderColor = useColorModeValue("teal.500", "cyan.200");

  const IsDark = colorMode === ThemeMode.Dark;
  const btnClassName = `${styles.navBtn} ${!IsDark && styles.dark}`;
  const Icon = IsDark ? SunIcon : MoonIcon;
  const isCorkboardRoute = router.pathname.startsWith("/corkboard");
  const worksHref = isCorkboardRoute ? "/#works" : "#works";
  const contactHref = isCorkboardRoute ? "/#contact" : "#contact";
  const onMenuItemClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (isMobile) {
        toggleOpen();
      }
    },
    [isMobile, toggleOpen]
  );

  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const updateIsAtTop = () => {
      setIsAtTop(window.scrollY <= 50);
    };

    updateIsAtTop();
    window.addEventListener("scroll", updateIsAtTop, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateIsAtTop);
    };
  }, []);

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/corkboard");
  }, [router]);

  const onThemeToggleClick = useCallback(
    async (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      const isTeal = emphasis === "teal.500";
      const colors = isTeal
        ? [teal500, teal300, blue400, purple400]
        : [cyan500, cyan200, pink200, purple200];

      toggleColorMode();

      const { default: confetti } = await import("canvas-confetti");

      confetti({
        particleCount: 32,
        angle: 180,
        spread: 100,
        origin: { x, y },
        colors,
        disableForReducedMotion: true,
        zIndex: 9999,
        startVelocity: 18,
        gravity: 0.92,
        shapes: ["circle", "square"],
      });
    },
    [
      cyan200,
      cyan500,
      emphasis,
      pink200,
      purple200,
      purple400,
      teal300,
      teal500,
      blue400,
      toggleColorMode,
    ]
  );

  return (
    <>
      <Box
        display={{ base: "flex", xl: "none" }}
        alignItems="center"
        paddingTop={1}
        className={styles.menuBar}
        position="relative"
        zIndex={1401}
        top="3%"
      >
        <IconButton
          aria-label="Color Mode"
          variant="ghost"
          icon={<Icon />}
          boxShadow="none"
          onClick={onThemeToggleClick}
          padding={0}
        />
        <MobileMenu isDarkMode={IsDark} toggle={toggleOpen} isOpen={isOpen} />
      </Box>

      <MotionContainer
        width="100%"
        backgroundColor={bg}
        maxWidth={{ base: "100%", sm: "100%", lg: "60%", xl: "60%" }}
        className={styles.menu}
        right={{
          lg: !isMobile && !isAtTop ? "2%" : "3.5%",
        }}
        initial="hide"
        animate={(!isMobile || isOpen) && "show"}
        style={{
          width: !isMobile && !isAtTop ? "12%" : "100%",
          top: !isOpen && isMobile && "-100vh",
          opacity: !isOpen && isMobile && "0",
          left: isOpen && isMobile && 0,
        }}
        borderColor={isOpen && isMobile && borderColor}
        borderBottomWidth={isOpen && isMobile && "1px"}
        paddingBottom={isOpen && isMobile && "1px"}
        ease={easing}
        variants={menuAnim}
        marginTop={0}
        paddingTop={1}
        as="nav"
      >
        <Flex
          justifyContent={{ base: "center", lg: "flex-end" }}
          direction={{
            base: "column",
            lg: !isAtTop ? "column" : "row",
          }}
          paddingX={{ base: "", sm: "10", lg: "0" }}
          paddingY={{
            base: "10",
            lg: !isAtTop ? "10" : "3",
          }}
          height={{ base: "100vh", lg: "auto" }}
          paddingRight="0"
          paddingBottom={isMobile ? 10 : "0"}
          onClick={() => isMobile && toggleOpen()}
        >
          {/* <Box
            width={{ base: "100%", lg: "auto" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Button
              fontWeight="light"
              variant="ghost"
              fontSize={menuButtonSize}
              letterSpacing={2}
              className={btnClassName}
              padding={2}
              marginX={2}
              as="a"
              href={isMobile ? "#aboutMe" : "#"}
              rel="noreferrer"
              onClick={onMenuItemClick}
            >
              About
            </Button>
          </Box> */}
          <Box
            width={{ base: "100%", lg: "auto" }}
            textAlign={{ base: "center", lg: "left" }}
            marginY={{ base: 2, lg: 0 }}
          >
            <Button
              fontWeight="light"
              variant="ghost"
              fontSize={menuButtonSize}
              letterSpacing={2}
              className={btnClassName}
              padding={2}
              marginX={2}
              as={NextLink}
              href={worksHref}
              onClick={onMenuItemClick}
            >
              Works
            </Button>
          </Box>
          {/* <Box
            width={{ base: "100%", lg: "auto" }}
            textAlign={{ base: "center", lg: "left" }}
            marginY={{ base: 2, lg: 0 }}
          >
            <Button
              fontWeight="light"
              variant="ghost"
              fontSize={menuButtonSize}
              letterSpacing={2}
              className={btnClassName}
              padding={2}
              marginX={2}
              as="a"
              href="#jobs"
              rel="noreferrer"
              onClick={onMenuItemClick}
            >
              Experience
            </Button>
          </Box> */}
          <Box
            width={{ base: "100%", lg: "auto" }}
            textAlign={{ base: "center", lg: "left" }}
            marginY={{ base: 2, lg: 0 }}
          >
            <Button
              fontWeight="light"
              variant="ghost"
              fontSize={menuButtonSize}
              letterSpacing={2}
              className={btnClassName}
              padding={2}
              marginX={2}
              as={NextLink}
              href={contactHref}
              onClick={onMenuItemClick}
            >
              Contact
            </Button>
          </Box>
          <Box
            width={{ base: "100%", lg: "auto" }}
            textAlign={{ base: "center", lg: "left" }}
            marginY={{ base: 2, lg: 0 }}
          >
            <Button
              fontWeight="light"
              variant="ghost"
              fontSize={menuButtonSize}
              letterSpacing={2}
              className={btnClassName}
              padding={2}
              marginX={2}
              as={NextLink}
              href="/corkboard"
              onClick={onMenuItemClick}
            >
              Corkboard
            </Button>
          </Box>
          {!isMobile && (
            <Box>
              <IconButton
                marginX={1}
                aria-label="Color Mode"
                variant="ghost"
                icon={<Icon />}
                boxShadow="none"
                onClick={onThemeToggleClick}
              />
            </Box>
          )}
        </Flex>
      </MotionContainer>
    </>
  );
};

export default memo(Navigation);
