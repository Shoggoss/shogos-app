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
        <title>ShoGoSs online</title>
        <meta name="description" content="ShoGoSs online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading>ShoGoSs</Heading>
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
    </Container>
  );
};

export default Home;
