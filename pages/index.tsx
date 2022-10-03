import { Button, Center, Container, Heading, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { HeadMeta } from "../components/HeadMeta";
import { Helps } from "../components/Helps";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Container>
      <HeadMeta title="しょ碁ス（ShoGoSs） online" />

      <Heading my="1">しょ碁ス（ShoGoSs） online</Heading>
      <Center>
        <Image src="/icon_192.png" alt="" />
      </Center>
      <Center>
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
      </Center>

      <Helps mt="4" />
    </Container>
  );
};

export default Home;
