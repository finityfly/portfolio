import Head from "next/head";
const OpenGraphHead = () => (
  <Head>
    <title> Daniel Lu | Portfolio</title>
    <meta name="description" content="My personal solace place on web-earth." />
    <meta property="og:title" content="Daniel Lu | Portfolio" />
    <meta property="og:site_name" content="Daniellu" />
    <meta property="og:url" content="https://daniellu.ca/" />
    <meta
      property="og:description"
      content="Ohh you found me? Hey! I am Daniel Lu. I am a Software Engineer"
    />
    <meta property="og:type" content="profile" />
    <meta
      property="og:image"
      content="https://daniellu.ca/github_avatar.png"
    ></meta>
  </Head>
);
export default OpenGraphHead;
