import { Box, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import type { Mark } from "../types";

const getDisplayValue = (v?: string) =>
  v === "x" ? "X" : v === "o" ? "O" : "";
const isWinningCell = (i: number, combo?: number[] | null) =>
  Array.isArray(combo) && combo.includes(i);

const baseCell = {
  width: "33%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "clamp(2rem, 10vmin, 4rem)",
  fontWeight: 800,
  letterSpacing: "0.06em",
  userSelect: "none",
} as const;

const pieceVariants = {
  initial: { scale: 0.6, y: -10, opacity: 0, filter: "blur(4px)" },
  enter: { scale: 1, y: 0, opacity: 1, filter: "blur(0px)" },
  exit: { scale: 0.8, y: 6, opacity: 0, filter: "blur(4px)" },
};

export function TicTacToeGrid({
  gameBoard,
  onCellClick,
  winner,
  winningCombo,
}: {
  gameBoard: string[];
  onCellClick: (index: number) => void;
  winner?: Mark | null;
  winningCombo?: number[] | null;
}) {
  const Cell = (i: number, withVerticalBorders?: boolean) => {
    const value = gameBoard[i];
    const playable = value === "_" && !winner;
    const isWin = !!winner && isWinningCell(i, winningCombo);
    const markColor =
      value === "x" ? "#60a5fa" : value === "o" ? "#f472b6" : "#e5e7eb";

    return (
      <Box
        key={`${i}-${"none"}`}
        component={motion.div}
        onClick={() => onCellClick(i)}
        whileTap={playable ? { scale: 0.98 } : undefined}
        animate={
          isWin
            ? {
                textShadow: [
                  "0 0 0 rgba(0,0,0,0)",
                  "0 0 18px rgba(99,102,241,0.55)",
                  "0 0 0 rgba(0,0,0,0)",
                ],
                boxShadow: [
                  "inset 0 0 0 rgba(99,102,241,0)",
                  "inset 0 0 30px rgba(99,102,241,0.35)",
                  "inset 0 0 0 rgba(99,102,241,0)",
                ],
                scale: [1, 1, 1],
              }
            : { textShadow: "none", boxShadow: "none", scale: 1 }
        }
        transition={{
          duration: 0.7,
          ease: "easeInOut",
          repeat: isWin ? Infinity : 0,
          repeatDelay: 0.5,
        }}
        sx={{
          ...baseCell,
          cursor: "pointer",
          color: markColor,
          borderLeft: withVerticalBorders
            ? "2px solid rgba(147,197,253,0.45)"
            : "none",
          borderRight: withVerticalBorders
            ? "2px solid rgba(147,197,253,0.45)"
            : "none",
          background:
            "radial-gradient(120% 120% at 50% 50%, rgba(30,41,59,0.0) 0%, rgba(30,41,59,0.35) 100%)",
          backdropFilter: "blur(2px)",
          opacity: winner ? (isWin ? 1 : 0.45) : 1,
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          {value !== "_" && (
            <Box
              component={motion.div}
              key={`${value}-${i}-${value}`}
              variants={pieceVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.6,
              }}
              sx={{
                color: markColor,
                textShadow:
                  "0 0 10px rgba(255,255,255,0.15), 0 0 24px rgba(99,102,241,0.25)",
              }}
            >
              {getDisplayValue(value)}
            </Box>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {value !== "_" && (
            <Box
              component={motion.span}
              key={`ripple-${i}-${value}`}
              initial={{ opacity: 0.35, scale: 0 }}
              animate={{ opacity: 0, scale: 2.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              sx={{
                position: "absolute",
                inset: "calc(50% - 10px)",
                width: 20,
                height: 20,
                borderRadius: "999px",
                boxShadow: `0 0 0 2px ${markColor}`,
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>
      </Box>
    );
  };

  return (
    <Stack
      sx={{
        position: "relative",
        display: "flex",
        width: "max(34vw, 34vh)",
        height: "max(34vw, 34vh)",
        minWidth: 350,
        minHeight: 350,
        maxWidth: 820,
        maxHeight: 820,
        borderRadius: 4,
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(2,6,23,0.9) 0%, rgba(10,10,17,0.9) 100%)",
        boxShadow:
          "0 0 0 1px rgba(99,102,241,0.25), 0 18px 65px rgba(56,189,248,0.15)",
      }}
      className="tic-tac-toe-grid"
      component={motion.div}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "33.33%",
          borderBottom: "2px solid rgba(147,197,253,0.45)",
        }}
      >
        {Cell(0, false)}
        {Cell(1, true)}
        {Cell(2, false)}
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "33.33%",
          borderBottom: "2px solid rgba(147,197,253,0.45)",
        }}
      >
        {Cell(3, false)}
        {Cell(4, true)}
        {Cell(5, false)}
      </Box>

      <Box sx={{ display: "flex", width: "100%", height: "33.33%" }}>
        {Cell(6, false)}
        {Cell(7, true)}
        {Cell(8, false)}
      </Box>
    </Stack>
  );
}
