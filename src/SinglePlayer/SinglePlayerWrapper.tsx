import { TicTacToeMultiProvider } from "../state/TicTacToeMultiProvider";
import SinglePlayer from "./SinglePlayer";

export const SinglePlayerWrapper = () => {
  return (
    <TicTacToeMultiProvider>
      <SinglePlayer />
    </TicTacToeMultiProvider>
  );
};
