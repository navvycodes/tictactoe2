import { useSelector } from "@xstate/react";
import { useTicTacToeMultiActor } from "./useTicTacToeMultiActor";
import { selectOWins } from "../selectors/selectors";

export const useNumOWins = () => {
  const actor = useTicTacToeMultiActor();
  if (!actor) {
    throw new Error("useNumOWins must be used within a TicTacToeMultiProvider");
  }
  return useSelector(actor, selectOWins);
};
