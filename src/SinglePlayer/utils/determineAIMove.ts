import type { Mark } from "../../types";

export const determineAIMove = (
  gameBoard: Mark[],
  playerDifficulty: "easy" | "medium" | "hard",
  aiIsX: boolean
): number => {
  switch (playerDifficulty) {
    case "easy":
      // Easy AI makes random moves
      const emptyIndices = gameBoard
        .map((mark, idx) => (mark === "_" ? idx : -1))
        .filter((idx) => idx !== -1);
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    case "medium":
      return 0;
    case "hard":
      return 0;
  }
};
