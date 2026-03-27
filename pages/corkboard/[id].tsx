import {
  Box,
  Code,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Analytics } from "@vercel/analytics/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextLink from "next/link";
import { motion } from "framer-motion";
import fs from "fs/promises";
import path from "path";
import { RiMusic2Line, RiPlayCircleLine } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import OpenGraphHead from "components/Misc/OpenGraphHead";
import Menu from "components/Menu";
import FadeInLayout from "components/Layout/FadeWhenVisible";
import {
  corkboardPosts,
  CorkboardPost,
  MarkdownPost,
  MediaPost,
} from "config/corkboard";
import styles from "./PostMedia.module.css";

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) {
    return iso;
  }
  const monthIndex = Number(month) - 1;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName =
    monthIndex >= 0 && monthIndex < monthNames.length
      ? monthNames[monthIndex]
      : month;

  return `${monthName} ${Number(day)}, ${year}`;
};

type MarkdownPostWithContent = MarkdownPost & {
  content: string;
};

type RenderableCorkboardPost = MarkdownPostWithContent | MediaPost;

const MarkdownBlock = ({ content }: { content: string }) => {
  const markdownColor = useColorModeValue("gray.800", "white");
  const markdownSecondaryColor = useColorModeValue("gray.700", "whiteAlpha.900");

  return (
    <Box color={markdownColor} lineHeight={1.85} fontSize="sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Heading as="h1" size="md" mt={2} mb={3} fontFamily="name">
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading as="h2" size="sm" mt={2} mb={2} fontFamily="name">
              {children}
            </Heading>
          ),
          p: ({ children }) => (
            <Text mb={3} color={markdownSecondaryColor} lineHeight={1.85}>
              {children}
            </Text>
          ),
          ul: ({ children }) => (
            <Box as="ul" pl={5} mb={3}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box as="ol" pl={5} mb={3}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Box as="li" mb={1}>
              <Text as="span" color={markdownSecondaryColor} lineHeight={1.8}>
                {children}
              </Text>
            </Box>
          ),
          a: ({ href, children }) => (
            <Link
              href={href}
              isExternal
              color={markdownColor}
              textDecoration="underline"
              _hover={{ color: markdownSecondaryColor }}
            >
              {children}
            </Link>
          ),
          code: ({ inline, children }) => {
            if (inline) {
              return (
                <Code
                  px={1.5}
                  py={0.5}
                  fontSize="0.85em"
                  borderRadius="md"
                  color={markdownColor}
                >
                  {children}
                </Code>
              );
            }

            return (
              <Box as="pre" overflowX="auto" mb={3}>
                <Code
                  display="block"
                  whiteSpace="pre"
                  p={3}
                  borderRadius="md"
                  fontSize="0.85em"
                  color={markdownColor}
                >
                  {children}
                </Code>
              </Box>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

interface CorkboardPostPageProps {
  post: RenderableCorkboardPost;
}

const MotionLink = motion.a;

const CorkboardPostPage: NextPage<CorkboardPostPageProps> = ({ post }) => {
  const bg = useColorModeValue("gray.100", "black");
  const bodyText = useColorModeValue("gray.700", "whiteAlpha.900");
  const mediaShellBg = useColorModeValue(
    "rgba(255, 255, 255, 0.72)",
    "rgba(255, 255, 255, 0.06)"
  );
  const mediaShellBorder = useColorModeValue(
    "rgba(15, 23, 42, 0.12)",
    "rgba(255, 255, 255, 0.14)"
  );
  const mediaBadgeBg = useColorModeValue(
    "rgba(15, 23, 42, 0.08)",
    "rgba(255, 255, 255, 0.08)"
  );

  const isMarkdown = (p: RenderableCorkboardPost): p is MarkdownPostWithContent =>
    p.kind === "markdown";
  const isMedia = (p: RenderableCorkboardPost): p is MediaPost =>
    p.kind === "audio" || p.kind === "image" || p.kind === "video";

  return (
    <>
      <Analytics />
      <Menu />
      <Box as="main" bg={bg} minH="100vh" paddingTop={{ base: 20, md: 24 }}>
        <Container maxW={{ base: "95%", md: "4xl" }} pb={16}>
          <FadeInLayout>
            <Box
              padding={{ base: 5, md: 7 }}
            >
              <Stack spacing={4}>
                <Box>
                  <NextLink href="/corkboard" prefetch passHref legacyBehavior>
                    <MotionLink
                      aria-label="Back to corkboard"
                      style={{ display: "inline-flex", alignItems: "center" }}
                      whileHover={{ x: -3 }}
                      whileTap={{ x: -1, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      <Icon as={ArrowBackIcon} boxSize={5} />
                    </MotionLink>
                  </NextLink>
                </Box>
                <Stack spacing={1}>
                  <Heading size="lg" fontFamily="name">
                    {post.title}
                  </Heading>
                  <Text
                    fontSize="xs"
                    variant="accentAlternative"
                    textTransform="uppercase"
                    letterSpacing="0.12em"
                  >
                    {formatDate(post.date)}
                  </Text>
                </Stack>

                {isMedia(post) && (
                  <Stack spacing={4}>
                    {post.kind === "audio" && (
                      <Box
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={mediaShellBorder}
                        background={mediaShellBg}
                        backdropFilter="blur(10px)"
                        px={{ base: 3, md: 4 }}
                        py={{ base: 3, md: 4 }}
                      >
                        <Flex align="center" gap={3} mb={3}>
                          {post.thumbnail ? (
                            <Image
                              src={post.thumbnail}
                              alt={`${post.title} thumbnail`}
                              boxSize={{ base: "48px", md: "54px" }}
                              borderRadius="lg"
                              objectFit="cover"
                            />
                          ) : (
                            <Flex
                              boxSize={{ base: "48px", md: "54px" }}
                              borderRadius="lg"
                              align="center"
                              justify="center"
                              background={mediaBadgeBg}
                            >
                              <Icon as={RiMusic2Line} boxSize={6} />
                            </Flex>
                          )}
                          <Box>
                            <Text fontSize="sm" fontWeight="semibold">
                              {post.title}
                            </Text>
                            <Text fontSize="xs" color={bodyText}>
                              Audio note
                            </Text>
                          </Box>
                        </Flex>
                        <audio
                          className={styles.audioPlayer}
                          controls
                          src={post.src}
                        >
                          Your browser does not support the audio element.
                        </audio>
                      </Box>
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
                      <Box
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={mediaShellBorder}
                        background={mediaShellBg}
                        backdropFilter="blur(10px)"
                        p={{ base: 2, md: 3 }}
                      >
                        <Flex align="center" gap={2} px={1} mb={2}>
                          <Icon as={RiPlayCircleLine} boxSize={5} />
                          <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.12em" color={bodyText}>
                            Video
                          </Text>
                        </Flex>
                        <AspectRatio ratio={16 / 9}>
                          <video
                            className={styles.videoPlayer}
                            controls
                            src={post.src}
                            poster={post.thumbnail}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </AspectRatio>
                      </Box>
                    )}
                    {post.description && (
                      <Text fontSize="sm" color={bodyText}>
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
  const paths = corkboardPosts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  CorkboardPostPageProps
> = async (context) => {
  const id = context.params?.id as string;
  const post = corkboardPosts.find((p) => p.id === id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  if (post.kind === "markdown") {
    const absolutePath = path.join(process.cwd(), post.markdownPath);
    const content = await fs.readFile(absolutePath, "utf8");

    return {
      props: {
        post: {
          ...post,
          content,
        },
      },
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default CorkboardPostPage;

