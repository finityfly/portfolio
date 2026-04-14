import {
  Box,
  Code,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light";
import hljsJavascript from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import hljsTypescript from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
import hljsBash from "react-syntax-highlighter/dist/cjs/languages/hljs/bash";
import hljsJson from "react-syntax-highlighter/dist/cjs/languages/hljs/json";
import hljsPython from "react-syntax-highlighter/dist/cjs/languages/hljs/python";
import hljsCpp from "react-syntax-highlighter/dist/cjs/languages/hljs/cpp";
import hljsC from "react-syntax-highlighter/dist/cjs/languages/hljs/c";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import remarkGfm from "remark-gfm";

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

interface MarkdownBlockProps {
  content: string;
}

const MarkdownBlock = ({ content }: MarkdownBlockProps) => {
  const markdownColor = "emphasis";
  const markdownSecondaryColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const inlineCodeBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const blockCodeBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const codeBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const blockquoteBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const blockquoteBorderColor = useColorModeValue("sage.700", "sage.500");
  const blockquoteAttributionColor = useColorModeValue("gray.600", "whiteAlpha.700");
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
              className="linkUnderline"
              variant="emphasis"
              _hover={{ textDecoration: "none" }}
            >
              {children}
            </Link>
          ),
          blockquote: ({ children }) => (
            <Box
              as="blockquote"
              my={5}
              px={{ base: 3, md: 4 }}
              py={{ base: 2, md: 3 }}
              borderLeftWidth="3px"
              borderLeftColor={blockquoteBorderColor}
              borderRadius="md"
              bg={blockquoteBg}
              sx={{
                p: {
                  mb: 2,
                },
                "p:last-of-type": {
                  mb: 0,
                },
                ul: {
                  listStyleType: "none",
                  pl: 0,
                  mb: 0,
                  mt: 1,
                },
                li: {
                  mb: 0,
                },
                "li .chakra-text": {
                  color: blockquoteAttributionColor,
                  fontSize: "0.94em",
                  letterSpacing: "0.01em",
                  mb: 0,
                },
              }}
            >
              {children}
            </Box>
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
                    style={codeTheme as any}
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

export default MarkdownBlock;
