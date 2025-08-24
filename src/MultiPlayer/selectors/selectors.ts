import { WIN_LINES } from "../../helpers";
import type { TicTacToeContext } from "../state/TicTacToeMultiMachine";

export const selectGameBoard = ({ context }: { context: TicTacToeContext }) =>
  context.board;

export const selectWinner = ({ context }: { context: TicTacToeContext }) => {
  return {
    winner: context.winner,
    combo: context.winner
      ? WIN_LINES.find((combination) =>
          combination.every((index) => context.board[index] === context.winner)
        )
      : null,
  };
};

export const selectXWins = ({ context }: { context: TicTacToeContext }) => {
  return context.numXWins;
};
export const selectOWins = ({ context }: { context: TicTacToeContext }) => {
  return context.numOWins;
};
