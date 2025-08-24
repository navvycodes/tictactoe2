import { useSelector } from "@xstate/react";
import { selectIsPlayerX } from "../selectors/selectors";
import { useTicTacToeMultiActor } from "./useTicTacToeMultiActor";

export const useIsSinglePlayerX = () => {
  const actor = useTicTacToeMultiActor();
  if (!actor) {
    throw new Error(
      "useIsSinglePlayerX must be used within a TicTacToeMultiProvider"
    );
  }
  const isPlayerX = useSelector(actor, selectIsPlayerX);
  return isPlayerX;
};
