import { Box, Container } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import OpenGraphHead from "@/components/SEO/OpenGraphHead";
import FadeInLayout from "@/components/Layout/FadeWhenVisible";
import Menu from "@/components/Menu";
import Profile from "@/components/Profile";
import Footer from "@/components/Footer";
import FeaturedWorks from "@/components/Sections/FeaturedWorks";
import GetInTouch from "@/components/Sections/GetInTouch";
const Portfolio = () => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
        `}
      </Script>
      <Analytics />
      <OpenGraphHead title="Daniel Lu" path="/" type="website" />
      <Menu />
      <Container
        as="main"
        maxW={{ base: "5xl", lg: "min(70vw, 56rem)" }}
        px={{ base: 6, md: 8 }}
        pt={{ base: 36, md: 40 }}
        pb={{ base: 12, md: 16 }}
      >
        <Box w="100%">
          <FadeInLayout delay={0}>
            <Box as="section" id="aboutMe" className="contentRow" mb="100px">
              <Profile />
            </Box>
          </FadeInLayout>

          <FadeInLayout delay={0.6}>
            <Box as="section" id="works" className="contentRow" mb="100px">
              <FeaturedWorks />
            </Box>
          </FadeInLayout>

          <FadeInLayout delay={0.2}>
            <Box as="section" id="contact" className="contentRow" mb="100px">
              <GetInTouch />
            </Box>
          </FadeInLayout>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Portfolio;
