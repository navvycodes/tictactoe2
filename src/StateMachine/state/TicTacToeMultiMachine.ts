// TicTacToeLocalMachine.ts
import { setup, assign } from "xstate";
import type { Mark } from "../../utils/types";
import { boardFull, checkWin, legal } from "../../utils/helpers";

export interface TicTacToeContext {
  board: Mark[]; // length 9
  xQueue: number[]; // X FIFO (max 3)
  oQueue: number[]; // O FIFO (max 3)
  xTurn: boolean; // true => X to move
  winner: Mark | null; // "x" | "o" | null
  numXWins: number;
  numOWins: number;
  // Single Player States
  singlePlayerIsX: boolean;
  singlePlayerDifficulty: "easy" | "medium" | "hard";
  singlePlayerThinkMs: number;
}
type UpdateSinglePlayerSettingsEvent = {
  type: "UPDATE_SINGLE_PLAYER_SETTINGS";
  settings: {
    singlePlayerIsX: boolean;
    singlePlayerDifficulty: "easy" | "medium" | "hard";
    singlePlayerThinkMs: number;
  };
};
type PlaceAtEvent = { type: "PLACE_AT"; index: number };
type ResetGameEvent = { type: "RESET_GAME" };

export type GameEvent =
  | PlaceAtEvent
  | ResetGameEvent
  | UpdateSinglePlayerSettingsEvent;

/** Apply FIFO eviction after 3 pieces, flip turn, return next partial context */
function applyMove(ctx: TicTacToeContext, index: number) {
  const mark: "x" | "o" = ctx.xTurn ? "x" : "o";
  const board = ctx.board.slice();
  const xQueue = ctx.xQueue.slice();
  const oQueue = ctx.oQueue.slice();

  board[index] = mark;
  if (mark === "x") {
    if (xQueue.length === 3) {
      const oldest = xQueue.shift()!;
      board[oldest] = "_";
    }
    xQueue.push(index);
  } else {
    if (oQueue.length === 3) {
      const oldest = oQueue.shift()!;
      board[oldest] = "_";
    }
    oQueue.push(index);
  }

  return { board, xQueue, oQueue, xTurn: !ctx.xTurn as boolean };
}

export const TicTacToeMultiMachine = setup({
  types: {
    context: {} as TicTacToeContext,
    events: {} as GameEvent,
  },

  actions: {
    updateSinglePlayerSettings: assign(({ context, event }) => {
      if (event.type !== "UPDATE_SINGLE_PLAYER_SETTINGS") return context;
      if (!event.settings) return context;
      if (event.settings.singlePlayerIsX === undefined) return context;
      if (event.settings.singlePlayerDifficulty === undefined) return context;
      if (event.settings.singlePlayerThinkMs === undefined) return context;
      return {
        ...context,
        singlePlayerIsX: event.settings.singlePlayerIsX,
        singlePlayerDifficulty: event.settings.singlePlayerDifficulty,
        singlePlayerThinkMs: event.settings.singlePlayerThinkMs,
      };
    }),
    placeAt: assign(({ context, event }) => {
      if (event.type !== "PLACE_AT") return context;

      const idx = event.index;

      if (!legal(context.board, idx) || context.winner) return context;

      const next = applyMove(context, idx);
      const mover: Mark = context.xTurn ? "x" : "o";
      const maybeWinner = checkWin(next.board, mover) ? mover : null;
      if (maybeWinner) {
        if (maybeWinner === "x") {
          context.numXWins += 1;
        } else if (maybeWinner === "o") {
          context.numOWins += 1;
        }
      }

      return { ...context, ...next, winner: maybeWinner };
    }),

    resetGame: assign({
      board: () => Array<Mark>(9).fill("_"),
      xQueue: () => [],
      oQueue: () => [],
      xTurn: () => true,
      winner: () => null,
    }),
  },

  guards: {
    hasWinner: ({ context }) =>
      context.winner != null ||
      checkWin(context.board, "x") ||
      checkWin(context.board, "o"),
    isDraw: ({ context }) =>
      boardFull(context.board) &&
      !checkWin(context.board, "x") &&
      !checkWin(context.board, "o"),
    canPlace: ({ context, event }) =>
      event.type === "PLACE_AT" &&
      legal(context.board, event.index) &&
      !context.winner,
  },
}).createMachine({
  id: "TicTacToeMulti",
  initial: "playing",
  context: {
    board: Array<Mark>(9).fill("_"),
    xQueue: [],
    oQueue: [],
    xTurn: true,
    winner: null,
    numXWins: 0,
    numOWins: 0,
    singlePlayerIsX: true,
    singlePlayerDifficulty: "easy",
    singlePlayerThinkMs: 1000,
  },

  states: {
    playing: {
      initial: "play",
      on: {
        RESET_GAME: { actions: "resetGame", target: "playing.play" },
      },
      states: {
        play: {
          on: {
            UPDATE_SINGLE_PLAYER_SETTINGS: {
              actions: ["updateSinglePlayerSettings", "resetGame"],
              target: "play",
            },
            PLACE_AT: [
              { guard: "canPlace", actions: "placeAt", target: "check" },
            ],
          },
        },
        check: {
          always: [
            { guard: "hasWinner", target: "#TicTacToeMulti.results" },
            { guard: "isDraw", target: "#TicTacToeMulti.results" },
            { target: "play" },
          ],
        },
      },
    },

    results: {
      on: {
        UPDATE_SINGLE_PLAYER_SETTINGS: {
          actions: ["updateSinglePlayerSettings", "resetGame"],
          target: "playing",
        },
        PLACE_AT: {
          actions: ["resetGame", "placeAt"],
          target: "playing.check",
        },
        RESET_GAME: { target: "playing" },
      },
    },
  },
});
