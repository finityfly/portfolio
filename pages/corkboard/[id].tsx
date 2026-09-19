import {
  Box,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextLink from "next/link";
import OpenGraphHead from "@/components/SEO/OpenGraphHead";
import Menu from "@/components/Menu";
import FadeInLayout from "@/components/Layout/FadeWhenVisible";
import MarkdownBlock from "@/components/Corkboard/MarkdownBlock";
import {
  CustomAudioPlayer,
  CustomVideoPlayer,
} from "@/components/Corkboard/MediaPlayers";
import { MediaPost } from "@/data/corkboard";
import {
  MarkdownPostWithContent,
  RenderableCorkboardPost,
} from "@/lib/corkboard";
import {
  getAllCorkboardPostIds,
  getRenderableCorkboardPostById,
} from "@/lib/corkboard.server";
import { formatDate, getYouTubeEmbedUrl } from "@/lib/utils";

interface CorkboardPostPageProps {
  post: RenderableCorkboardPost;
  readingTimeMinutes?: number;
}


const CorkboardPostPage: NextPage<CorkboardPostPageProps> = ({
  post,
  readingTimeMinutes,
}) => {
  const bodyText = useColorModeValue("gray.700", "whiteAlpha.900");

  const isMarkdown = (p: RenderableCorkboardPost): p is MarkdownPostWithContent =>
    p.kind === "markdown";
  const isMedia = (p: RenderableCorkboardPost): p is MediaPost =>
    p.kind === "audio" || p.kind === "image" || p.kind === "video";
  const youtubeEmbedSrc =
    post.kind === "video" ? getYouTubeEmbedUrl(post.src) : null;

  return (
    <>
      <Analytics />
      <OpenGraphHead
        title={`${post.title}`}
        path={`/corkboard/${post.id}`}
        type="article"
        publishedTime={post.date}
      />
      <Menu />
      <Box as="main" bg="panel" color="body" minH="100vh" paddingTop={{ base: 20, md: 24 }}>
        <Container maxW={{ base: "5xl", lg: "min(70vw, 56rem)" }} pb={16} px={{ base: 6, md: 8 }}>
          <FadeInLayout>
            <Box
              padding={{ base: 5, md: 7 }}
            >
              <Stack spacing={4}>
                <Box>
                  <motion.div
                    style={{ display: "inline-flex" }}
                    whileHover={{ x: -3 }}
                    whileTap={{ x: -1, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <NextLink href="/corkboard" prefetch aria-label="Back to corkboard">
                      <Icon as={ArrowBackIcon} boxSize={5} />
                    </NextLink>
                  </motion.div>
                </Box>
                <Stack spacing={1}>
                  <Heading size="xl" fontFamily="name" color="heading">
                    {post.title}
                  </Heading>
                  <Text
                    fontSize="xs"
                    variant="accentAlternative"
                    textTransform="uppercase"
                    letterSpacing="0.12em"
                  >
                    {formatDate(post.date)}
                    {typeof readingTimeMinutes === "number"
                      ? ` • ${readingTimeMinutes} min read`
                      : ""}
                  </Text>
                </Stack>

                {isMedia(post) && (
                  <Stack spacing={4}>
                    {post.kind === "audio" && (
                      <CustomAudioPlayer
                        src={post.src}
                        title={post.srcTitle || post.title}
                        thumbnail={post.thumbnail}
                      />
                    )}
                    {post.kind === "image" && (
                      <Box borderRadius="lg" overflow="hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.src}
                          alt={post.title}
                          style={{ width: "100%", display: "block" }}
                        />
                      </Box>
                    )}
                    {post.kind === "video" && (
                      <CustomVideoPlayer
                        src={post.src}
                        title={post.srcTitle || post.title}
                        poster={post.poster}
                        youtubeEmbedSrc={youtubeEmbedSrc}
                      />
                    )}
                    {post.description && (
                      <Text fontSize="md" color={bodyText} whiteSpace="pre-line">
                        {post.description}
                      </Text>
                    )}
                  </Stack>
                )}

                {isMarkdown(post) && (
                  <MarkdownBlock content={post.content} />
                )}
              </Stack>
            </Box>
          </FadeInLayout>
        </Container>
      </Box>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllCorkboardPostIds();

  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  CorkboardPostPageProps
> = async (context) => {
  const id = context.params?.id as string;
  const renderablePost = await getRenderableCorkboardPostById(id);

  if (!renderablePost) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: renderablePost.post,
      ...(typeof renderablePost.readingTimeMinutes === "number"
        ? { readingTimeMinutes: renderablePost.readingTimeMinutes }
        : {}),
    },
  };
};

export default CorkboardPostPage;

