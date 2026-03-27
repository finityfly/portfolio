// @ts-nocheck
import {
  Box,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import OpenGraphHead from "components/Misc/OpenGraphHead";
import Menu from "components/Menu";
import FadeInLayout from "components/Layout/FadeWhenVisible";
import {
  corkboardPosts,
  CorkboardPost,
  MarkdownPost,
  MediaPost,
} from "config/corkboard";
import { useEffect, useMemo } from "react";

const formatDate = (iso: string) => {
  // Expecting YYYY-MM-DD; keep formatting fully deterministic for SSR/CSR
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

const byNewestFirst = (a: CorkboardPost, b: CorkboardPost) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const MotionDiv = motion.div;
const MotionLink = motion.a;

const CorkboardPage = () => {
  const router = useRouter();
  const bg = useColorModeValue("gray.100", "black");
  const rowBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const rowHoverBg = useColorModeValue(
    "rgba(15, 23, 42, 0.02)",
    "rgba(148, 163, 184, 0.08)"
  );

  const posts = useMemo(() => [...corkboardPosts].sort(byNewestFirst), []);
  const getDescription = (post: CorkboardPost): string => {
    if ((post as MarkdownPost).summary) {
      return (post as MarkdownPost).summary as string;
    }
    if ((post as MediaPost).description) {
      return (post as MediaPost).description as string;
    }
    return "";
  };

  useEffect(() => {
    router.prefetch("/");
    posts.slice(0, 8).forEach((post) => {
      router.prefetch(`/corkboard/${post.id}`);
    });
  }, [posts, router]);

  const content: any = (
    <>
      <Analytics />
      <OpenGraphHead />
      <Menu />
      <Box as="main" bg={bg} minH="100vh" paddingTop={24}>
        <Container maxW="6xl" pb={16}>
          <FadeInLayout>
            <Stack spacing={6} mb={10}>
              <Box>
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
              </Box>
              <Heading
                size="2xl"
                fontFamily="name"
                style={{
                  fontVariantCaps: "small-caps",
                }}
              >
                Corkboard
              </Heading>
              <Text variant="description" maxW="70%">
                A low-pressure space for quick notes, audio snippets, and visual
                pins. Edit everything from{" "}
                <Text as="span" fontFamily="mono">
                  config/corkboard.ts
                </Text>
                .
              </Text>
            </Stack>
          </FadeInLayout>

          <FadeInLayout>
            <MotionDiv
              initial="initial"
              animate="animate"
              variants={{
                initial: {},
                animate: {
                  transition: {
                    delayChildren: 0.08,
                    staggerChildren: 0.09,
                  },
                },
              }}
            >
              <Stack spacing={0}>
                {posts.map((post) => {
                const description = getDescription(post);
                return (
                  <MotionDiv
                    key={post.id}
                    variants={{
                      initial: { opacity: 0, y: 14 },
                      animate: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.35, ease: "easeOut" },
                      },
                    }}
                  >
                    <NextLink
                      href={`/corkboard/${post.id}`}
                      prefetch
                      passHref
                      legacyBehavior
                    >
                      <Box as="a" _hover={{ textDecoration: "none" }}>
                      <Box
                        as="article"
                        display="flex"
                        flexDirection={{ base: "column", md: "row" }}
                        alignItems={{ base: "flex-start", md: "center" }}
                        justifyContent="space-between"
                        paddingY={4}
                        paddingX={{ base: 3, md: 4 }}
                        borderBottomWidth="1px"
                        borderColor={rowBorderColor}
                        gap={{ base: 2, md: 6 }}
                        _hover={{
                          backgroundColor: rowHoverBg,
                        }}
                        transition="background-color 0.15s ease-out"
                      >
                        <Stack spacing={1}>
                          <Heading size="sm">{post.title}</Heading>
                          {description && (
                            <Text
                              fontSize="sm"
                              variant="description"
                              noOfLines={2}
                            >
                              {description}
                            </Text>
                          )}
                        </Stack>
                        <Text
                          fontSize="xs"
                          variant="accentAlternative"
                          textTransform="uppercase"
                          letterSpacing="0.12em"
                          whiteSpace="nowrap"
                        >
                          {formatDate(post.date)}
                        </Text>
                      </Box>
                    </Box>
                    </NextLink>
                  </MotionDiv>
                );
              })}
              </Stack>
            </MotionDiv>
          </FadeInLayout>
        </Container>
      </Box>
    </>
  );

  return content;
};

export default CorkboardPage;

