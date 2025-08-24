import { useTicTacToeMultiActor } from "./useTicTacToeMultiActor";

export const usePlacePiece = () => {
  const actor = useTicTacToeMultiActor();
  const placePiece = (index: number) => {
    actor.send({ type: "PLACE_AT", index });
  };
  return { placePiece };
};
