import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

import { TicTacToeGrid } from "../CommonComponents/TicTacToeGrid";
import { useGameBoard } from "../StateMachine/hooks/useGameBoard";
import { usePlacePiece } from "../StateMachine/hooks/usePlacePiece";
import { useWinner } from "../StateMachine/hooks/useWinner";
import { useNumOWins } from "../StateMachine/hooks/useNumOWins";
import { useNumXWins } from "../StateMachine/hooks/useNumXWins";

export const MultiPlayer = () => {
  const gameBoard = useGameBoard();

  const { winner, combo } = useWinner();
  const { placePiece } = usePlacePiece();
  const numXWins = useNumXWins();
  const numOWins = useNumOWins();
  const landscape = useMediaQuery("(min-aspect-ratio: 1/1)");
  return (
    <Stack
      direction={landscape ? "row" : "column"} // row if wide, col if tall
      spacing={landscape ? 4 : 2}
      gap={landscape ? 4 : 2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      height={"100vh"}
      width={"100vw"}
    >
      <TicTacToeGrid
        gameBoard={gameBoard}
        onCellClick={placePiece}
        winner={winner}
        winningCombo={combo}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={10}
        sx={{
          border: "2px solid #e5e7eb",
          borderRadius: 8,
          padding: 2,
          minWidth: 200,
          background: "rgba(30,41,59,0.7)",
        }}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Stack textAlign="center">
            <Typography
              sx={{
                color: "#60a5fa",
                fontWeight: 700,
                fontSize: "1.2rem",
                textDecoration: "underline",
              }}
            >
              {"X Wins"}
            </Typography>
            <Typography
              sx={{ color: "#60a5fa", fontWeight: 500, fontSize: "1.1rem" }}
            >
              {numXWins}
            </Typography>
          </Stack>

          <Stack textAlign="center">
            <Typography
              sx={{
                color: "#f43f5e",
                fontWeight: 700,
                fontSize: "1.2rem",
                textDecoration: "underline",
              }}
            >
              {"O Wins"}
            </Typography>
            <Typography
              sx={{ color: "#f43f5e", fontWeight: 500, fontSize: "1.1rem" }}
            >
              {numOWins}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};
