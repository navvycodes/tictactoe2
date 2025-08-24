import { useTicTacToeMultiActor } from "./useTicTacToeMultiActor";

export const useUpdateSettings = () => {
  const actor = useTicTacToeMultiActor();
  if (!actor) {
    throw new Error(
      "useUpdateSettings must be used within a TicTacToeMultiProvider"
    );
  }
  const updateSettings = ({
    isPlayerX,
    difficulty,
    thinkMs,
  }: {
    isPlayerX: boolean;
    difficulty: "easy" | "medium" | "hard";
    thinkMs: number;
  }) => {
    actor.send({
      type: "UPDATE_SINGLE_PLAYER_SETTINGS",
      settings: {
        singlePlayerIsX: isPlayerX,
        singlePlayerDifficulty: difficulty,
        singlePlayerThinkMs: thinkMs,
      },
    });
  };

  return updateSettings;
};
