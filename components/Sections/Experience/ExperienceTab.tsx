import {
  Text,
  Link,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  List,
  ListIcon,
  ListItem,
  SlideFade,
  Skeleton,
  useColorModeValue,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { BiRightArrow } from "react-icons/bi";
import styles from "./styles.module.css";
import { ThemeMode } from "@/config/theme";
import { ExperiencesList } from "@/data/experience";
import { mobileBreakpointsMap } from "@/config/theme";

const ExperienceTab = () => {
  const { colorMode } = useColorMode();
  const emphasis = useColorModeValue("teal.500", "cyan.200");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const activeBordercolor = useColorModeValue("teal.500", "#97DFFC");
  const isMobile = useBreakpointValue(mobileBreakpointsMap);

  const tabOrientation: "horizontal" | "vertical" =
    useBreakpointValue({
      base: "horizontal" as const,
      sm: "horizontal" as const,
      md: "vertical" as const,
      lg: "vertical" as const,
      xl: "vertical" as const,
    }) ?? "vertical";

  const tabMinWidth = useBreakpointValue({
    base: "160px",
    sm: "160px",
    md: "auto",
    lg: "auto",
    xl: "auto",
  });

  const spotlightColor = useColorModeValue(
    "hsl(0 0% 0% / 0.1)",
    "hsl(0 0% 100% / 0.05)"
  );

  const spotlightColorStrong = useColorModeValue(
    "hsl(0 0% 0% / 0.3)",
    "hsl(0 0% 100% / 0.3)"
  );

  const maskColor = useColorModeValue("white", "black");

  return (
    <Tabs id="experienceTabs" orientation={tabOrientation} isLazy>
      <TabList
        width={!isMobile ? "30%" : "auto"}
        borderColor="transparent"
        overflowX={isMobile ? "scroll" : "auto"}
        overflowY={"hidden"}
        className={styles.experienceTabs}
      >
        {ExperiencesList.map((company) => (
          <Tab
            key={`Tab-${company.name}`}
            fontSize="smaller"
            h="120px"
            minWidth={tabMinWidth}
            boxShadow="none"
            borderColor={borderColor}
            borderLeftWidth={tabOrientation === "vertical" ? "4px" : "0"}
            _selected={{
              borderColor: activeBordercolor,
              boxShadow: "none",
              borderLeftWidth: tabOrientation === "vertical" ? "4px" : "0",
              borderBottomWidth: tabOrientation === "horizontal" ? "4px" : "0",
              background: "whiteAlpha.100",
            }}
            borderBottomWidth={tabOrientation === "horizontal" ? "4px" : "0"}
            className={styles.card}
            style={
              {
                "--spotlight-color": spotlightColor,
                "--spotlight-color-strong": spotlightColorStrong,
                "--mask-color": maskColor,
              } as React.CSSProperties
            }
          >
            <Image
              src={
                colorMode === "dark" ? company.logo.dark : company.logo.light
              }
              alt={company.longName}
              maxWidth="100px"
              fallback={<Skeleton height="100%" width="100%" />}
              _hover={{
                transform: "scale(1.1)",
                transition: "all 0.2s",
              }}
            ></Image>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {ExperiencesList.map((company) => (
          <TabPanel key={`TabPanel-${company.name}`}>
            <SlideFade offsetY="20px" in={true}>
              <Stack spacing={0}>
                <Text
                  as="span"
                  fontSize="lg"
                  fontWeight="bold"
                  variant="description"
                >
                  {company.position}
                </Text>
                <Text as="span">
                  <Link
                    href={company.url}
                    aria-label="scentregroup"
                    rel="noreferrer"
                    target="_blank"
                    fontSize="lg"
                    fontWeight="bold"
                  >
                    #{company.name}
                  </Link>
                  <Text
                    as="span"
                    textTransform="none"
                    fontSize="x-small"
                    variant="description"
                  >
                    {" "}
                    {company.subDetail}
                  </Text>
                </Text>
                <Text fontSize="smaller">{company.duration}</Text>
              </Stack>
              <List spacing={3} pt={5}>
                {company.roles?.map((roleDesc, idx) => (
                  <ListItem
                    key={`${company.name}-desc-${idx}`}
                    fontSize="smaller"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <ListIcon
                      as={BiRightArrow}
                      color={emphasis}
                      display="block"
                    />
                    <Text as="span" display="block" variant="description">
                      {roleDesc}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </SlideFade>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default ExperienceTab;
