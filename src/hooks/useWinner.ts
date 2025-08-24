import { useTicTacToeMultiActor } from "./useTicTacToeMultiActor";
import { useSelector } from "@xstate/react";
import { selectWinner } from "../selectors/selectors";

export const useWinner = () => {
  const actor = useTicTacToeMultiActor();
  if (!actor) {
    throw new Error("useWinner must be used within a TicTacToeMultiProvider");
  }
  return useSelector(actor, selectWinner);
};
