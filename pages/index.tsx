import { Button, Container, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Container>
      <Head>
        <title>Shogos test</title>
        <meta name="description" content="Shogos test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading>Shogos</Heading>
      <Button
        mt="4"
        onClick={() =>
          router.push({
            pathname: `/game/${Math.round(Math.random() * 1000000)}`,
          })
        }
      >
        新しいゲーム
      </Button>
    </Container>
  );
};

export default Home;
