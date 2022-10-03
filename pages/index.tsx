import { Button, Container, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Helps } from "../components/Helps";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Container>
      <Head>
        <title>しょ碁ス（ShoGoSs） online</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="将棋＋囲碁＋チェスの異種格闘ゲーム" />
        <meta property="og:title" content="しょ碁ス（ShoGoSs） online" />
        <meta
          property="og:description"
          content="将棋＋囲碁＋チェスの異種格闘ゲーム"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        <meta
          property="og:image"
          content="https://shogos-app.web.app/ogp.png"
        />
        <meta property="og:site_name" content="しょ碁ス（ShoGoSs） online" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@oga_pleconia" />
      </Head>

      <Heading my="1">しょ碁ス（ShoGoSs） online</Heading>
      <Button
        mt="4"
        onClick={() =>
          router.push({
            pathname: `/game/${Date.now()}-${Math.round(
              Math.random() * 1000000,
            )}`,
          })
        }
      >
        新しいゲーム
      </Button>

      <Helps mt="4" />
    </Container>
  );
};

export default Home;
