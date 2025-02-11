import { memo } from "react";
import { Heading, Text, Stack, Link } from "@chakra-ui/react";
import ExperienceTab from "./ExperienceTab";
const DetailSection = () => (
  <Stack
    width={{ base: "99%", lg: "60%", xl: "75%" }}
    height="100%"
    spacing={{ base: 6, xl: 8 }}
    backdropFilter="blur(3px)"
    borderRadius="lg"
  >
    <Heading
      size="2xl"
      style={{
        fontVariantCaps: "small-caps",
      }}
    >
      Places i’ve worked.
    </Heading>
    <Text variant="description">
      These amazing orgs have honed many of my skills and talents in the past
      few years. I&apos;m super grateful for the opportunities they&apos;ve
      given me and they will always have a special place in my heart.
    </Text>

    <ExperienceTab />
  </Stack>
);

export default memo(DetailSection);
