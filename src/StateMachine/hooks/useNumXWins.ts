import { useSelector } from "@xstate/react";
import { useTicTacToeMultiActor } from "./useTicTacToeMultiActor";
import { selectXWins } from "../selectors/selectors";

export const useNumXWins = () => {
  const actor = useTicTacToeMultiActor();
  if (!actor) {
    throw new Error("useNumXWins must be used within a TicTacToeMultiProvider");
  }
  return useSelector(actor, selectXWins);
};
