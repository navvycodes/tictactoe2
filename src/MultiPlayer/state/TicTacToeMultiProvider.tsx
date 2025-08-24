import { Actor } from "xstate";
import { TicTacToeMultiMachine } from "./TicTacToeMultiMachine";
import React from "react";
import { useActorRef } from "@xstate/react";

type TTTMachineType = typeof TicTacToeMultiMachine;
type TTTContextValue = Actor<TTTMachineType>;
export const LocalTTTContext = React.createContext<TTTContextValue | null>(
  null
);

export const TicTacToeMultiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const actorRef = useActorRef(TicTacToeMultiMachine);
  return (
    <LocalTTTContext.Provider value={actorRef}>
      {children}
    </LocalTTTContext.Provider>
  );
};
