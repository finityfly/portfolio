/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Grid,
  GridItem,
  Stack,
  Box,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { loadLinksPreset } from "@tsparticles/preset-links";
import { Engine, tsParticles } from "@tsparticles/engine";
import { Analytics } from "@vercel/analytics/react";
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

const Portfolio = ({ articles }: { articles: Article[] }): JSX.Element => {
  const sideBarPadding = useBreakpointValue<string | number>({
    base: "5",
    md: "8",
    lg: "14",
  });
  const mainContent = useBreakpointValue<string | number>({
    base: "5",
    md: "14",
    lg: "14",
    xl: 0,
  });
  const paddTop = useBreakpointValue<string | number>({
    base: "20",
    sm: 20,
    md: 20,
  });

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
          sm: "repeat(1, 0)",
          lg: "repeat(2, 1fr)",
        }}
        gap={4}
      >
        <GridItem
          padding={sideBarPadding}
          marginTop={paddTop}
          rowSpan={2}
          colSpan={{ base: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
          display="flex"
          alignContent="center"
          as="div"
          flexDirection={"row"}
          position="relative"
          minH={{ lg: "100vh" }}
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
          <Stack w="100" spacing={24}>
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
              <Box mt={4}>
                <motion.div
                  initial="initial"
                  animate={isVisible ? "animate" : "initial"}
                  variants={scrollIndicatorVariants}
                >
                  <Flex
                    direction="column"
                    align="flex-start"
                    gap={3}
                    cursor="pointer"
                    onClick={handleScrollToWorks}
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
                paddingTop={{ base: 0, lg: 20, xl: 0 }}
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
