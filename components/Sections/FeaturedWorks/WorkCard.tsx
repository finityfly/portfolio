import {
  Box,
  Image,
  Text,
  Stack,
  Divider,
  Button,
  useColorModeValue,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ResponsiveValue } from "@chakra-ui/react";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { ThemeMode } from "config/theme";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

type ProfileCardProps = {
  index: number;
  title: string;
  location: string;
  description: string;
  imageSrc: string;
  logoSrc: string;
  url1: string;
  url2: string;
  isMobile?: boolean;
  onOpen: () => void;
};

const WorkCard = ({
  index,
  title,
  location,
  description,
  imageSrc,
  logoSrc,
  url1,
  url2,
  isMobile,
  onOpen,
}: ProfileCardProps) => {
  const { colorMode } = useColorMode();
  const emphasis = useColorModeValue("#319795", "#9decf9");
  const flexDirection: ResponsiveValue<
    "row" | "row-reverse" | "column" | "column-reverse"
  > =
    index % 2 === 0
      ? { base: "column", md: "row" }
      : { base: "column", md: "row-reverse" };

  const boxShadowColor =
    colorMode === ThemeMode.Dark
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(0, 0, 0, 0.2)";
  const hoverBoxShadowColor =
    colorMode === ThemeMode.Dark
      ? "rgba(255, 255, 255, 0.4)"
      : "rgba(0, 0, 0, 0.3)";

  const spotlightColor = useColorModeValue(
    "hsl(0 0% 0% / 0.1)",
    "hsl(0 0% 100% / 0.05)"
  );

  const spotlightColorStrong = useColorModeValue(
    "hsl(0 0% 0% / 0.4)",
    "hsl(0 0% 100% / 0.4)"
  );

  const maskColor = useColorModeValue("white", "black");

  const applyBoldFormatting = (text: string) => {
    const boldRegex = /<b>(.*?)<\/b>/g;
    const formattedText = text.replace(
      boldRegex,
      (_: string, content: string) =>
        `<span style="font-weight: bold; color: ${emphasis}">${content}</span>`
    );
    return formattedText;
  };

  useEffect(() => {
    const updateCursor = ({ clientX: x, clientY: y }: MouseEvent) => {
      document.documentElement.style.setProperty("--x", x.toString());
      document.documentElement.style.setProperty("--y", y.toString());
    };

    document.body.addEventListener("pointermove", updateCursor);

    return () => {
      document.body.removeEventListener("pointermove", updateCursor);
    };
  }, []);

  return (
    <MotionBox
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="lg"
      boxShadow={`0px 2px 6px 0px ${boxShadowColor}`}
      overflow="hidden"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      width="95%"
      ml="16px"
      whileHover={{
        boxShadow: `0px 3px 12px 0px ${hoverBoxShadowColor}`,
        transition: { duration: 0.1 },
      }}
    >
      <Flex direction={flexDirection}>
        <Box flex="1" maxW={{ base: "100%", md: "50%" }}>
          <Image
            src={imageSrc}
            alt={title}
            objectFit="cover"
            height="100%"
            width="100%"
          />
        </Box>
        <Box
          flex="1"
          p={5}
          maxW={{ base: "100%", md: "50%" }}
          className={styles.card}
          style={
            {
              "--spotlight-color": spotlightColor,
              "--spotlight-color-strong": spotlightColorStrong,
              "--mask-color": maskColor,
            } as React.CSSProperties
          }
        >
          <Stack spacing={1}>
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold" fontSize="xl">
                {title}
              </Text>
              <Box
                as="span"
                borderRadius="0px"
                // overflow="hidden"
                height="30px"
                width="30px"
              >
                <Image src={logoSrc} alt={`${title} logo`} objectFit="cover" />
              </Box>
            </Flex>
            <Text fontSize="sm" color={emphasis} py={1}>
              {location}
            </Text>
            <Divider borderColor="gray.400" />
            <Text
              fontSize="sm"
              py={2}
              dangerouslySetInnerHTML={{
                __html: applyBoldFormatting(description),
              }}
            />
          </Stack>
          <MotionButton
            mt={4}
            color={emphasis}
            variant="outline"
            width="full"
            borderRadius="5px"
            onClick={onOpen}
            whileHover={{
              boxShadow: `0px 0px 8px 0px ${hoverBoxShadowColor}`,
              scale: 1.03,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            More Info
          </MotionButton>
          <Flex mt={4} gap={2}>
            <MotionButton
              variant="outline"
              fontWeight="light"
              fontSize="sm"
              borderRadius="5px"
              size="sm"
              as="a"
              href={url1}
              rel="noreferrer"
              target="_blank"
              width="50%"
              whileHover={{
                boxShadow: `0px 0px 8px 0px ${hoverBoxShadowColor}`,
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              GitHub
            </MotionButton>
            <MotionButton
              variant="outline"
              fontWeight="light"
              fontSize="sm"
              borderRadius="5px"
              size="sm"
              as="a"
              href={url2}
              rel="noreferrer"
              target="_blank"
              width="50%"
              whileHover={{
                boxShadow: `0px 0px 8px 0px ${hoverBoxShadowColor}`,
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              External
            </MotionButton>
          </Flex>
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default WorkCard;
