import Head from "next/head";

export const HeadMeta = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
        sizes="180x180"
      />
      <meta name="description" content="将棋＋囲碁＋チェスの異種格闘ゲーム" />
      <meta property="og:title" content="しょ碁ス（ShoGoSs） online" />
      <meta
        property="og:description"
        content="将棋＋囲碁＋チェスの異種格闘ゲーム"
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:image" content="https://shogos-app.web.app/ogp.png" />
      <meta property="og:site_name" content="しょ碁ス（ShoGoSs） online" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@oga_pleconia" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-title"
        content="しょ碁ス（ShoGoSs） online"
      />
      <link rel="manifest" href="/shogoss.webmanifest" />
    </Head>
  );
};
