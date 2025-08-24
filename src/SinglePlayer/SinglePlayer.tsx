import { useMediaQuery, Stack, Box, Typography } from "@mui/material";
import { TicTacToeGrid } from "../common/TicTacToeGrid";
import { useGameBoard } from "../hooks/useGameBoard";
import { useNumOWins } from "../hooks/useNumOWins";
import { useNumXWins } from "../hooks/useNumXWins";
import { usePlacePiece } from "../hooks/usePlacePiece";
import { useWinner } from "../hooks/useWinner";
import { useEffect } from "react";
import { useIsSinglePlayerX } from "../hooks/useIsSinglePlayerX";
import { useIsXTurn } from "../hooks/useIsXTurn";
import { useSinglePlayerDifficulty } from "../hooks/useSinglePlayerDifficulty";
import { determineAIMove } from "./utils/determineAIMove";

export const SinglePlayer = () => {
  const gameBoard = useGameBoard();

  const { winner, combo } = useWinner();
  const { placePiece } = usePlacePiece();
  const numXWins = useNumXWins();
  const numOWins = useNumOWins();
  const landscape = useMediaQuery("(min-aspect-ratio: 1/1)");
  const isPlayerX = useIsSinglePlayerX();
  const isXTurn = useIsXTurn();
  const singlePlayerDifficulty = useSinglePlayerDifficulty();

  useEffect(() => {
    if (isPlayerX && !isXTurn && !winner) {
      const aiMove = determineAIMove(gameBoard, singlePlayerDifficulty, false);
      placePiece(aiMove);
    } else if (!isPlayerX && isXTurn) {
      const aiMove = determineAIMove(gameBoard, singlePlayerDifficulty, true);
      placePiece(aiMove);
    }
  }, [isPlayerX, isXTurn, gameBoard, winner]);
  return (
    <Stack
      direction={landscape ? "row" : "column"}
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

export default SinglePlayer;
