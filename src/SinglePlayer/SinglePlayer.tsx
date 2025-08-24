import { useMediaQuery, Stack, Box, Typography, Button } from "@mui/material";
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
import { useState } from "react";
import { SinglePlayerSettingsDialog } from "./SinglePlayerSettingsDialog";
import { useUpdateSettings } from "../StateMachine/hooks/useSaveNewSettings";

export const SinglePlayer = () => {
  const gameBoard = useGameBoard();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { winner, combo } = useWinner();
  const { placePiece } = usePlacePiece();
  const numXWins = useNumXWins();
  const numOWins = useNumOWins();
  const landscape = useMediaQuery("(min-aspect-ratio: 1/1)");
  const isPlayerX = useIsSinglePlayerX();
  const isXTurn = useIsXTurn();
  const singlePlayerDifficulty = useSinglePlayerDifficulty();
  const updateSettings = useUpdateSettings();

  const placePiecePassThrough = (index: number) => {
    if (isPlayerX && isXTurn) {
      placePiece(index);
    } else if (!isPlayerX && !isXTurn) {
      placePiece(index);
    }
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    console.log("AI THINKING");
    if (isPlayerX && !isXTurn && !winner) {
      timeout = setTimeout(() => {
        const aiMove = determineAIMove(
          gameBoard,
          singlePlayerDifficulty,
          false
        );
        placePiece(aiMove);
      }, 1000);
    } else if ((!isPlayerX && isXTurn) || (winner && !isPlayerX)) {
      timeout = setTimeout(() => {
        const aiMove = determineAIMove(gameBoard, singlePlayerDifficulty, true);
        placePiece(aiMove);
      }, 1000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
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
      <SinglePlayerSettingsDialog
        open={settingsOpen}
        value={{
          difficulty: singlePlayerDifficulty,
          side: isPlayerX ? "x" : "o",
          thinkMs: 1000,
        }}
        onSave={(v) => {
          // Handle save
          updateSettings({
            isPlayerX: v.side === "x",
            difficulty: v.difficulty,
            thinkMs: v.thinkMs,
          });
          setSettingsOpen(false);
        }}
        onClose={() => setSettingsOpen(false)}
      />
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
        <Box>
          <Typography variant="body2" sx={{ color: "#E5E7EB" }}>
            {isPlayerX ? "You are X" : "You are O"}
          </Typography>
        </Box>
        <Button onClick={() => setSettingsOpen(true)}> Settings </Button>
      </Box>
    </Stack>
  );
};

export default SinglePlayer;
