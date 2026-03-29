/* eslint-disable react/no-multi-comp, react/prop-types, @typescript-eslint/no-var-requires */
import fs from "fs/promises";
import path from "path";
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
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import remarkGfm from "remark-gfm";
import OpenGraphHead from "components/Misc/OpenGraphHead";
import Menu from "components/Menu";
import FadeInLayout from "components/Layout/FadeWhenVisible";
import {
  CustomAudioPlayer,
  CustomVideoPlayer,
} from "components/Corkboard/MediaPlayers";
import {
  corkboardPosts,
  MarkdownPost,
  MediaPost,
} from "config/corkboard";

const SyntaxHighlighter = require("react-syntax-highlighter/dist/cjs/light").default;
const hljsJavascript = require("react-syntax-highlighter/dist/cjs/languages/hljs/javascript").default;
const hljsTypescript = require("react-syntax-highlighter/dist/cjs/languages/hljs/typescript").default;
const hljsBash = require("react-syntax-highlighter/dist/cjs/languages/hljs/bash").default;
const hljsJson = require("react-syntax-highlighter/dist/cjs/languages/hljs/json").default;
const hljsPython = require("react-syntax-highlighter/dist/cjs/languages/hljs/python").default;
const hljsCpp = require("react-syntax-highlighter/dist/cjs/languages/hljs/cpp").default;
const hljsC = require("react-syntax-highlighter/dist/cjs/languages/hljs/c").default;

SyntaxHighlighter.registerLanguage("javascript", hljsJavascript);
SyntaxHighlighter.registerLanguage("typescript", hljsTypescript);
SyntaxHighlighter.registerLanguage("bash", hljsBash);
SyntaxHighlighter.registerLanguage("json", hljsJson);
SyntaxHighlighter.registerLanguage("python", hljsPython);
SyntaxHighlighter.registerLanguage("cpp", hljsCpp);
SyntaxHighlighter.registerLanguage("c", hljsC);

const normalizeCodeLanguage = (rawLanguage: string): string => {
  const language = rawLanguage.toLowerCase();

  switch (language) {
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "py":
      return "python";
    case "sh":
    case "shell":
      return "bash";
    case "c++":
      return "cpp";
    default:
      return language;
  }
};

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

const AVERAGE_READING_SPEED_WPM = 200;

const calculateReadingTimeMinutes = (markdown: string): number => {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_~\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

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

type MarkdownPostWithContent = MarkdownPost & {
  content: string;
};

type RenderableCorkboardPost = MarkdownPostWithContent | MediaPost;

const MarkdownBlock = ({ content }: { content: string }) => {
  const markdownColor = "emphasis";
  const markdownSecondaryColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const inlineCodeBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const blockCodeBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const codeBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const codeTheme = useColorModeValue(atomOneLight, atomOneDark);

  return (
    <Box
      color={markdownColor}
      lineHeight={1.85}
      fontSize={{ base: "0.98rem", md: "1.04rem" }}
      maxW="72ch"
      letterSpacing="0.005em"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Heading
              as="h1"
              mt={3}
              mb={4}
              fontFamily="name"
              fontSize={{ base: "1.62rem", md: "1.9rem" }}
              lineHeight={1.2}
            >
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading
              as="h2"
              mt={3}
              mb={3}
              fontFamily="name"
              fontSize={{ base: "1.36rem", md: "1.52rem" }}
              lineHeight={1.25}
            >
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading
              as="h3"
              mt={3}
              mb={2}
              fontFamily="name"
              fontSize={{ base: "1.14rem", md: "1.22rem" }}
              lineHeight={1.3}
            >
              {children}
            </Heading>
          ),
          h4: ({ children }) => (
            <Heading
              as="h4"
              mt={3}
              mb={2}
              fontSize={{ base: "0.98rem", md: "1.04rem" }}
              fontWeight="semibold"
              lineHeight={1.45}
            >
              {children}
            </Heading>
          ),
          p: ({ children }) => (
            <Text mb={5} color={markdownSecondaryColor} lineHeight={1.85}>
              {children}
            </Text>
          ),
          ul: ({ children }) => (
            <Box as="ul" pl={6} mb={5}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box as="ol" pl={6} mb={5}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Box as="li" mb={2}>
              <Text as="span" color={markdownSecondaryColor} lineHeight={1.85}>
                {children}
              </Text>
            </Box>
          ),
          strong: ({ children }) => (
            <Text as="strong" color={markdownColor} fontWeight="semibold">
              {children}
            </Text>
          ),
          em: ({ children }) => (
            <Text as="em" color={markdownSecondaryColor} fontStyle="italic">
              {children}
            </Text>
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
          code: ({ className, children }) => {
            const languageMatch = /language-(\S+)/.exec(className || "");
            const codeValue = String(children).replace(/\n$/, "");

            if (!languageMatch) {
              return (
                <Code
                  px={1.5}
                  py={0.5}
                  fontSize="0.85em"
                  borderRadius="md"
                  color={markdownColor}
                  bg={inlineCodeBg}
                  borderWidth="1px"
                  borderColor={codeBorderColor}
                >
                  {children}
                </Code>
              );
            }

            return (
              <Box as="pre" overflowX="auto" mb={3}>
                <Box
                  borderRadius="md"
                  bg={blockCodeBg}
                  borderWidth="1px"
                  borderColor={codeBorderColor}
                >
                  <SyntaxHighlighter
                    language={normalizeCodeLanguage(languageMatch[1])}
                    style={codeTheme}
                    customStyle={{
                      margin: 0,
                      padding: "12px",
                      borderRadius: "6px",
                      background: "transparent",
                      fontSize: "0.85em",
                    }}
                    codeTagProps={{ style: { fontFamily: "monospace" } }}
                    wrapLongLines
                  >
                    {codeValue}
                  </SyntaxHighlighter>
                </Box>
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
  readingTimeMinutes?: number;
}

const MotionLink = motion.a;

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
      <OpenGraphHead />
      <Menu />
      <Box as="main" bg="panel" color="body" minH="100vh" paddingTop={{ base: 20, md: 24 }}>
        <Container maxW={{ base: "5xl", lg: "min(70vw, 56rem)" }} pb={16} px={{ base: 6, md: 8 }}>
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
    const readingTimeMinutes = calculateReadingTimeMinutes(content);

    return {
      props: {
        post: {
          ...post,
          content,
        },
        readingTimeMinutes,
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

