import { useMediaQuery, Stack, Box, Typography } from "@mui/material";
import { TicTacToeGrid } from "../Common/TicTacToeGrid";
import { useGameBoard } from "../StateMachine/hooks/useGameBoard";
import { useNumOWins } from "../StateMachine/hooks/useNumOWins";
import { useNumXWins } from "../StateMachine/hooks/useNumXWins";
import { usePlacePiece } from "../StateMachine/hooks/usePlacePiece";
import { useWinner } from "../StateMachine/hooks/useWinner";
import { useEffect } from "react";
import { useIsSinglePlayerX } from "../StateMachine/hooks/useIsSinglePlayerX";
import { useIsXTurn } from "../StateMachine/hooks/useIsXTurn";
import { useSinglePlayerDifficulty } from "../StateMachine/hooks/useSinglePlayerDifficulty";
import { determineAIMove } from "./utils/GameAI/determineAIMove";

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

  const placePiecePassThrough = (index: number) => {
    if (isPlayerX && isXTurn) {
      placePiece(index);
    } else if (!isPlayerX && !isXTurn) {
      placePiece(index);
    }
  };
  // ...existing code...
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (isPlayerX && !isXTurn && !winner) {
      timeout = setTimeout(() => {
        const aiMove = determineAIMove(
          gameBoard,
          singlePlayerDifficulty,
          false
        );
        placePiece(aiMove);
      }, 1000);
    } else if (!isPlayerX && isXTurn) {
      timeout = setTimeout(() => {
        const aiMove = determineAIMove(gameBoard, singlePlayerDifficulty, true);
        placePiece(aiMove);
      }, 1000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isPlayerX, isXTurn, gameBoard, winner]);
  // ...existing code...
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
        onCellClick={placePiecePassThrough}
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
