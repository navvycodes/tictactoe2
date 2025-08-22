import { Box, Stack } from "@mui/material";

const cellStyle = {
  width: "33%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  "&.middleCell": {
    borderLeft: "2px solid #000",
    borderRight: "2px solid #000",
  },
};
export const TicTacToeGrid = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        width: "max(30vw, 30vh)",
        height: "max(30vw, 30vh)",
        minWidth: "300px",
        minHeight: "300px",
        maxWidth: "800px",
        maxHeight: "800px",
      }}
      className="tic-tac-toe-grid"
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "33.33%",
          borderBottom: "2px solid #000",
        }}
      >
        <Box
          sx={{
            ...cellStyle,
          }}
        ></Box>
        <Box
          sx={{
            ...cellStyle,
          }}
          className="middleCell"
        ></Box>
        <Box sx={{ ...cellStyle }}>X</Box>
      </Box>

      {/* Row 1 */}
      <Box sx={{ display: "flex", width: "100%", height: "33.33%" }}>
        <Box
          sx={{
            ...cellStyle,
          }}
        >
          O
        </Box>
        <Box
          sx={{
            ...cellStyle,
          }}
          className="middleCell"
        ></Box>
        <Box sx={{ ...cellStyle }}></Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "33.33%",
          borderTop: "2px solid #000",
        }}
      >
        <Box sx={{ ...cellStyle }}></Box>
        <Box sx={{ ...cellStyle }} className="middleCell"></Box>
        <Box sx={{ ...cellStyle }}></Box>
      </Box>
    </Stack>
  );
};
