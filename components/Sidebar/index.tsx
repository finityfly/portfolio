import {
  Stack,
  Heading,
  Text,
  Button,
  useColorMode,
  Container,
  Link,
  Box,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import {
  fadeInUp,
  letterSpace,
  simpleOpacity,
  stagger,
  scaleUp,
} from "config/animations";
import { SocialMedias } from "config/sidebar";
import { ThemeMode, mobileBreakpointsMap } from "config/theme";

const Sidebar = () => {
  const { colorMode } = useColorMode();
  const display = useBreakpointValue({ base: "none", lg: "block" });
  const surNameSize = useBreakpointValue({ base: "3xl", md: "4xl" });
  const isMobile = useBreakpointValue(mobileBreakpointsMap);
  const MotionHeading = motion(Heading);
  const MotionText = motion(Text);
  const MotionStack = motion(Stack);
  const MotionButton = motion(Button);
  const MotionBox = motion(Box);

  const hoverBoxShadowColor =
    colorMode === ThemeMode.Dark
      ? "rgba(255, 255, 255, 0.4)"
      : "rgba(0, 0, 0, 0.3)";

  return (
    <MotionBox
      initial="initial"
      animate="animate"
      position={{ xl: "fixed" }}
      maxWidth={{ xl: "34%" }}
      top={{ lg: 0 }}
    >
      <motion.div
        id="sidebarCircle"
        className={`${styles.sidebar} ${
          colorMode === "light" ? styles.dark : ""
        }`}
        variants={scaleUp}
        style={{ display: display }}
        animate={colorMode === "dark" ? "animate" : "lightMode"}
      ></motion.div>
      <Container
        padding={0}
        margin={0}
        height={{ xl: "100vh" }}
        display={{ xl: "flex" }}
        alignItems={{ xl: "center" }}
      >
        <MotionStack variants={stagger} spacing={6} w="100">
          <MotionText
            variants={fadeInUp}
            delay={1}
            variant="accent"
            fontWeight="light"
          >
            Hi, I'm
          </MotionText>
          <MotionHeading
            as="h1"
            size="2xl"
            paddingRight={{ lg: "20" }}
            textTransform="uppercase"
            variants={letterSpace}
          >
            Daniel
          </MotionHeading>
          <MotionHeading
            as="h2"
            size={surNameSize}
            variant="emphasis"
            className={styles.marginTopForce}
            textTransform="uppercase"
            variants={letterSpace}
          >
            Lu.
          </MotionHeading>

          <MotionHeading
            as="h3"
            size="md"
            variant="emphasis"
            className={styles.marginTopSmall}
            variants={fadeInUp}
          >
            prev @ Trend Micro & Blackberry QNX
          </MotionHeading>

          <MotionBox d="flex" flexWrap="wrap" variants={fadeInUp} gap={12} mb={4}>
            {SocialMedias.map((socMedia) => (
              <Link
                variant="description"
                key={socMedia.label}
                aria-label={socMedia.label}
                rel="noreferrer"
                href={socMedia.href}
                target="_blank"
                _focus={{ boxShadow: "none" }}
              >
                <Stack direction="row" alignItems="center">
                  <Icon w={6} h={6} as={socMedia.icon} color="currentColor" />
                  <Text>{socMedia.label}</Text>
                </Stack>
              </Link>
            ))}
          </MotionBox>
          <MotionButton
            size="lg"
            variant="outline"
            borderWidth="1px"
            borderRadius="0"
            fontWeight="normal"
            fontSize="sm"
            width="120px"
            variants={simpleOpacity}
            as={"a"}
            href="/DanielLu_Resume.pdf"
            target="_blank"
            whileHover={{
              boxShadow: `0px 0px 8px 0px ${hoverBoxShadowColor}`,
              scale: 1.05,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            View Resume
          </MotionButton>
        </MotionStack>
      </Container>
    </MotionBox>
  );
};

export default Sidebar;
