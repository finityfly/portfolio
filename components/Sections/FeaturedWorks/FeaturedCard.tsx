/* eslint-disable react/no-multi-comp */
import { MouseEventHandler } from "react";
import {
  Box,
  Image,
  ResponsiveValue,
  Divider,
  Skeleton,
  Icon,
  Text,
  SimpleGrid,
  Button,
  Container,
  Stack,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import { SiGithub } from "react-icons/si";
import { IoMdOpen } from "react-icons/io";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { easing, DURATIONS } from "config/animations";

type IWorkModal = {
  onOpen(): void;
};

export type FeaturedCardProps = {
  // Still can't find what's correct value for responsive value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  height: string | ResponsiveValue<any>;
  src: string;
  onOpen: () => void;
  idx: number;
  title: string;
  description: string;
  objectPosition?: string;
  url1: string;
  url2: string;
  isMobile?: boolean;
};

const variants = {
  normal: {
    opacity: 0.85,
  },
  hover: {
    scale: 1.1,
    opacity: 1,
    transition: {
      duration: DURATIONS.Fast,
      ease: "backOut",
    },
  },
  tap: {
    scale: 0.85,
    opacity: 1,
    transition: {
      duration: DURATIONS.Fast,
      ease: easing,
    },
  },
};

const MotionImage = motion(Image);

const ProjectDescription = ({
  idx,
  title,
  description,
  url1,
  url2,
  isLeft,
  onOpen,
}: {
  idx?: number;
  title: string;
  description: string;
  url1: string;
  url2: string;
  isLeft: boolean;
  onOpen?: () => void;
}) => {
  const emphasis = useColorModeValue("#319795", "#9decf9");

  const applyBoldFormatting = (text: string) => {
    const boldRegex = /<b>(.*?)<\/b>/g;
    const formattedText = text.replace(
      boldRegex,
      (_: string, content: string) =>
        `<span style="font-weight: bold; color: ${emphasis}">${content}</span>`
    );
    return formattedText;
  };

  return (
    <Container
      paddingX={5}
      paddingY={5}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Stack spacing={1} width="100%">
        <Text
          fontSize={{ base: "md", md: "large", "2xl": "xx-large" }}
          fontWeight="bold"
          letterSpacing={1}
          width="100%"
          alignSelf={isLeft ? "flex-end" : "flex-start"}
          textTransform="uppercase"
          as="span"
        >
          <Text
            variant="accentAlternative"
            fontSize="md"
            as="span"
            alignSelf={isLeft ? "flex-end" : "flex-start"}
          >
            #0{idx}
            {"  "}
          </Text>
          {title}
        </Text>
        <Divider
          borderColor="#A6A6A6"
          width="90%"
          marginLeft={0}
          alignSelf={isLeft ? "flex-end" : "flex-start"}
        />
      </Stack>
      <Text
        fontSize="smaller"
        variant="accentAlternative"
        width="90%"
        alignSelf={isLeft ? "flex-end" : "flex-start"}
        wordBreak="break-word"
        paddingY={{ base: 3, md: 0 }}
        dangerouslySetInnerHTML={{ __html: applyBoldFormatting(description) }}
      />
      <Container
        display="flex"
        justifyContent="center"
        flexDirection="row"
        width="100%"
        paddingY={2}
      >
        <Button
          variant="outlineAlternative"
          fontWeight="light"
          fontSize={{ base: "sm", "2xl": "md" }}
          borderColor={emphasis}
          color={emphasis}
          size="sm"
          onClick={
            onOpen as unknown as MouseEventHandler<HTMLButtonElement>
          } /* eslint-disable-line */
          marginX={1}
          paddingX={2}
          marginY={{ base: 3, md: 0 }}
        >
          More Info
        </Button>
        <Button
          variant="outlineAlternative"
          fontWeight="light"
          fontSize={{ base: "sm", "2xl": "md" }}
          size="sm"
          as="a"
          href={url1}
          rel="noreferrer"
          target="_blank"
          marginX={1}
          paddingX={2}
          marginY={{ base: 3, md: 0 }}
        >
          GitHub&nbsp;
          <Icon as={SiGithub} />
        </Button>
        <Button
          variant="outlineAlternative"
          fontWeight="light"
          fontSize={{ base: "sm", "2xl": "md" }}
          size="sm"
          as="a"
          href={url2}
          rel="noreferrer"
          target="_blank"
          marginX={1}
          paddingX={2}
          marginY={{ base: 3, md: 0 }}
        >
          External&nbsp;
          <Icon as={IoMdOpen} />
        </Button>
      </Container>
    </Container>
  );
};

const FeaturedCard = ({
  idx,
  height,
  src,
  onOpen,
  title,
  description,
  objectPosition,
  url1,
  url2,
  isMobile,
}: FeaturedCardProps) => {
  const isLeftImage = isMobile ? false : idx % 2 === 0;
  const bg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
  const CoverImage = () => (
    <MotionImage
      height={height}
      width="100%"
      src={src}
      alt={title}
      objectFit="cover"
      objectPosition={objectPosition}
      loading="lazy"
      opacity={0.75}
      whileHover={variants.hover}
      whileTap={variants.tap}
      fallback={<Skeleton height={height} width="100%" />}
    />
  );

  return (
    <Box
      height="auto"
      bg={bg}
      borderRadius="1em"
      className={styles.featureCard}
      borderColor={bg}
      borderWidth="1px"
    >
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 3, md: 0 }}
        display={{ base: "flex", md: "grid" }}
        flexDirection={{ base: "column-reverse", md: "initial" }}
      >
        {isLeftImage && <CoverImage />}
        <ProjectDescription
          idx={idx}
          title={title}
          description={description}
          url1={url1}
          url2={url2}
          onOpen={onOpen}
          isLeft={isLeftImage}
        />
        {!isLeftImage && <CoverImage />}
      </SimpleGrid>
    </Box>
  );
};
export default FeaturedCard;
