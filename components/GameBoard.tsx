import { Box, BoxProps, HStack } from "@chakra-ui/react";
import { DatabaseReference } from "firebase/database";
import { useLayoutEffect, useRef, useState } from "react";
import { range } from "../lib/range";
import { GameGrid } from "./GameGrid";
import { GameItem } from "./GameItem";

const items: {
  readonly name: string;
  readonly label: string | readonly [string, string];
  readonly nariLabel?: string;
  readonly pos: readonly [number, number];
  readonly type: "shogi" | "chess" | "go";
}[] = [
  ...range(9).map((i) => ({
    name: `po${i + 1}`,
    label: "ポ",
    pos: [i + 1, 3] as const,
    type: "shogi" as const,
    nariLabel: "と",
  })),
  { name: "king", label: "K", pos: [5, 1], type: "shogi" },
  { name: "kin1", label: "金", pos: [6, 1], type: "shogi" },
  { name: "kin2", label: "金", pos: [4, 1], type: "shogi" },
  { name: "gin1", label: "銀", pos: [7, 1], type: "shogi", nariLabel: "全" },
  { name: "gin2", label: "銀", pos: [3, 1], type: "shogi", nariLabel: "全" },
  { name: "kei1", label: "桂", pos: [8, 1], type: "shogi", nariLabel: "圭" },
  { name: "kei2", label: "桂", pos: [2, 1], type: "shogi", nariLabel: "圭" },
  { name: "kyo1", label: "香", pos: [9, 1], type: "shogi", nariLabel: "杏" },
  { name: "kyo2", label: "香", pos: [1, 1], type: "shogi", nariLabel: "杏" },
  { name: "queen", label: "♕", pos: [5, 2], type: "chess" },
  { name: "bishop1", label: "♗", pos: [7, 2], type: "chess" },
  { name: "bishop2", label: "♗", pos: [3, 2], type: "chess" },
  { name: "knight1", label: "♘", pos: [8, 2], type: "chess" },
  { name: "knight2", label: "♘", pos: [2, 2], type: "chess" },
  { name: "rook1", label: "♖", pos: [9, 2], type: "chess" },
  { name: "rook2", label: "♖", pos: [1, 2], type: "chess" },
  ...range(81).map((i) => ({
    name: `go${i + 1}`,
    label: "",
    pos: [11, -1] as const,
    type: "go" as const,
  })),
];

const actualItems = items.map((item) => ({
  ...item,
  pos: [(item.pos[0] - 0.5) / 9, (item.pos[1] - 0.5) / 9] as const,
}));

const inversedActualItems = actualItems.map((item) => ({
  ...item,
  pos: [1 - item.pos[0], 1 - item.pos[1]] as const,
}));

export const GameBoard = ({
  baseRef,
  viewSide,
  canModify,
  ...rest
}: BoxProps & {
  baseRef: DatabaseReference;
  viewSide?: "white" | "black";
  canModify: boolean;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const updateSize = (): void => {
      if (!gridRef.current) return;
      setScale(gridRef.current.offsetWidth);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <Box position="relative" {...rest}>
        <GameGrid ref={gridRef} />
        <Box position="absolute" top="0" left="0" w="100%" h="100%">
          {actualItems.map(({ name, label, nariLabel, pos, type }) => (
            <GameItem
              key={name}
              scale={scale}
              type={type}
              name={name}
              defaultPosition={pos}
              baseRef={baseRef}
              side="white"
              label={Array.isArray(label) ? label[0] : label}
              nariLabel={nariLabel}
              viewSide={viewSide}
              canModify={canModify}
            />
          ))}
          {inversedActualItems.map(({ name, label, nariLabel, pos, type }) => (
            <GameItem
              key={name}
              scale={scale}
              type={type}
              name={name}
              defaultPosition={pos}
              baseRef={baseRef}
              side="black"
              label={Array.isArray(label) ? label[1] : label}
              nariLabel={nariLabel}
              viewSide={viewSide}
              canModify={canModify}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
