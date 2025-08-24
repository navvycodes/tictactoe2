import { useSelector } from "@xstate/react";
import { selectGameBoard } from "../selectors/selectors";
import { useTicTacToeMultiActor } from "./useTicTacToeMultiActor";

export const useGameBoard = () => {
  const actor = useTicTacToeMultiActor();
  if (!actor) {
    throw new Error(
      "useGameBoard must be used within a TicTacToeMultiProvider"
    );
  }
  return useSelector(actor, selectGameBoard);
};
