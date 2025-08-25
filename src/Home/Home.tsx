import { Box, Button } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";
import { useNavigate } from "react-router";
import { GameInstructionsDialog } from "../Common/GameInstructionsDialog";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import { getShowInstructions } from "../utils/localStorageHelpers";
export const Home = () => {
  const showOnInitialLoad = getShowInstructions();
  console.log("showOnInitialLoad", showOnInitialLoad);
  const [showExplanation, setShowExplanation] = useState(showOnInitialLoad);
  const navigate = useNavigate();
  return (
    <Box>
      <GameInstructionsDialog
        open={showExplanation}
        handleClose={() => {
          setShowExplanation(false);
        }}
      />
      <Tooltip title="Home">
        <IconButton
          onClick={() => {
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
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box
          component="img"
          src="/icons/TTT.png"
          alt="Tri-Tac-Toe"
          sx={{
            display: "block",
            margin: "0 auto",
            maxWidth: 250,
            width: "100%",
            height: "auto",
            mb: 1,
          }}
        />
        <Box sx={{ width: "100%", maxWidth: 300 }}>
          <Button
            fullWidth
            startIcon={<PersonIcon />}
            sx={{
              mb: 2,
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              py: { xs: 1.2, sm: 1.5 },
              color: "#FFFFFF",
              boxShadow: "0px 4px 12px rgba(22, 22, 22, 0.8)",
              background: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #DB2777 0%, #7C3AED 100%)",
              },
            }}
            onClick={() => {
              navigate("/single-player");
            }}
          >
            Single Player
          </Button>

          <Button
            fullWidth
            startIcon={<PeopleIcon />}
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              py: { xs: 1.2, sm: 1.5 },
              background: "linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #2563EB 0%, #0891B2 100%)",
              },
              color: "#F1F1F1",
              boxShadow: "0px 4px 12px rgba(22, 22, 22, 0.8)",
            }}
            onClick={() => {
              navigate("/multi-player");
            }}
          >
            Multi Player
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
