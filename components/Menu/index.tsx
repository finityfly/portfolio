import {
  Container,
  Flex,
  Link,
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowUpIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useRef, useState } from "react";
import NavZipLine, { ZipPath } from "./NavZipLine";
import styles from "./styles.module.css";
import { menuAnim, SPRING_PHYSICS } from "@/config/animations";

const dockContentVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      ...SPRING_PHYSICS,
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

const dockItemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...SPRING_PHYSICS,
    },
  },
};

const dockContainerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      ...SPRING_PHYSICS,
    },
  },
};

const Menu = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [hasPlayedTopBarEntrance, setHasPlayedTopBarEntrance] = useState(false);
  const pendingSectionRef = useRef<string | null>(null);
  const lastScrollYRef = useRef(0);
  const topBarLineRef = useRef<HTMLDivElement | null>(null);
  const dockAnchorRef = useRef<HTMLDivElement | null>(null);
  const [zipPath, setZipPath] = useState<ZipPath | null>(null);
  const spineColor = useColorModeValue("#9EBD99", "#677359");
  const iconColor = useColorModeValue("#526E52", "#A3B18A");
  const topBg = useColorModeValue("rgba(243, 244, 239, 0.94)", "rgba(15, 17, 12, 0.94)");
  const themeFade = "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, fill 0.3s ease, stroke 0.3s ease";

  useEffect(() => {
    if (typeof window === "undefined") {
      return () => undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 991px)");
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobileNav(event.matches);
    };

    handleChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    let ticking = false;

    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollYRef.current;

        setIsAtTop(currentScrollY <= 50);
        if (isMobileNav && Math.abs(delta) > 4) {
          setIsScrollingUp(delta < 0);
        }

        lastScrollYRef.current = currentScrollY;
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobileNav]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return () => undefined;
    }

    const recomputeZipPath = () => {
      const topRect = topBarLineRef.current?.getBoundingClientRect();
      const dockRect = dockAnchorRef.current?.getBoundingClientRect();

      if (!topRect || !dockRect) {
        return;
      }

      // Track for NavZipLine's sliding dash: start -> corner -> end.
      const start = { x: topRect.left, y: topRect.bottom };
      const corner = { x: dockRect.left, y: topRect.bottom };
      const end = { x: dockRect.left, y: dockRect.bottom };

      const horizontalRestLength = Math.max(0, topRect.right - topRect.left);
      const horizontalTotalLength = Math.max(0, corner.x - start.x);
      const verticalTotalLength = Math.max(0, end.y - corner.y);
      // Only the dock's own height, not the full drop from the top bar.
      const verticalRestLength = Math.max(0, dockRect.bottom - dockRect.top);
      const totalLength = horizontalTotalLength + verticalTotalLength;

      setZipPath({
        d: `M ${start.x} ${start.y} L ${corner.x} ${corner.y} L ${end.x} ${end.y}`,
        viewBox: `0 0 ${window.innerWidth} ${window.innerHeight}`,
        restingHorizontalFraction:
          totalLength > 0 ? horizontalRestLength / totalLength : 0,
        restingVerticalFraction:
          totalLength > 0 ? verticalRestLength / totalLength : 0,
      });
    };

    recomputeZipPath();
    // First rect read can land before layout settles; re-check next frame.
    const raf = window.requestAnimationFrame(recomputeZipPath);

    const observer = new ResizeObserver(recomputeZipPath);
    if (topBarLineRef.current) observer.observe(topBarLineRef.current);
    if (dockAnchorRef.current) observer.observe(dockAnchorRef.current);
    window.addEventListener("resize", recomputeZipPath);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", recomputeZipPath);
    };
  }, [isMobileNav]);

  useEffect(() => {
    const onRouteComplete = () => {
      if (!pendingSectionRef.current) {
        return;
      }

      const sectionId = pendingSectionRef.current;
      pendingSectionRef.current = null;

      window.requestAnimationFrame(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    };

    router.events.on("routeChangeComplete", onRouteComplete);
    return () => {
      router.events.off("routeChangeComplete", onRouteComplete);
    };
  }, [router]);

  type NavVisibility = {
    top?: {
      home?: "show" | "hide" | "only";
      hideOn?: string[];
    };
    dock?: {
      enabled: boolean;
    };
  };

  type NavLink = {
    label: string;
    href: string;
    sectionId?: string;
    visibility?: NavVisibility;
  };

  const links: NavLink[] = [
    {
      label: "me",
      href: "/",
      sectionId: "top",
      visibility: {
        top: { home: "hide" },
        dock: { enabled: false },
      },
    },
    { label: "works", href: "/", sectionId: "works" },
    { label: "contact", href: "/", sectionId: "contact" },
    {
      label: "corkboard",
      href: "/corkboard",
      visibility: {
        top: { hideOn: ["/corkboard"] },
      },
    },
  ];

  const isHomeRoute = router.pathname === "/";
  const matchesRoute = (routes?: string[]) =>
    routes?.some((route) => router.pathname.startsWith(route)) ?? false;
  const isTopVisible = (link: NavLink) => {
    const topVisibility = link.visibility?.top;
    if (!topVisibility) {
      return true;
    }

    if (matchesRoute(topVisibility.hideOn)) {
      return false;
    }

    if (topVisibility.home === "only") {
      return isHomeRoute;
    }

    if (topVisibility.home === "hide") {
      return !isHomeRoute;
    }

    return true;
  };
  const isDockVisible = (link: NavLink) => link.visibility?.dock?.enabled ?? true;

  const topLinks = links.filter(isTopVisible);
  const dockLinks = links.filter(isDockVisible);
  const isCorkboardRoute = router.pathname.startsWith("/corkboard");
  const isCorkboardHome = router.pathname === "/corkboard";
  const isCorkboardPost =
    router.pathname.startsWith("/corkboard/") && router.pathname !== "/corkboard";
  const contextualDockLinks = isCorkboardPost
    ? [{ label: "corkboard", href: "/corkboard" }]
    : dockLinks;

  const ModeIcon = colorMode === "dark" ? SunIcon : MoonIcon;

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onNavClick = (
    href: string,
    e: MouseEvent<HTMLElement>,
    sectionId?: string
  ) => {
    if (sectionId === "top") {
      e.preventDefault();
      if (router.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        void router.push("/");
      }
      return;
    }

    if (sectionId) {
      e.preventDefault();

      if (router.pathname === "/") {
        scrollToSection(sectionId);
      } else {
        pendingSectionRef.current = sectionId;
        void router.push("/");
      }
      return;
    }

    if (href.startsWith("/")) {
      e.preventDefault();
      void router.push(href);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shouldShowTopBar = isAtTop || (isMobileNav && isScrollingUp);
  const shouldShowDock = !isAtTop && !isCorkboardHome;
  const dockTabIndex = shouldShowDock ? undefined : -1;
  const zipRestH = zipPath?.restingHorizontalFraction ?? 0;
  const zipRestV = zipPath?.restingVerticalFraction ?? 0;
  // Mobile never shows the spine — the dock itself is CSS-hidden there.
  const zipShowsSpine = shouldShowDock && !isMobileNav;
  const zipPathLength = zipShowsSpine
    ? zipRestV
    : (shouldShowTopBar ? zipRestH : 0);
  const zipPathOffset = zipShowsSpine ? 1 - zipRestV : 0;

  return (
    <motion.div
      className={styles.navShell}
      initial="show"
      animate="show"
      variants={menuAnim}
    >
      <motion.div
        className={styles.topBar}
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: shouldShowTopBar ? 1 : 0,
          y: shouldShowTopBar ? 0 : -10,
        }}
        transition={{
          ...SPRING_PHYSICS,
          delay: isAtTop && !hasPlayedTopBarEntrance ? 0.4 : 0,
        }}
        onAnimationComplete={() => {
          if (isAtTop && !hasPlayedTopBarEntrance) {
            setHasPlayedTopBarEntrance(true);
          }
        }}
        style={{ pointerEvents: shouldShowTopBar ? "auto" : "none" }}
      >
        <Container
          ref={topBarLineRef}
          maxW="5xl"
          px={{ base: 6, md: 8 }}
          py={{ base: 5, md: 6 }}
          backgroundColor={topBg}
          transition={themeFade}
        >
          <Flex
            justify={{ base: "flex-end", lg: "space-between" }}
            align="center"
            w="100%"
            pointerEvents="auto"
          >
            <Link
              as={NextLink}
              href="/"
              fontFamily="name"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="semibold"
              letterSpacing="0.06em"
              color="heading"
              display={{ base: "none", lg: "inline-flex" }}
              transition={themeFade}
              _hover={{ textDecoration: "none", color: "sage.500" }}
            >
              陆
            </Link>

            <Flex align="center" gap={{ base: 5, md: 7 }}>
              {topLinks.map((link) => (
                <Link
                  key={`top-${link.label}`}
                  className="linkUnderline"
                  as={NextLink}
                  href={link.href}
                  onClick={(e) => onNavClick(link.href, e, link.sectionId)}
                  userSelect="none"
                  variant="description"
                  fontSize="sm"
                  fontWeight="medium"
                  letterSpacing="0.04em"
                  textTransform="lowercase"
                  _hover={{ color: "sage.500", textDecoration: "none" }}
                  _focus={{ boxShadow: "none", outline: "none" }}
                  _focusVisible={{ boxShadow: "none", outline: "none" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                className="linkUnderline"
                as={NextLink}
                href="/Daniel_Lu_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                userSelect="none"
                variant="description"
                fontSize="sm"
                fontWeight="medium"
                letterSpacing="0.04em"
                textTransform="lowercase"
                _hover={{ color: "sage.500", textDecoration: "none" }}
                _focus={{ boxShadow: "none", outline: "none" }}
                _focusVisible={{ boxShadow: "none", outline: "none" }}
              >
                cv
              </Link>
              <IconButton
                aria-label="toggle color mode"
                icon={<ModeIcon />}
                variant="ghost"
                size="sm"
                color={iconColor}
                onClick={toggleColorMode}
                transition={themeFade}
                _hover={{ background: "transparent", color: "sage.500" }}
                _focus={{ boxShadow: "none", outline: "none" }}
                _focusVisible={{ boxShadow: "none", outline: "none" }}
                data-nav-sfx="theme"
              />
            </Flex>
          </Flex>
        </Container>
      </motion.div>

      <motion.aside
        className={styles.dockContainer}
        variants={dockContainerVariants}
        initial={false}
        animate={shouldShowDock ? "show" : "hidden"}
        transition={{ ...SPRING_PHYSICS }}
        aria-label="dock navigation"
        aria-hidden={!shouldShowDock}
      >
        <Box
          className={styles.dockInner}
          pointerEvents={shouldShowDock ? "auto" : "none"}
        >
          <Box ref={dockAnchorRef} className={styles.dockSpineAnchor} aria-hidden />
          <Flex
            as={motion.div}
            direction="column"
            align="flex-start"
            gap={4}
            pl={8}
            variants={dockContentVariants}
            initial={false}
            animate={shouldShowDock ? "show" : "hidden"}
          >
            <motion.div variants={dockItemVariants}>
              <IconButton
                aria-label="scroll to top"
                icon={<ArrowUpIcon />}
                variant="ghost"
                size="sm"
                color={iconColor}
                onClick={scrollToTop}
                ml="-8px"
                w="2.25rem"
                h="2.25rem"
                transition={themeFade}
                tabIndex={dockTabIndex}
                _hover={{ background: "transparent", color: "sage.500", transform: "translateY(-1px)" }}
                _focus={{ boxShadow: "none", outline: "none" }}
                _focusVisible={{ boxShadow: "none", outline: "none" }}
              />
            </motion.div>
            {contextualDockLinks.map((link) => (
              <motion.div key={`dock-wrap-${link.label}`} variants={dockItemVariants}>
                <Link
                  key={`dock-${link.label}`}
                  className="linkUnderline"
                  as={NextLink}
                  href={link.href}
                  onClick={(e) => onNavClick(link.href, e, link.sectionId)}
                  userSelect="none"
                  variant="description"
                  fontSize="sm"
                  fontWeight="medium"
                  letterSpacing="0.04em"
                  textTransform="lowercase"
                  tabIndex={dockTabIndex}
                  _hover={{ color: "sage.500", textDecoration: "none", transform: "translateX(2px)" }}
                  _focus={{ boxShadow: "none", outline: "none" }}
                  _focusVisible={{ boxShadow: "none", outline: "none" }}
                  transition="transform 0.3s ease, color 0.3s ease"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {!isCorkboardRoute && (
              <motion.div variants={dockItemVariants}>
                <Link
                  className="linkUnderline"
                  as={NextLink}
                  href="/Daniel_Lu_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  userSelect="none"
                  variant="description"
                  fontSize="sm"
                  fontWeight="medium"
                  letterSpacing="0.04em"
                  textTransform="lowercase"
                  tabIndex={dockTabIndex}
                  _hover={{ color: "sage.500", textDecoration: "none", transform: "translateX(2px)" }}
                  _focus={{ boxShadow: "none", outline: "none" }}
                  _focusVisible={{ boxShadow: "none", outline: "none" }}
                  transition="transform 0.3s ease, color 0.3s ease"
                >
                  cv
                </Link>
              </motion.div>
            )}
            <motion.div variants={dockItemVariants}>
              <IconButton
                aria-label="toggle color mode"
                icon={<ModeIcon />}
                variant="ghost"
                size="sm"
                color={iconColor}
                onClick={toggleColorMode}
                ml="-8px"
                w="2.25rem"
                h="2.25rem"
                transition={themeFade}
                tabIndex={dockTabIndex}
                _hover={{ background: "transparent", color: "sage.500" }}
                _focus={{ boxShadow: "none", outline: "none" }}
                _focusVisible={{ boxShadow: "none", outline: "none" }}
                data-nav-sfx="theme"
              />
            </motion.div>
          </Flex>
        </Box>
      </motion.aside>

      <NavZipLine
        path={zipPath}
        pathLength={zipPathLength}
        pathOffset={zipPathOffset}
        color={spineColor}
        entranceDelay={isAtTop && !hasPlayedTopBarEntrance ? 0.4 : 0}
      />
    </motion.div>
  );
};

export default Menu;
