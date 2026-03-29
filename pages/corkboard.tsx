/* eslint-disable react/prop-types */
import fs from "fs/promises";
import path from "path";
import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetStaticProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  RiArticleLine,
  RiImage2Line,
  RiMusic2Line,
  RiPlayCircleLine,
} from "react-icons/ri";
import OpenGraphHead from "components/Misc/OpenGraphHead";
import Menu from "components/Menu";
import FadeInLayout from "components/Layout/FadeWhenVisible";
import {
  CustomAudioPlayer,
  CustomVideoPlayer,
} from "components/Corkboard/MediaPlayers";
import { SPRING_PHYSICS, riseIn } from "config/animations";
import {
  corkboardPosts,
  CorkboardPost,
  MarkdownPost,
  MediaPost,
} from "config/corkboard";

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) {
    return iso;
  }

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
  const monthIndex = Number(month) - 1;
  const monthName =
    monthIndex >= 0 && monthIndex < monthNames.length
      ? monthNames[monthIndex]
      : month;

  return `${monthName} ${Number(day)}, ${year}`;
};

const byNewestFirst = (a: CorkboardPost, b: CorkboardPost) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const MotionDiv = motion.div;
const MotionLink = motion.a;
const MotionHeading = motion(Heading);

const AVERAGE_READING_SPEED_WPM = 180;

type MarkdownPostWithReadingTime = MarkdownPost & {
  readingTimeMinutes?: number;
};

type RenderableCorkboardPost = MarkdownPostWithReadingTime | MediaPost;

type MediaFrameVariant = "wide" | "tall";

interface MasonryColumnEntry {
  post: RenderableCorkboardPost;
  index: number;
}

interface CorkboardPageProps {
  posts: RenderableCorkboardPost[];
}

const stripMarkdownToPlainText = (markdown: string): string =>
  markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/^\s{0,3}(#{1,6}\s)/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const truncateAtWord = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  const candidate =
    lastSpace > maxLength * 0.6 ? clipped.slice(0, lastSpace) : clipped;

  return `${candidate.trimEnd()}...`;
};

const calculateReadingTimeMinutes = (markdown: string): number => {
  const plainText = stripMarkdownToPlainText(markdown);
  const wordCount = plainText ? plainText.split(" ").length : 0;

  return Math.max(1, Math.ceil(wordCount / AVERAGE_READING_SPEED_WPM));
};

const getYouTubeEmbedUrl = (src: string): string | null => {
  try {
    const url = new URL(src);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const videoId =
        url.searchParams.get("v") ||
        url.pathname.split("/").filter(Boolean)[1] ||
        null;

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname === "youtu.be") {
      const videoId = url.pathname.replace(/^\//, "");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
  } catch {
    return null;
  }

  return null;
};

const getMediaMetaLabel = (src: string): string => {
  const cleanPath = src.split("?")[0].split("#")[0];
  const filename = cleanPath.split("/").filter(Boolean).pop() || "media";
  const extension = filename.includes(".")
    ? filename.split(".").pop()?.toUpperCase() || "MEDIA"
    : "MEDIA";
  return extension;
};

const getMediaFrameVariant = (
  post: RenderableCorkboardPost,
  index: number
): MediaFrameVariant => {
  if (post.kind !== "image" && post.kind !== "video") {
    return "wide";
  }

  return index % 4 === 0 ? "tall" : "wide";
};

const estimateCardHeight = (post: RenderableCorkboardPost, index: number): number => {
  const baseHeight = 200;
  const frameVariant = getMediaFrameVariant(post, index);

  if (post.kind === "audio") {
    return baseHeight + 210;
  }

  if (post.kind === "image" || post.kind === "video") {
    return baseHeight + (frameVariant === "tall" ? 310 : 240);
  }

  return baseHeight + 170;
};

const distributeMasonryColumns = (
  posts: RenderableCorkboardPost[],
  columnCount: number
): MasonryColumnEntry[][] => {
  const count = Math.max(1, columnCount);
  const columns: MasonryColumnEntry[][] = Array.from(
    { length: count },
    () => []
  );
  const heights = new Array<number>(count).fill(0);

  posts.forEach((post, index) => {
    const estimate = estimateCardHeight(post, index);
    const targetColumn = heights.indexOf(Math.min(...heights));

    columns[targetColumn].push({ post, index });
    heights[targetColumn] += estimate;
  });

  return columns;
};

const singleLineClampStyles = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const getKindIcon = (kind: RenderableCorkboardPost["kind"]) => {
  switch (kind) {
    case "markdown":
      return RiArticleLine;
    case "audio":
      return RiMusic2Line;
    case "image":
      return RiImage2Line;
    default:
      return RiPlayCircleLine;
  }
};

const getKindLabel = (kind: RenderableCorkboardPost["kind"]): string => {
  switch (kind) {
    case "markdown":
      return "note";
    case "audio":
      return "audio";
    case "image":
      return "image";
    default:
      return "video";
  }
};

const CorkboardPage: NextPage<CorkboardPageProps> = ({ posts }) => {
  const router = useRouter();
  const masonryColumnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 1;
  const masonryColumns = useMemo(
    () => distributeMasonryColumns(posts, masonryColumnCount),
    [posts, masonryColumnCount]
  );

  const cardBackground = useColorModeValue(
    "rgba(255, 255, 255, 0.7)",
    "rgba(255, 255, 255, 0.04)"
  );
  const cardBorderColor = useColorModeValue(
    "rgba(27, 34, 25, 0.16)",
    "rgba(255, 255, 255, 0.14)"
  );
  const cardHoverGlow = useColorModeValue(
    "0 18px 34px rgba(27, 34, 25, 0.12)",
    "0 18px 34px rgba(2, 6, 23, 0.35)"
  );
  const mediaBadgeBg = useColorModeValue(
    "rgba(27, 34, 25, 0.08)",
    "rgba(255, 255, 255, 0.08)"
  );
  const pinColor = useColorModeValue(
    "rgba(116, 167, 113, 0.85)",
    "rgba(175, 201, 141, 0.78)"
  );
  const pinBorderColor = useColorModeValue(
    "rgba(27, 34, 25, 0.14)",
    "rgba(255, 255, 255, 0.24)"
  );
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
              <MotionDiv
                initial="initial"
                animate="animate"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      delayChildren: 0.06,
                    },
                  },
                }}
              >
                <Flex
                  align="flex-start"
                  gap={5}
                  p={{ base: 2, md: 2 }}
                  w="100%"
                  maxW="100%"
                  overflow="visible"
                  boxSizing="border-box"
                >
                  {masonryColumns.map((column, columnIndex) => (
                    <Stack
                      key={`masonry-column-${columnIndex}`}
                      flex="1"
                      spacing={5}
                      minW={0}
                      align="stretch"
                    >
                      {column.map(({ post, index }) => {
                        const youtubeEmbedSrc =
                          post.kind === "video" ? getYouTubeEmbedUrl(post.src) : null;
                        const postExcerpt = post.description;
                        const mediaMetaLabel =
                          post.kind === "markdown" ? "" : getMediaMetaLabel(post.src);
                        const mediaFrameVariant = getMediaFrameVariant(post, index);

                        return (
                          <Box
                            key={post.id}
                            w="100%"
                            maxW="100%"
                            className="masonryItem"
                            sx={{
                              breakInside: "avoid",
                              WebkitColumnBreakInside: "avoid",
                              pageBreakInside: "avoid",
                            }}
                          >
                            <MotionDiv
                              layout
                              initial={{ opacity: 0, y: 18 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                rotate: 0,
                                transition: {
                                  ...SPRING_PHYSICS,
                                  delay: index * 0.03,
                                },
                              }}
                              whileHover={{
                                y: -2,
                                rotate: 0.55,
                                zIndex: 10,
                                transition: {
                                  duration: 0.15,
                                  ease: [0.25, 1, 0.5, 1],
                                },
                              }}
                              style={{
                                height: "auto",
                                maxWidth: "100%",
                                transform: "translateY(0) rotate(0deg)",
                                zIndex: 1,
                                position: "relative",
                                transition:
                                  "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), z-index 0s",
                                boxSizing: "border-box",
                              }}
                            >
                              <Box
                                as="article"
                                h="auto"
                                maxW="100%"
                                overflow="hidden"
                                boxSizing="border-box"
                                borderWidth="1px"
                                borderColor={cardBorderColor}
                                borderRadius="2xl"
                                background={cardBackground}
                                backdropFilter="blur(10px)"
                                boxShadow="sm"
                                _hover={{ boxShadow: cardHoverGlow }}
                                transition="all 0.3s ease-in-out"
                                position="relative"
                                px={{ base: 5, md: 5 }}
                                py={{ base: 5, md: 5 }}
                              >
                                <Box
                                  position="absolute"
                                  top={3}
                                  right={3}
                                  boxSize="10px"
                                  borderRadius="full"
                                  background={pinColor}
                                  borderWidth="1px"
                                  borderColor={pinBorderColor}
                                />

                                <Flex
                                  position="absolute"
                                  top={4}
                                  left={5}
                                  right={7}
                                  align="center"
                                  justify="space-between"
                                  gap={2}
                                >
                                  <Flex
                                    align="center"
                                    gap={1.5}
                                    px={2}
                                    py={1}
                                    borderRadius="full"
                                    background={mediaBadgeBg}
                                  >
                                    <Icon as={getKindIcon(post.kind)} boxSize={4} />
                                    <Text
                                      fontSize="xs"
                                      textTransform="uppercase"
                                      letterSpacing="0.08em"
                                      variant="accentAlternative"
                                    >
                                      {getKindLabel(post.kind)}
                                    </Text>
                                  </Flex>
                                  <Text
                                    fontSize="xs"
                                    variant="accentAlternative"
                                    textTransform="uppercase"
                                    letterSpacing="0.1em"
                                    whiteSpace="nowrap"
                                  >
                                    {formatDate(post.date)}
                                  </Text>
                                </Flex>

                                <Stack spacing={3} pt={12} minW={0} maxW="100%" w="100%">
                                  <Heading size="sm" color="heading" noOfLines={2} maxW="100%">
                                    <NextLink href={`/corkboard/${post.id}`} prefetch passHref legacyBehavior>
                                      <Box
                                        as="a"
                                        display="inline"
                                        color="inherit"
                                        _hover={{ textDecoration: "underline" }}
                                      >
                                        {post.title}
                                      </Box>
                                    </NextLink>
                                    {post.kind === "markdown" && post.readingTimeMinutes ? (
                                      <Text
                                        as="span"
                                        ml={2}
                                        fontSize="11px"
                                        fontFamily="mono"
                                        variant="accentAlternative"
                                        textTransform="uppercase"
                                        letterSpacing="0.05em"
                                        whiteSpace="nowrap"
                                      >
                                        {post.readingTimeMinutes} min read
                                      </Text>
                                    ) : null}
                                  </Heading>

                                  {post.kind === "audio" && (
                                    <Stack spacing={2.5} minW={0} maxW="100%" w="100%">
                                      <CustomAudioPlayer
                                        src={post.src}
                                        title={post.srcTitle || post.title}
                                        thumbnail={post.thumbnail}
                                        metaLabel={mediaMetaLabel}
                                        compact
                                      />
                                    </Stack>
                                  )}

                                  {post.kind === "image" && (
                                    <Stack spacing={2.5} minW={0} maxW="100%" w="100%">
                                      <NextLink href={`/corkboard/${post.id}`} prefetch passHref legacyBehavior>
                                        <Box as="a" display="block" aria-label={`Open ${post.title}`}>
                                          <AspectRatio
                                            ratio={mediaFrameVariant === "tall" ? 1 : 16 / 9}
                                            w="100%"
                                            maxW="100%"
                                            maxH="400px"
                                          >
                                            <Box
                                              w="100%"
                                              maxW="100%"
                                              h="100%"
                                              borderRadius="0.9rem"
                                              overflow="hidden"
                                              boxSizing="border-box"
                                              borderWidth="1px"
                                              borderColor={cardBorderColor}
                                              cursor="pointer"
                                            >
                                              {/* eslint-disable-next-line @next/next/no-img-element */}
                                              <img
                                                src={post.src}
                                                alt={post.title}
                                                style={{
                                                  width: "100%",
                                                  height: "100%",
                                                  display: "block",
                                                  maxWidth: "100%",
                                                  objectFit: "cover",
                                                  boxSizing: "border-box",
                                                }}
                                              />
                                            </Box>
                                          </AspectRatio>
                                        </Box>
                                      </NextLink>
                                    </Stack>
                                  )}

                                  {post.kind === "video" && (
                                    <Stack spacing={2.5} minW={0} maxW="100%" w="100%">
                                      <CustomVideoPlayer
                                        src={post.src}
                                        title={post.srcTitle || post.title}
                                        metaLabel={mediaMetaLabel}
                                        poster={post.poster}
                                        youtubeEmbedSrc={youtubeEmbedSrc}
                                        frameVariant={mediaFrameVariant}
                                        compact
                                      />
                                    </Stack>
                                  )}

                                  {postExcerpt && (
                                    <Text
                                      fontSize="sm"
                                      variant="description"
                                      whiteSpace="pre-line"
                                      maxW="100%"
                                      w="100%"
                                      mt="auto"
                                      sx={singleLineClampStyles}
                                    >
                                      {postExcerpt}
                                    </Text>
                                  )}
                                </Stack>
                              </Box>
                            </MotionDiv>
                          </Box>
                        );
                      })}
                    </Stack>
                  ))}
                </Flex>
              </MotionDiv>
            )}
          </FadeInLayout>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<CorkboardPageProps> = async () => {
  const sortedPosts = [...corkboardPosts].sort(byNewestFirst);

  const posts = await Promise.all(
    sortedPosts.map(async (post): Promise<RenderableCorkboardPost> => {
      if (post.kind !== "markdown") {
        return post;
      }

      try {
        const absolutePath = path.join(process.cwd(), post.markdownPath);
        const content = await fs.readFile(absolutePath, "utf8");

        return {
          ...post,
          readingTimeMinutes: calculateReadingTimeMinutes(content),
        };
      } catch {
        return post;
      }
    })
  );

  return {
    props: {
      posts,
    },
  };
};

export default CorkboardPage;
