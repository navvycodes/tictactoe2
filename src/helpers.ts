import type { Mark } from "./types";

/* ---------- Helpers ---------- */
export const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWin(board: Mark[], m: "x" | "o") {
  return WIN_LINES.some((line) => line.every((i) => board[i] === m));
}
export function boardFull(board: Mark[]) {
  return board.every((c) => c !== "_");
}
export function legal(board: Mark[], i: number) {
  return i >= 0 && i < 9 && board[i] === "_";
}
