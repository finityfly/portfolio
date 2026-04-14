import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetStaticProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OpenGraphHead from "@/components/SEO/OpenGraphHead";
import Menu from "@/components/Menu";
import FadeInLayout from "@/components/Layout/FadeWhenVisible";
import CorkboardMasonry from "@/components/Corkboard/CorkboardMasonry";
import { riseIn } from "@/config/animations";
import { RenderableCorkboardCardPost } from "@/lib/corkboard";
import {
  getRenderableCorkboardCardPosts,
} from "@/lib/corkboard.server";

const MotionLink = motion.a;
const MotionHeading = motion(Heading);

interface CorkboardPageProps {
  posts: RenderableCorkboardCardPost[];
}

const CorkboardPage: NextPage<CorkboardPageProps> = ({ posts }) => {
  const router = useRouter();
  const emptyStateImageSrc = "/mimikyu.png";

  useEffect(() => {
    router.prefetch("/");
    posts.slice(0, 8).forEach((post) => {
      router.prefetch(`/corkboard/${post.id}`);
    });
  }, [posts, router]);

  return (
    <>
      <Analytics />
      <OpenGraphHead
        title="Corkboard | Daniel Lu"
        path="/corkboard"
        type="website"
      />
      <Menu />
      <Box as="main" bg="panel" color="body" minH="100vh" paddingTop={24}>
        <Container
          maxW={{ base: "5xl", lg: "min(70vw, 56rem)" }}
          px={{ base: 6, md: 8 }}
          mx="auto"
        >
          <FadeInLayout>
            <Stack spacing={0} mb={{ base: 12, md: 16 }}>
              <Flex mt={{ base: 2, md: 3 }} mb={{ base: 5, md: 6 }} align="center">
                <NextLink href="/" prefetch passHref legacyBehavior>
                  <MotionLink
                    aria-label="Back to portfolio"
                    style={{ display: "inline-flex", alignItems: "center" }}
                    whileHover={{ x: -3 }}
                    whileTap={{ x: -1, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <Icon as={ArrowBackIcon} boxSize={5} />
                  </MotionLink>
                </NextLink>
              </Flex>

              <Heading
                as={MotionHeading}
                size="2xl"
                fontFamily="name"
                color="heading"
                textTransform="lowercase"
                initial="initial"
                animate="animate"
                variants={riseIn}
              >
                corkboard
              </Heading>
              <Text variant="description" maxW="44rem" pt={2}>
                My digital space for half-baked ideas, sick finds, and anything that doesn&apos;t fit neatly elsewhere.
              </Text>
            </Stack>
          </FadeInLayout>
        </Container>

        <Container maxW="1200px" px={{ base: 6, md: 8 }} pb={20} mx="auto">
          <FadeInLayout delay={0.1}>
            {posts.length === 0 ? (
              <Stack
                align="center"
                justify="center"
                textAlign="center"
                spacing={4}
                py={{ base: 16, md: 24 }}
              >
                <Image
                  src={emptyStateImageSrc}
                  alt="Mimikyu waiting"
                  boxSize={{ base: "140px", md: "180px" }}
                  objectFit="contain"
                  opacity={0.92}
                />
                <Text fontSize="sm" variant="description" letterSpacing="0.02em">
                  nothing pinned yet
                </Text>
              </Stack>
            ) : (
              <CorkboardMasonry posts={posts} />
            )}
          </FadeInLayout>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<CorkboardPageProps> = async () => {
  const posts = await getRenderableCorkboardCardPosts();

  return {
    props: {
      posts,
    },
  };
};

export default CorkboardPage;
