import { useEffect } from "react";
import { TicTacToeMultiProvider } from "../StateMachine/state/TicTacToeMultiProvider";
import SinglePlayer from "./SinglePlayer";
import { initPolicy } from "./utils/GameAI/aiPolicy";
import { IconButton, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";
import { useNavigate } from "react-router";
import { GameInstructionsDialog } from "../CommonComponents/GameInstructionsDialog";
import { getShowInstructions } from "../utils/localStorageHelpers";

export const SinglePlayerWrapper = () => {
  const showOnInitialLoad = getShowInstructions();
  const [showExplanation, setShowExplanation] = useState(showOnInitialLoad);

  const navigate = useNavigate();

  useEffect(() => {
    initPolicy();
  }, []);
  return (
    <TicTacToeMultiProvider>
      <GameInstructionsDialog
        open={showExplanation}
        handleClose={() => setShowExplanation(false)}
      />
      <Tooltip title="Home">
        <IconButton
          onClick={() => {
            // Navigate to home
            navigate("/");
          }}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            backgroundColor: "#ffffffcc",
            zIndex: 10,
            "&:hover": { backgroundColor: "#ffffffee" },
          }}
        >
          <HomeIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Help">
        <IconButton
          onClick={() => setShowExplanation((prev) => !prev)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "#ffffffcc",
            zIndex: 10,
            "&:hover": { backgroundColor: "#ffffffee" },
          }}
        >
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
      <SinglePlayer />
    </TicTacToeMultiProvider>
  );
};
