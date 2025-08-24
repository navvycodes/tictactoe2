import { useSelector } from "@xstate/react";
import { useTicTacToeMultiActor } from "./useTicTacToeMultiActor";
import { selectSinglePlayerThinkMs } from "../selectors/selectors";

export const useSinglePlayerThinkMs = () => {
  const actor = useTicTacToeMultiActor();
  if (!actor) {
    throw new Error(
      "useSinglePlayerThinkMs must be used within a TicTacToeMultiProvider"
    );
  }

  return useSelector(actor, selectSinglePlayerThinkMs);
};
