import { MultiPlayer } from "./MultiPlayer";
import { TicTacToeMultiProvider } from "./state/TicTacToeMultiProvider";

export const MultiPlayerWrapper = () => {
  return (
    <TicTacToeMultiProvider>
      <MultiPlayer />
    </TicTacToeMultiProvider>
  );
};
