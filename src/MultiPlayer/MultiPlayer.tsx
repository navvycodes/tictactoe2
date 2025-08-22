import { Stack } from "@mui/material";
import { TicTacToeGrid } from "../common/TicTacToeGrid";

export const MultiPlayer = () => {
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      height={"100vh"}
    >
      <TicTacToeGrid />
    </Stack>
  );
};
