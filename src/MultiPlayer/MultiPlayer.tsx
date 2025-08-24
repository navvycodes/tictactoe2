import { Stack } from "@mui/material";
import { TicTacToeGrid } from "../common/TicTacToeGrid";
import { useGameBoard } from "./hooks/useGameBoard";
import { usePlacePiece } from "./hooks/usePlacePiece";
import { useWinner } from "./hooks/useWinner";

export const MultiPlayer = () => {
  const gameBoard = useGameBoard();
  const { winner, combo } = useWinner();
  const { placePiece } = usePlacePiece();
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      height={"100vh"}
    >
      <TicTacToeGrid
        gameBoard={gameBoard}
        onCellClick={placePiece}
        winner={winner}
        winningCombo={combo}
      />
    </Stack>
  );
};
