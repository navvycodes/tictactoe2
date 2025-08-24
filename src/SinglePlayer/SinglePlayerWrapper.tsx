import { useEffect } from "react";
import { TicTacToeMultiProvider } from "../state/TicTacToeMultiProvider";
import SinglePlayer from "./SinglePlayer";
import { initPolicy } from "./utils/aiPolicy";

export const SinglePlayerWrapper = () => {
  useEffect(() => {
    initPolicy();
  }, []);
  return (
    <TicTacToeMultiProvider>
      <SinglePlayer />
    </TicTacToeMultiProvider>
  );
};
