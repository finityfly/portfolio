import Head from "next/head";

interface OpenGraphHeadProps {
  title?: string;
  path?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  noIndex?: boolean;
}

const SITE_NAME = "Daniel Lu";
const SITE_URL = "https://daniellu.ca";
const DEFAULT_TITLE = "Daniel Lu";

const toAbsoluteUrl = (value: string): string => {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalizedValue = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_URL}${normalizedValue}`;
};

const OpenGraphHead = ({
  title = DEFAULT_TITLE,
  path = "/",
  type = "website",
  publishedTime,
  noIndex = false,
}: OpenGraphHeadProps) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = toAbsoluteUrl(normalizedPath);
  const normalizedTitle = title.trim();

  return (
    <Head>
      <title>{normalizedTitle}</title>
      <meta
        name="robots"
        content={noIndex ? "noindex,nofollow" : "index,follow"}
        key="robots"
      />
      <link rel="canonical" href={canonicalUrl} key="canonical" />

      <meta property="og:locale" content="en_CA" key="og:locale" />
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
      <meta property="og:title" content={normalizedTitle} key="og:title" />
      <meta property="og:url" content={canonicalUrl} key="og:url" />

      {type === "article" && publishedTime ? (
        <meta
          property="article:published_time"
          content={publishedTime}
          key="article:published_time"
        />
      ) : null}

      <meta name="twitter:card" content="summary" key="twitter:card" />
      <meta name="twitter:title" content={normalizedTitle} key="twitter:title" />
    </Head>
  );
};

export default OpenGraphHead;
