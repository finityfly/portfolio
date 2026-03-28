"use client";

import { memo } from "react";
import { Box, Icon, Link, Text } from "@chakra-ui/react";
import { RiGithubFill, RiHeartPulseFill } from "react-icons/ri";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" px={{ base: 6, md: 8 }} pb={{ base: 6, md: 10 }}>
      <Box
        maxW={{ base: "5xl", lg: "min(70vw, 56rem)" }}
        mx="auto"
        pt={{ base: 10, md: 12 }}
        borderTop="1px solid"
        borderColor="border"
        textAlign="center"
        fontFamily="monospace"
      >
        <Link
          variant="description"
          textDecoration="none"
          rel="noreferrer"
          href="https://github.com/FinityFly/portfolio"
          target="_blank"
          className="linkUnderline"
          _focus={{ boxShadow: "none" }}
          _hover={{ color: "emphasis", textDecoration: "none" }}
          data-nav-sfx
        >
          <Text as="span" display="inline-block" lineHeight="1.8">
            <Icon as={RiGithubFill} h={6} w={6} />
            <br />
            Daniel Lu <Icon as={RiHeartPulseFill} /> {currentYear}
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default memo(Footer);