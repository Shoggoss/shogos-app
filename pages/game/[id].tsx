import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Text,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ref, getDatabase, child, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObject, useObjectVal } from "react-firebase-hooks/database";
import { useMemo, useState } from "react";
import "../../lib/firebase";
import { GameEntryInput } from "../../components/GameEntryInput";
import { useClient } from "../../lib/useClient";
import { IoEllipse, IoEllipseOutline } from "react-icons/io5";
import { GameEntryName } from "../../components/GameEntryName";
import { GameEntry } from "../../components/GameEntry";
import { GameBoard } from "../../components/GameBoard";
import { IoEye } from "react-icons/io5";
import { UrlCopyInput } from "../../components/UrlCopyInput";
import { Helps } from "../../components/Helps";
import { HeadMeta } from "../../components/HeadMeta";

const gameRefs = (id: string) => {
  const db = getDatabase();
  const baseRef = ref(db, `games/${id}`);
  return {
    base: baseRef,
    white: child(baseRef, "white"),
    black: child(baseRef, "black"),
    items: child(baseRef, "items"),
    owns: {
      white: child(baseRef, `owns/white`),
      black: child(baseRef, `owns/black`),
    },
  };
};

type UserInfo = {
  uid: string;
  name: string;
};

const Game: NextPage = () => {
  const router = useRouter();
  const isClient = useClient();

  const [user, userLoading, userError] = useAuthState(getAuth());
  const refs = useMemo(
    () => gameRefs(router.query.id as string),
    [router.query.id],
  );
  const [white, whiteLoading, whiteError] = useObjectVal<UserInfo>(refs.white);
  const [black, blackLoading, blackError] = useObjectVal<UserInfo>(refs.black);
  const canModify =
    !!user && (user.uid === white?.uid || user.uid === black?.uid);

  const [viewSide, setViewSide] = useState<"white" | "black">("black");
  const [showHelp, { on, off }] = useBoolean(false);

  return (
    <Container size="container.lg">
      <HeadMeta title="????????? - ???????????????ShoGoSs??? online" />

      <HStack my="1">
        <Button onClick={() => router.push("/")} variant="link">
          ??????
        </Button>
        <Button onClick={on} variant="link">
          ?????????
        </Button>
        <Modal isOpen={showHelp} onClose={off} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>?????????</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Helps />
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
      <Heading size="lg">????????? - ???????????????ShoGoSs???</Heading>
      <Text mt="1">??????????????????????????????????????????</Text>
      <Text fontSize="xs">
        ??????????????????discord??????????????????????????????????????????????????????
      </Text>

      {isClient && (
        <InputGroup my="4">
          <InputLeftAddon>??????URL</InputLeftAddon>
          <UrlCopyInput />
        </InputGroup>
      )}

      {isClient && !!user && (
        <Grid templateColumns="1fr 1fr" gap="2">
          <VStack>
            <Text>
              <Icon as={IoEllipseOutline} />???
            </Text>
            <GameEntry
              value={white}
              dbRef={refs.white}
              uid={user.uid}
              loading={whiteLoading}
              _entryButton={{ colorScheme: "blackAlpha", variant: "outline" }}
            />
            <IconButton
              aria-label="show this side"
              colorScheme="blackAlpha"
              variant="outline"
              icon={<Icon as={IoEye} />}
              onClick={() => setViewSide("white")}
            />
          </VStack>
          <VStack>
            <Text>
              <Icon as={IoEllipse} />???
            </Text>
            <GameEntry
              value={black}
              dbRef={refs.black}
              uid={user.uid}
              loading={blackLoading}
              _entryButton={{ colorScheme: "blackAlpha", variant: "solid" }}
            />
            <IconButton
              aria-label="show this side"
              colorScheme="blackAlpha"
              variant="solid"
              icon={<Icon as={IoEye} />}
              onClick={() => setViewSide("black")}
            />
          </VStack>
        </Grid>
      )}
      <Center my="2">
        <Text fontSize="sm" textAlign="center">
          ??????????????????????????????????????????????????????????????????
          <br />
          ?????????????????????????????????
        </Text>
      </Center>
      {isClient && (
        <GameBoard
          mt="10"
          baseRef={refs.base}
          viewSide={viewSide}
          canModify={canModify}
        />
      )}
      {canModify && (
        <Center mt="32">
          <Button
            onClick={() =>
              confirm("????????????????????????????????????") &&
              confirm("??????????????????") &&
              remove(refs.items)
            }
          >
            ????????????
          </Button>
        </Center>
      )}
    </Container>
  );
};

export default Game;
