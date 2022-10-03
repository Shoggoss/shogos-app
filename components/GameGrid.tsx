import { forwardRef, Grid, GridItem, GridProps } from "@chakra-ui/react";
import { range } from "../lib/range";

export const GameGrid = forwardRef<GridProps, "div">((props, ref) => {
  return (
    <Grid
      ref={ref}
      templateRows="repeat(9, 1fr)"
      templateColumns="repeat(9, 1fr)"
      gap="0"
      bg="white"
      border="1px solid black"
      sx={{ aspectRatio: "1/1" }}
      {...props}
    >
      {range(9 * 9).map((i) => (
        <GridItem
          key={i}
          sx={{ aspectRatio: "1/1" }}
          border="1px solid black"
        />
      ))}
    </Grid>
  );
});
