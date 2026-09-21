import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/config/theme";
import FavIconProvider from "@/components/Providers/FavIconProvider";
import SmoothScroll from "@/components/Providers/SmoothScroll";
import NavSfxProvider from "@/components/Providers/NavSfxProvider";

function DLSite({ Component, pageProps }: AppProps) {
  return (
    <SmoothScroll>
      <ChakraProvider theme={theme}>
        <FavIconProvider>
          <NavSfxProvider>
            <Component {...pageProps} />
          </NavSfxProvider>
        </FavIconProvider>
      </ChakraProvider>
    </SmoothScroll>
  );
}
export default DLSite;
