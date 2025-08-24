import { useSelector } from "@xstate/react";
import { selectSinglePlayerDifficulty } from "../selectors/selectors";
import { useTicTacToeMultiActor } from "./useTicTacToeMultiActor";

export const useSinglePlayerDifficulty = () => {
  const actor = useTicTacToeMultiActor();
  if (!actor) {
    throw new Error(
      "useSinglePlayerDifficulty must be used within a TicTacToeMultiProvider"
    );
  }
  const difficulty = useSelector(actor, selectSinglePlayerDifficulty);
  return difficulty;
};
