// determineAIMove.ts
import type { Mark } from "../../types";
import { getPolicy } from "./aiPolicy";
import {
  stateKey,
  weightedPick,
  emptyIndices,
  heuristicMove,
  chooseMinimaxMove,
} from "./helpers";

export const determineAIMove = (
  gameBoard: Mark[],
  playerDifficulty: "easy" | "medium" | "hard",
  aiIsX: boolean
): number => {
  const me: "x" | "o" = aiIsX ? "x" : "o";

  // EASY: random
  if (playerDifficulty === "easy") {
    const empties = emptyIndices(gameBoard);
    return empties[Math.floor(Math.random() * empties.length)];
  }

  // MEDIUM: use policy if present; else heuristic; fallback random
  if (playerDifficulty === "medium") {
    const policy = getPolicy();
    if (policy) {
      const key = stateKey(gameBoard);
      const list = policy[key];
      if (list?.length) {
        return weightedPick(list);
      }
    }
    // heuristic fallback
    return heuristicMove(gameBoard, me);
  }

  // HARD: minimax (classic tic-tac-toe). If your variant is FIFO, see note below.
  if (playerDifficulty === "hard") {
    return chooseMinimaxMove(gameBoard, me);
  }

  // default safety
  const empties = emptyIndices(gameBoard);
  return empties[Math.floor(Math.random() * empties.length)];
};
