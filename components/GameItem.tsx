import { DatabaseReference, child, set } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { useCallback, useMemo } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { useLongPress } from "use-long-press";

const canTouch = typeof window !== "undefined" && "ontouchstart" in window;
export const GameItem = ({
  baseRef,
  scale,
  type,
  name,
  label,
  nariLabel,
  defaultPosition,
  side,
  viewSide,
  canModify,
}: {
  baseRef: DatabaseReference;
  scale: number;
  type: "shogi" | "chess" | "go";
  side: "white" | "black";
  name: string;
  label: string;
  nariLabel: string | undefined;
  defaultPosition: readonly [number, number];
  viewSide?: "white" | "black";
  canModify: boolean;
}) => {
  const refs = useMemo(
    () => ({
      position: child(baseRef, `items/${side}-${name}/position`),
      owner: child(baseRef, `items/${side}-${name}/owner`),
      nari: child(baseRef, `items/${side}-${name}/nari`),
    }),
    [baseRef, side, name],
  );

  const [position, positionLoading] = useObjectVal<
    { x: number; y: number } | undefined
  >(refs.position, {
    transform: (v) =>
      v
        ? { x: v[0] * scale, y: v[1] * scale }
        : { x: defaultPosition[0] * scale, y: defaultPosition[1] * scale },
  });
  const viewPosition = useMemo(() => {
    if (!position) return undefined;
    if (viewSide === "white")
      return { x: scale - position.x, y: scale - position.y };
    return position;
  }, [position, viewSide, scale]);
  const [owner, ownerLoading] = useObjectVal<boolean>(refs.owner, {
    transform: (v) => v ?? side === "black",
  });
  const direction = viewSide === "white" ? !owner : owner;
  const [nari, nariLoading] = useObjectVal<boolean>(refs.nari);
  const actualSide = type === "shogi" ? (owner ? "black" : "white") : side;

  const onDrag: DraggableEventHandler = useCallback(
    (_e, { x, y }) => {
      const pos = [x / scale, y / scale];
      if (viewSide === "white") (pos[0] = 1 - pos[0]), (pos[1] = 1 - pos[1]);
      set(refs.position, pos);
    },
    [refs.position, scale, viewSide],
  );
  const onToggleOwner = useCallback(
    (e?: { preventDefault(): unknown }) => {
      e?.preventDefault();
      set(refs.owner, !owner);
    },
    [refs.owner, owner],
  );
  const onToggleNari = useCallback(
    (e?: { preventDefault(): unknown }) => {
      e?.preventDefault();
      set(refs.nari, !nari);
    },
    [refs.nari, nari],
  );

  const [open, { on, off }] = useBoolean(false);
  const onToggleOwnerButton = useCallback(() => {
    onToggleOwner();
    off();
  }, [onToggleOwner, off]);
  const onToggleNariButton = useCallback(() => {
    onToggleNari();
    off();
  }, [onToggleNari, off]);
  const bind = useLongPress(on, { cancelOnMovement: true, threshold: 1200 });

  if (positionLoading || ownerLoading || nariLoading) return null;

  return (
    <>
      <Modal isOpen={open} onClose={off} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Button onClick={onToggleOwnerButton}>持ち主を変更</Button>
              <Button onClick={onToggleNariButton}>成る</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Draggable position={viewPosition} onDrag={onDrag}>
        <Box position="absolute" w="10%" userSelect="none">
          <Box
            borderRadius="full"
            border="1px solid black"
            bg={actualSide}
            color={actualSide === "white" ? "black" : "white"}
            sx={{ aspectRatio: "1/1" }}
            textAlign="center"
            cursor={canModify ? "grab" : "default"}
            pointerEvents={canModify ? undefined : "none"}
            transform="translate(-50%, -50%)"
            position="absolute"
            width="100%"
            fontSize={["xs", "md"]}
            onContextMenu={onToggleOwner}
            onDoubleClick={onToggleNari}
            {...(canTouch ? { ...bind() } : {})}
          >
            {type === "shogi" && (
              <Text
                as="span"
                position="absolute"
                w="100%"
                left="0"
                top="50%"
                transform={
                  direction
                    ? "translateY(-55%)"
                    : "translateY(-45%) rotate(180deg)"
                }
                fontSize="260%"
              >
                ☖
              </Text>
            )}
            <Text
              as="span"
              position="absolute"
              w="100%"
              left="0"
              top="50%"
              transform="translateY(-50%)"
              fontSize={type === "chess" ? "240%" : "100%"}
            >
              {nari && nariLabel ? nariLabel : label}
            </Text>
          </Box>
        </Box>
      </Draggable>
    </>
  );
};
