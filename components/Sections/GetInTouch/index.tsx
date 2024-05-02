"use client";

import { memo } from "react";
import { Heading, Text, Stack, Link, Icon, Box } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { RiHeartPulseFill, RiCopyleftLine, RiGithubFill } from "react-icons/ri";
import { SocialMedias } from "config/sidebar";
import { simpleOpacity } from "config/animations";

const rimuruVariant: Variants = {
  shake: {
    rotate: [0, 15, 0, -15, 0],
    transition: {
      delay: 1.2,
      duration: 0.5,
      repeat: 2,
      ease: "easeInOut",
    },
  },
  jump: {
    y: [0, -35, 0],
    transition: {
      delay: 1.8,
      duration: 0.5,
      repeat: 3,
      ease: "easeInOut",
    },
  },
};

const GetInTouch = () => {
  const [ref, inView] = useInView();
  const MotionBox = motion(Box);
  const currentYear = new Date().getFullYear();
  return (
    <Stack
      width={{ base: "99%", lg: "60%", xl: "75%" }}
      height="100%"
      spacing={{ base: 6, xl: 8 }}
      as="footer"
      position="relative"
    >
      <Heading
        size="2xl"
        style={{
          fontVariantCaps: "small-caps",
        }}
        position="relative"
        zIndex={20}
      >
        Say hi!{" "}
        <Text as="span" fontSize="2xl" variant="emphasis">
          <motion.div
            style={{ display: "inline-block" }}
            variants={rimuruVariant}
            ref={ref}
            animate={inView ? ["shake", "jump"] : false}
          >
            (⁀ᗢ⁀)
          </motion.div>
        </Text>
      </Heading>
      <Text variant="description">
        Feel free to message me on any of my social media or shoot me an{" "}
        <Link
          href="mailto:personal@daniellu.ca"
          target="_blank"
          rel="noreferrer"
        >
          email
        </Link>
        !
      </Text>

      {/* make the items centered and spaced */}
      <MotionBox
        d="flex"
        justifyContent="center"
        alignItems="center"
        variants={simpleOpacity}
      >
        {SocialMedias.map((socMedia) => (
          <Link
            variant="description"
            key={socMedia.label}
            aria-label={socMedia.label}
            rel="noreferrer"
            width={8}
            mx={2}
            href={socMedia.href}
            target="_blank"
            _focus={{ boxShadow: "none" }}
          >
            <Icon w={6} h={6} as={socMedia.icon} color="currentColor" />
          </Link>
        ))}
      </MotionBox>

      <Box
        padding={0.5}
        textAlign="center"
        fontFamily="monospace"
        paddingTop={{ base: 10, lg: 20, xl: 20 }}
        paddingBottom={{ base: 5, lg: 18 }}
      >
        <Link
          variant="description"
          textDecoration="none"
          rel="noreferrer"
          href="https://github.com/FinityFly/portfolio"
          target="_blank"
          _focus={{ boxShadow: "none" }}
        >
          <Text as="span">
            <Icon as={RiGithubFill} h={6} w={6} /> <br />
            Designed and Made with <Icon as={RiHeartPulseFill} /> <br />
            Daniel Lu <Icon as={RiCopyleftLine} /> {currentYear}
          </Text>
        </Link>
      </Box>
    </Stack>
  );
};

export default memo(GetInTouch);
