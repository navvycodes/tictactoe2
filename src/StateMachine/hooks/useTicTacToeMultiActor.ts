import { useContext } from "react";
import { LocalTTTContext } from "../state/TicTacToeMultiProvider";

export const useTicTacToeMultiActor = () => {
  const actor = useContext(LocalTTTContext);
  if (!actor) {
    throw new Error(
      "useTicTacToeMultiActor must be used within a TicTacToeMultiProvider"
    );
  }
  return actor;
};
