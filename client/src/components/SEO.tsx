import Head from "next/head";

const SEO = ({ title }: { title?: string }) => {
  const titleWithBranding = `${title} - Amplifier`;
  return (
    <Head>
      {title ? <title>{titleWithBranding}</title> : <title>Amplifier - Amplify your Podcast Experience</title>}
      {title ? <meta name="description" content={titleWithBranding} /> : <meta name="description" content="Amplifier" />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:site_name" content="Amplifier" />
      <link rel="icon" href="/fav.ico" />
    </Head>
  );
};

export default SEO;
