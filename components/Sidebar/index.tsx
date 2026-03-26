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
  const display = useBreakpointValue({ base: "none", xl: "block" });
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
      position={{ lg: "relative", xl: "fixed" }}
      width={{ base: "100%", lg: "100%", xl: "auto" }}
      maxWidth={{ base: "100%", lg: "100%", xl: "24%" }}
      top={{ lg: 0 }}
      zIndex={1}
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
        maxW="100%"
        height={{ xl: "100vh" }}
        display={{ xl: "flex" }}
        alignItems={{ xl: "center" }}
      >
        <MotionStack variants={stagger} spacing={6} w="100%">
          <MotionText
            variants={fadeInUp}
            delay={1}
            variant="accent"
            fontWeight="light"
          >
            Hi, I&apos;m
          </MotionText>
          <MotionHeading
            as="h1"
            size="2xl"
            // textTransform="uppercase"
            variants={letterSpace}
            fontFamily="name"
          >
            Daniel Lu
          </MotionHeading>

          <MotionText
            variants={fadeInUp}
            fontSize="md"
            fontWeight="light"
          >
            I&apos;m a CS student studying at{" "}
            <Link
              href="https://carleton.ca"
              target="_blank"
              rel="noreferrer"
              variant="emphasis"
            >
              Carleton University
            </Link>
            .
          </MotionText>
          <MotionText
            variants={fadeInUp}
            fontSize="md"
            fontWeight="light"
          >
            I spend my free time contributing to{" "}
            <Link
              href="https://huggingface.co"
              target="_blank"
              rel="noreferrer"
              variant="emphasis"
            >
              Hugging Face
            </Link>{" "}
            while deepening my understanding of NLP, transformer optimization, and
            low-latency inference.
          </MotionText>

          <MotionBox
            d="flex"
            flexDirection="row"
            variants={fadeInUp}
            gap={{ base: 4, lg: 8, xl: 12 }}
            mb={4}
          >
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
