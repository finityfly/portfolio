/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Grid,
  GridItem,
  Stack,
  Box,
  Text,
  Flex,
  Icon,
  useBreakpointValue,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { RiArrowDownSLine } from "react-icons/ri";
import { Analytics } from "@vercel/analytics/react";
import confetti from "canvas-confetti";
import dynamic from "next/dynamic";
import Script from "next/script";
import OpenGraphHead from "components/Misc/OpenGraphHead";
import FadeInLayout from "components/Layout/FadeWhenVisible";
import Menu from "components/Menu";
import Sidebar from "components/Sidebar";
import Avatar from "components/Avatar";
import About from "components/Sections/About";
import Experience from "components/Sections/Experience";
import FeaturedWorks from "components/Sections/FeaturedWorks";
import GetInTouch from "components/Sections/GetInTouch";
import ScrollMore from "components/Misc/ScrollMore";
import { Works } from "config/works";
import { Article } from "types/article";
import ParticlesBackground from "components/Misc/ParticlesBackground";

const SidebarScene3D = dynamic(
  () => import("components/Misc/SidebarScene3D"),
  { ssr: false }
);

// These are on bottom sections so no need to render it instantly
// const DevToArticles = dynamic(
//   () => import("components/Sections/DevToArticles")
// );
// const GetInTouch = dynamic(() => import("components/Sections/GetInTouch"));

const scrollIndicatorVariants: Variants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.8,
      ease: "easeOut",
    },
  },
};

const arrowBounceVariants: Variants = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.3,
    },
  },
};

const typewriterVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 1.2,
    },
  },
};

const Portfolio = ({ articles }: { articles: Article[] }): JSX.Element => {
  const sideBarPadding = useBreakpointValue<string | number>({
    base: "5",
    md: "8",
    lg: "8",
    xl: "14",
  });
  const mainContent = useBreakpointValue<string | number>({
    base: "5",
    md: "8",
    lg: "8",
    xl: 0,
  });
  const paddTop = useBreakpointValue<string | number>({
    base: "20",
    sm: 20,
    md: 20,
  });

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
  const projectCount = Works.work.length;

  const generateConfetti = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    const isTeal = emphasis === "teal.500";
    const colors = isTeal
      ? [teal500, teal300, blue400, purple400]
      : [cyan500, cyan200, pink200, purple200];

    confetti({
      particleCount: 30,
      spread: 70,
      origin: { x, y },
      colors: colors,
      disableForReducedMotion: true,
      zIndex: 9999,
      startVelocity: 16,
      gravity: 0.9,
      shapes: ["circle", "square"],
    });
  };

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
        `}
      </Script>
      <Analytics />
      <OpenGraphHead />
      <Menu />
      <ParticlesBackground />
      <Grid
        id="mainGrid"
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        templateRows={{
          base: "auto",
          lg: "repeat(2, 1fr)",
        }}
        gap={4}
      >
        <GridItem
          padding={sideBarPadding}
          marginTop={paddTop}
          marginBottom={0}
          rowSpan={2}
          colSpan={{ base: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
          display="flex"
          alignContent="center"
          as="div"
          flexDirection={"row"}
          position="relative"
          minH={{ base: "auto", xl: "100vh" }}
        >
          <SidebarScene3D />
          <Sidebar />
        </GridItem>
        <GridItem
          as="main"
          padding={mainContent}
          rowSpan={2}
          colSpan={{ base: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
          overflow="hidden"
        >
          <Stack w="100%" spacing={12} mt={{ base: 0, md: 0, lg: 0, xl: 16 }}>
            {/* <FadeInLayout>
              <Box
                id="aboutMe"
                className="contentRow"
                minH={{ base: "100dvh", md: "100dvh", lg: "100dvh" }}
                display="flex"
                alignItems="center"
                paddingTop={{ base: 0, lg: 20, xl: 0 }}
                paddingBottom={{ base: 12, md: 12, lg: 0 }}
                flexDirection={{
                  base: "column-reverse",
                  md: "column-reverse",
                  lg: "row",
                }}
                gap={{ base: 0, md: 6, lg: 0 }}
              >
                <About />
                <Avatar />
              </Box>
            </FadeInLayout> */}
            {/* <FadeInLayout>
              <Box
                id="jobs"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 20 }}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={"row"}
              >
                <Experience />
              </Box>
            </FadeInLayout> */}
            <FadeInLayout>
            <Box mt={4} mb={{ base: 8, md: 8, lg: 8, xl: 12 }}>
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={scrollIndicatorVariants}
                >
                  <Flex
                    direction="column"
                    align="flex-start"
                    w="fit-content"
                    gap={3}
                    cursor="pointer"
                    onClick={generateConfetti}
                    _hover={{
                      "& > *": {
                        opacity: 0.8,
                      },
                    }}
                    transition="all 0.2s"
                  >
                    <motion.div variants={typewriterVariants}>
                      <Text
                        variant="description"
                        fontSize="sm"
                        fontWeight="medium"
                        color={emphasis}
                        letterSpacing="0.5px"
                      >
                        {projectCount} {projectCount === 1 ? "project" : "projects"}{" "}
                        waiting below...
                      </Text>
                    </motion.div>
                    <motion.div variants={arrowBounceVariants} animate="animate">
                      <Flex align="center" gap={2} color={emphasis}>
                        <Icon as={RiArrowDownSLine} w={6} h={6} />
                        <Icon as={RiArrowDownSLine} w={5} h={5} opacity={0.7} />
                        <Icon as={RiArrowDownSLine} w={4} h={4} opacity={0.5} />
                      </Flex>
                    </motion.div>
                  </Flex>
                </motion.div>
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="works"
                className="contentRow"
                paddingTop={0}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={"row"}
              >
                <FeaturedWorks />
              </Box>
            </FadeInLayout>
            {/* <FadeInLayout>
              <Box
                id="blog"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 20 }}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={"row"}
              >
                <DevToArticles articles={articles} />
              </Box>
            </FadeInLayout> */}
            <FadeInLayout>
              <Box
                id="contact"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 20 }}
                paddingX={0}
                flexDirection={"row"}
              >
                <GetInTouch />
              </Box>
            </FadeInLayout>
          </Stack>
        </GridItem>
      </Grid>
      <ScrollMore />
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://dev.to/api/articles?username=klawingco");
  const articles = await res.json();
  return {
    props: {
      articles,
    },
  };
}

export default Portfolio;
