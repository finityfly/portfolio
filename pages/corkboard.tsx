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
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import OpenGraphHead from "components/Misc/OpenGraphHead";
import Menu from "components/Menu";
import FadeInLayout from "components/Layout/FadeWhenVisible";
import { SPRING_PHYSICS, riseIn } from "config/animations";
import {
  corkboardPosts,
  CorkboardPost,
  MarkdownPost,
  MediaPost,
} from "config/corkboard";

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
const MotionHeading = motion(Heading);

const CorkboardPage = () => {
  const router = useRouter();
  const rowBorderColor = "panelBorder";
  const rowHoverBg = "rgba(148, 163, 184, 0.08)";
  const emptyStateImageSrc = "/mimikyu.png";

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

  return (
    <>
      <Analytics />
      <OpenGraphHead />
      <Menu />
      <Box as="main" bg="panel" color="body" minH="100vh" paddingTop={24}>
        <Container maxW={{ base: "5xl", lg: "min(70vw, 56rem)" }} px={{ base: 6, md: 8 }} pb={16}>
          <FadeInLayout>
            <Stack spacing={0} mb={10}>
              <Flex
                ml={{ base: 2, md: 0 }}
                mt={{ base: 2, md: 3 }}
                mb={{ base: 5, md: 6 }}
                align="center"
              >
                <NextLink href="/" prefetch passHref legacyBehavior>
                  <MotionLink
                    aria-label="Back to portfolio"
                    style={{ display: "inline-flex", alignItems: "center" }}
                    whileHover={{ x: -3 }}
                    whileTap={{ x: -1, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    data-nav-sfx
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
                pl={{ base: 2, md: 0 }}
                initial="initial"
                animate="animate"
                variants={riseIn}
              >
                corkboard
              </Heading>
              <Text variant="description" maxW="90%" pl={{ base: 2, md: 0 }}>
                My digital space for half-baked ideas and anything that doesn&apos;t fit neatly elsewhere.
              </Text>
            </Stack>
          </FadeInLayout>

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
                  nothing pinned yet 😔
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
                      delayChildren: 0.08,
                      staggerChildren: 0.1,
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
                          initial: { opacity: 0, y: -20 },
                          animate: {
                            opacity: 1,
                            y: 0,
                            transition: { ...SPRING_PHYSICS },
                          },
                        }}
                      >
                        <NextLink
                          href={`/corkboard/${post.id}`}
                          prefetch
                          passHref
                          legacyBehavior
                        >
                          <Box as="a" _hover={{ textDecoration: "none" }} data-nav-sfx>
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
                                <Heading size="sm" color="heading">{post.title}</Heading>
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
            )}
          </FadeInLayout>
        </Container>
      </Box>
    </>
  );
};

export default CorkboardPage;

