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
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { menuAnim, SPRING_PHYSICS } from "config/animations";

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

const dockSpineVariants = {
  hidden: {
    scaleY: 0,
    opacity: 0.7,
  },
  show: {
    scaleY: 1,
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
  const [hasPlayedTopBarEntrance, setHasPlayedTopBarEntrance] = useState(false);
  const pendingSectionRef = useRef<string | null>(null);
  const spineColor = useColorModeValue("#C7D2C0", "#2B3528");
  const iconColor = useColorModeValue("#526E52", "#A3B18A");
  const topBg = useColorModeValue("rgba(243, 244, 239, 0.94)", "rgba(15, 17, 12, 0.94)");
  const topBorder = useColorModeValue("#D4DCCE", "#1D241B");
  const themeFade = "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, fill 0.3s ease, stroke 0.3s ease";

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        setIsAtTop(window.scrollY <= 50);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          opacity: isAtTop ? 1 : 0,
          y: isAtTop ? 0 : -10,
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
        style={{ pointerEvents: isAtTop ? "auto" : "none" }}
      >
        <Container
          maxW="5xl"
          px={{ base: 6, md: 8 }}
          py={{ base: 5, md: 6 }}
          backgroundColor={topBg}
          borderBottomWidth="1px"
          borderColor={topBorder}
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
              data-nav-sfx
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
                  data-nav-sfx
                >
                  {link.label}
                </Link>
              ))}
              <Link
                className="linkUnderline"
                as={NextLink}
                href="/DanielLu_Resume.pdf"
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
                data-nav-sfx
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
                data-nav-sfx
              />
            </Flex>
          </Flex>
        </Container>
      </motion.div>

      <AnimatePresence>
        {!isAtTop && !isCorkboardHome && (
          <motion.aside
            className={styles.dockContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ...SPRING_PHYSICS }}
            aria-label="dock navigation"
          >
            <Box className={styles.dockInner} pointerEvents="auto">
              <motion.div
                className={styles.dockSpine}
                style={{ backgroundColor: spineColor, transformOrigin: "top" }}
                transition={{ ...SPRING_PHYSICS }}
                variants={dockSpineVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
              />
              <Flex
                as={motion.div}
                direction="column"
                align="flex-start"
                gap={3}
                pl={4}
                variants={dockContentVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
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
                    transition={themeFade}
                    _hover={{ background: "transparent", color: "sage.500", transform: "translateY(-1px)" }}
                    _focus={{ boxShadow: "none", outline: "none" }}
                    _focusVisible={{ boxShadow: "none", outline: "none" }}
                    data-nav-sfx
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
                      _hover={{ color: "sage.500", textDecoration: "none", transform: "translateX(2px)" }}
                      _focus={{ boxShadow: "none", outline: "none" }}
                      _focusVisible={{ boxShadow: "none", outline: "none" }}
                      transition="transform 0.3s ease, color 0.3s ease"
                      data-nav-sfx
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
                      href="/DanielLu_Resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      userSelect="none"
                      variant="description"
                      fontSize="sm"
                      fontWeight="medium"
                      letterSpacing="0.04em"
                      textTransform="lowercase"
                      _hover={{ color: "sage.500", textDecoration: "none", transform: "translateX(2px)" }}
                      _focus={{ boxShadow: "none", outline: "none" }}
                      _focusVisible={{ boxShadow: "none", outline: "none" }}
                      transition="transform 0.3s ease, color 0.3s ease"
                      data-nav-sfx
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
                    transition={themeFade}
                    _hover={{ background: "transparent", color: "sage.500" }}
                    _focus={{ boxShadow: "none", outline: "none" }}
                    _focusVisible={{ boxShadow: "none", outline: "none" }}
                    data-nav-sfx
                  />
                </motion.div>
              </Flex>
            </Box>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Menu;
