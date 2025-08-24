import { useSelector } from "@xstate/react";
import { selectXTurn } from "../selectors/selectors";
import { useTicTacToeMultiActor } from "./useTicTacToeMultiActor";

export const useIsXTurn = () => {
  const actor = useTicTacToeMultiActor();
  if (!actor) {
    throw new Error("useIsXTurn must be used within a TicTacToeMultiProvider");
  }
  const isXTurn = useSelector(actor, selectXTurn);
  return isXTurn;
};
