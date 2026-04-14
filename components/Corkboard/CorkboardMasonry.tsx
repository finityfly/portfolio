import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import {
  RiArticleLine,
  RiImage2Line,
  RiMusic2Line,
  RiPlayCircleLine,
} from "react-icons/ri";
import {
  distributeMasonryColumns,
  getMediaFrameVariant,
  RenderableCorkboardCardPost,
} from "@/lib/corkboard";
import {
  formatDate,
  getYouTubeEmbedUrl,
  getMediaMetaLabel,
} from "@/lib/utils";
import { CustomAudioPlayer, CustomVideoPlayer } from "./MediaPlayers";
import { SPRING_PHYSICS } from "@/config/animations";

const MotionDiv = motion.div;

const singleLineClampStyles = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const getKindIcon = (kind: RenderableCorkboardCardPost["kind"]) => {
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

const getKindLabel = (kind: RenderableCorkboardCardPost["kind"]): string => {
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

interface CorkboardMasonryProps {
  posts: RenderableCorkboardCardPost[];
}

const CorkboardMasonry = ({ posts }: CorkboardMasonryProps) => {
  const masonryColumnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 1;
  const masonryColumns = distributeMasonryColumns(posts, masonryColumnCount);

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

  return (
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
              const cardHref = `/corkboard/${post.id}`;
              // All cards are clickable via the card wrapper link.
              // Audio/video players use preventNav (stopPropagation) on their shell so
              // player control clicks are isolated and never trigger card navigation.
              const isClickableCard = true;

              const cardArticle = (
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
                    background={post.pinned ? "accent" : "accentAlternative"}
                    borderWidth="1.5px"
                    borderColor={post.pinned ? "accent" : "accentAlternative"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.2s"
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
                      {isClickableCard ? (
                        // No inner link — the card wrapper is the link
                        <Box as="span" display="inline" color="inherit">
                          {post.title}
                        </Box>
                      ) : (
                        <NextLink
                          href={cardHref}
                          prefetch
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          <Box
                            as="span"
                            display="inline"
                            _hover={{ textDecoration: "underline" }}
                          >
                            {post.title}
                          </Box>
                        </NextLink>
                      )}
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
                        {/* No inner link — the card wrapper handles navigation */}
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
              );

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
                    {isClickableCard ? (
                      // HTML5 allows <a> to wrap block elements (transparent content model).
                      // Audio/video player shells use stopPropagation so their controls
                      // are isolated from this link — only non-player areas navigate.
                      <NextLink
                        href={cardHref}
                        prefetch
                        style={{ display: "block", textDecoration: "none" }}
                      >
                        {cardArticle}
                      </NextLink>
                    ) : (
                      cardArticle
                    )}
                  </MotionDiv>
                </Box>
              );
            })}
          </Stack>
        ))}
      </Flex>
    </MotionDiv>
  );
};

export default CorkboardMasonry;
