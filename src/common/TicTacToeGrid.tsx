import { Box, Stack } from "@mui/material";
import type { Mark } from "../types";

const cellStyle = {
  width: "33%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  "&.middleCell": {
    borderLeft: "2px solid #000",
    borderRight: "2px solid #000",
  },
};

const getDisplayValue = (value?: string) => {
  if (value === "x") return "X";
  if (value === "o") return "O";
  return "";
};

export const TicTacToeGrid = ({
  gameBoard,
  onCellClick,
  winner,
  winningCombo,
}: {
  gameBoard: string[];
  onCellClick: (index: number) => void;
  winner?: Mark | null;
  winningCombo?: number[] | null;
}) => {
  return (
    <Stack
      sx={{
        display: "flex",
        width: "max(30vw, 30vh)",
        height: "max(30vw, 30vh)",
        minWidth: "300px",
        minHeight: "300px",
        maxWidth: "800px",
        maxHeight: "800px",
      }}
      className="tic-tac-toe-grid"
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "33.33%",
          borderBottom: "2px solid #000",
        }}
      >
        <Box
          sx={{
            ...cellStyle,
          }}
          onClick={() => onCellClick(0)}
        >
          {getDisplayValue(gameBoard[0])}
        </Box>
        <Box
          sx={{
            ...cellStyle,
          }}
          className="middleCell"
          onClick={() => onCellClick(1)}
        >
          {getDisplayValue(gameBoard[1])}
        </Box>
        <Box sx={{ ...cellStyle }} onClick={() => onCellClick(2)}>
          {getDisplayValue(gameBoard[2])}
        </Box>
      </Box>

      {/* Row 1 */}
      <Box sx={{ display: "flex", width: "100%", height: "33.33%" }}>
        <Box
          sx={{
            ...cellStyle,
          }}
          onClick={() => onCellClick(3)}
        >
          {getDisplayValue(gameBoard[3])}
        </Box>
        <Box
          sx={{
            ...cellStyle,
          }}
          className="middleCell"
          onClick={() => onCellClick(4)}
        >
          {getDisplayValue(gameBoard[4])}
        </Box>
        <Box sx={{ ...cellStyle }} onClick={() => onCellClick(5)}>
          {getDisplayValue(gameBoard[5])}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "33.33%",
          borderTop: "2px solid #000",
        }}
      >
        <Box sx={{ ...cellStyle }} onClick={() => onCellClick(6)}>
          {getDisplayValue(gameBoard[6])}
        </Box>
        <Box
          sx={{ ...cellStyle }}
          className="middleCell"
          onClick={() => onCellClick(7)}
        >
          {getDisplayValue(gameBoard[7])}
        </Box>
        <Box sx={{ ...cellStyle }} onClick={() => onCellClick(8)}>
          {getDisplayValue(gameBoard[8])}
        </Box>
      </Box>
    </Stack>
  );
};
