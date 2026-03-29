import Head from "next/head";
const OpenGraphHead = () => (
  <Head>
    <title> Daniel Lu</title>
    {/* <meta name="description" content="Daniel Lu" /> */}
    <meta property="og:title" content="Daniel Lu" />
    <meta property="og:site_name" content="daniellu.ca" />
    <meta property="og:url" content="https://daniellu.ca/" />
    {/* <meta
      property="og:description"
      content="Daniel Lu"
    /> */}
    <meta property="og:type" content="profile" />
    {/* <meta property="og:image" content="https://daniellu.ca/logo.png"></meta> */}
  </Head>
);
export default OpenGraphHead;
