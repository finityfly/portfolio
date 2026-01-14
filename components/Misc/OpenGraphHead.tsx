import Head from "next/head";
const OpenGraphHead = () => (
  <Head>
    <title> Daniel Lu | Portfolio</title>
    <meta name="description" content="Hey I'm Daniel, glad you're here!" />
    <meta property="og:title" content="Daniel Lu | Portfolio" />
    <meta property="og:site_name" content="Daniellu" />
    <meta property="og:url" content="https://daniellu.ca/" />
    <meta
      property="og:description"
      content="Hey I'm Daniel, glad you're here!"
    />
    <meta property="og:type" content="profile" />
    <meta
      property="og:image"
      content="https://daniellu.ca/pfp.png"
    ></meta>
  </Head>
);
export default OpenGraphHead;
