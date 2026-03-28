import {
  extendTheme,
  ColorMode,
} from "@chakra-ui/react";

interface IThemeMode {
  Light: ColorMode;
  Dark: ColorMode;
}

export const ThemeMode: IThemeMode = {
  Light: "light",
  Dark: "dark",
};

export const mobileBreakpointsMap = {
  base: true,
  md: true,
  lg: true,
  xl: false,
};

// Theme Config
const config = {
  initialColorMode: ThemeMode.Light,
  useSystemColorMode: false,
};

// Centralized text colors: update only these to retheme body/emphasis text app-wide.
const BODY_TEXT_HEX = {
  light: "#4D5A50",
  dark: "#acbbb1",
};

const EMPHASIS_HEX = {
  light: "#74a771",
  dark: "#afc98d",
};

const colors = {
  sage: {
    500: EMPHASIS_HEX.dark,
    600: "#A3B18A",
    700: EMPHASIS_HEX.light,
  },
  border: {
    dark: "#1D241B",
    light: "#D4DCCE",
  },
};

const THEME_FADE_DURATION = "300ms";
const THEME_FADE_EASING = "ease";

const styles = {
  global: () => ({
    body: {
      color: "body",
      bg: "panel",
      lineHeight: 1.75,
      letterSpacing: "0.01em",
      transitionProperty: "background-color, color",
      transitionDuration: THEME_FADE_DURATION,
      transitionTimingFunction: THEME_FADE_EASING,
    },
    "#__next, main, section, footer, header": {
      transitionProperty: "background-color, border-color, color",
      transitionDuration: THEME_FADE_DURATION,
      transitionTimingFunction: THEME_FADE_EASING,
    },
    "a, button, svg, .chakra-heading, .chakra-text, .chakra-link, .chakra-icon, .chakra-button, .chakra-container, .chakra-box, .chakra-flex, .chakra-stack": {
      transitionProperty: "background-color, border-color, color, fill, stroke",
      transitionDuration: THEME_FADE_DURATION,
      transitionTimingFunction: THEME_FADE_EASING,
    },
  }),
};

const textVariants = {
  emphasis: () => ({
    color: "accent",
  }),
  description: () => ({
    color: "body",
  }),
  accent: () => ({
    color: "accent",
  }),
  accentAlternative: () => ({
    color: "accentAlternative",
  }),
};

const theme = extendTheme({
  config,
  fonts: {
    body: "Poppins",
    name: "Newsreader",
    heading: "Newsreader",
  },
  colors,
  semanticTokens: {
    colors: {
      accent: {
        default: EMPHASIS_HEX.light,
        _dark: EMPHASIS_HEX.dark,
      },
      body: {
        default: BODY_TEXT_HEX.light,
        _dark: BODY_TEXT_HEX.dark,
      },
      accentAlternative: {
        default: "#5D665E",
        _dark: "#727B74",
      },
      heading: {
        default: "#1B2219",
        _dark: "#F2F2F2",
      },
      panel: {
        default: "#F3F4EF",
        _dark: "#0F110C",
      },
      panelBorder: {
        default: "#D4DCCE",
        _dark: "#1D241B",
      },
    },
  },
  styles,
  components: {
    Link: {
      baseStyle: () => ({
        color: "accent",
        textDecoration: "none",
        _hover: {
          color: "accent",
          textDecoration: "none",
        },
      }),
      variants: {
        ...textVariants,
        description: () => ({
          color: "body",
          _hover: {
            color: "accent",
            textDecoration: "none",
          },
        }),
        profile: () => ({
          color: "body",
          fontWeight: "bold",
          fontSize: "sm",
          letterSpacing: "wider",
          _hover: {
            color: "heading",
            textDecoration: "none",
          },
        }),
      },
    },
    Text: {
      variants: textVariants,
    },
    Heading: {
      variants: textVariants,
    },
    Button: {
      variants: {
        outline: () => ({
          borderColor: "accent",
        }),
        outlineAlternative: () => ({
          borderWidth: "1px",
          borderRadius: "4px",
          borderColor: "panelBorder",
          _hover: {
            backgroundColor: "panel",
          },
        }),
      },
    },
    Icon: {
      variants: {
        accent: () => ({
          borderColor: "panelBorder",
        }),
      },
    },
    Divider: {
      variants: {
        solid: () => ({
          borderColor: "panelBorder",
          marginLeft: "auto",
          marginRight: "auto",
        }),
      },
    },
  },
});
export default theme;
