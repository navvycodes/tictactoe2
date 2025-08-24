// aiHelpers.ts
import type { Mark } from "../../types";

export const stateKey = (board: Mark[]) => board.join("");

export function weightedPick(list: { idx: number; w: number }[]): number {
  let sum = 0;
  for (const x of list) sum += x.w;
  if (sum <= 0) return list[0]?.idx ?? 0;
  let r = Math.random() * sum;
  for (const { idx, w } of list) {
    r -= w;
    if (r <= 0) return idx;
  }
  return list[list.length - 1].idx;
}

export function emptyIndices(board: Mark[]) {
  const out: number[] = [];
  for (let i = 0; i < 9; i++) if (board[i] === "_") out.push(i);
  return out;
}

const LINES = [
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
  return LINES.some((line) => line.every((i) => board[i] === m));
}

// quick heuristic: win if possible, else block, else center, else corner, else random
export function heuristicMove(board: Mark[], me: "x" | "o") {
  const opp: "x" | "o" = me === "x" ? "o" : "x";
  const empties = emptyIndices(board);

  // 1) can I win now?
  for (const i of empties) {
    const b = board.slice();
    b[i] = me;
    if (checkWin(b, me)) return i;
  }
  // 2) must I block?
  for (const i of empties) {
    const b = board.slice();
    b[i] = opp;
    if (checkWin(b, opp)) return i;
  }
  // 3) center
  if (board[4] === "_") return 4;
  // 4) a corner
  for (const i of [0, 2, 6, 8]) if (board[i] === "_") return i;
  // 5) random
  return empties[Math.floor(Math.random() * empties.length)];
}

// classic tic-tac-toe minimax (no FIFO rule)
function minimax(board: Mark[], me: "x" | "o", toMove: "x" | "o"): number {
  if (checkWin(board, me)) return 1;
  if (checkWin(board, me === "x" ? "o" : "x")) return -1;
  const empties = emptyIndices(board);
  if (empties.length === 0) return 0;

  if (toMove === me) {
    let best = -Infinity;
    for (const i of empties) {
      const b = board.slice();
      b[i] = toMove;
      best = Math.max(best, minimax(b, me, toMove === "x" ? "o" : "x"));
      if (best === 1) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of empties) {
      const b = board.slice();
      b[i] = toMove;
      best = Math.min(best, minimax(b, me, toMove === "x" ? "o" : "x"));
      if (best === -1) break;
    }
    return best;
  }
}

export function chooseMinimaxMove(board: Mark[], me: "x" | "o"): number {
  const empties = emptyIndices(board);
  let bestIdx = empties[0] ?? 0;
  let bestScore = -Infinity;
  for (const i of empties) {
    const b = board.slice();
    b[i] = me;
    const score = minimax(b, me, me === "x" ? "o" : "x");
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }
  return bestIdx;
}
