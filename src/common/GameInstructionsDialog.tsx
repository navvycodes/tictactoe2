import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { STORAGE_KEY } from "../utils/localStorageHelpers";
import { setShowInstructions } from "../utils/localStorageHelpers";

export const GameInstructionsDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [neverShow, setNeverShow] = useState(false);

  useEffect(() => {
    if (open) {
      const saved =
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEY)
          : null;
      setNeverShow(saved === "true");
    }
  }, [open]);

  const handleGotIt = () => {
    try {
      if (neverShow && typeof window !== "undefined") {
        setShowInstructions(true);
      } else if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "#1E1E1E",
            color: "#F0F0F0",
            borderRadius: 2,
            border: "1px solid rgba(99,102,241,0.35)",
            boxShadow:
              "0 0 0 1px rgba(99,102,241,0.12), 0 18px 65px rgba(56,189,248,0.12)",
          },
        },
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        How to Play (Tic-Tac-Toe2)
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            TicTacToe is really boring so here's a more interesting version:
            each player may have at most
            <strong> 3 active pieces</strong> on the board. When you place a
            4th, your oldest one is removed automatically.
          </Typography>

          <Divider sx={{ borderColor: "rgba(148,163,184,0.25)" }} />

          <Box sx={{ lineHeight: 1.6 }}>
            <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 0.5 }}>
              Rules
            </Typography>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>
                <Typography variant="body2">
                  <strong>Turns:</strong> X starts, then alternate.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Place:</strong> Select an <em>empty</em> cell to drop
                  your piece.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Max 3 pieces:</strong> If you already have 3 pieces,
                  placing a new one
                  <em> removes your oldest</em> piece.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Win:</strong> Get 3 of your marks in a row (row,
                  column, or diagonal) at the same time.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Once the game is over, the first player should click a square
                  to start again.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  On single player mode, you can change the level of the AI and
                  what mark you play as by clicking the settings icon under the
                  score board.
                </Typography>
              </li>
            </ul>
          </Box>

          <Divider sx={{ borderColor: "rgba(148,163,184,0.25)" }} />

          <Box>
            <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 0.5 }}>
              Tips
            </Typography>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>
                <Typography variant="body2">
                  Use the FIFO rule to <em>reposition</em> your oldest piece
                  into stronger lines.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Threaten two lines at once; your opponent can’t block
                  everything with only 3 pieces.
                </Typography>
              </li>
            </ul>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={neverShow}
                onChange={(e) => setNeverShow(e.target.checked)}
                sx={{
                  color: "#9CA3AF",
                  "&.Mui-checked": { color: "#60a5fa" },
                }}
              />
            }
            label="Don’t show these instructions again"
            sx={{ mt: 1, color: "#E5E7EB" }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} sx={{ color: "#AAA" }}>
          Cancel
        </Button>
        <Button
          onClick={handleGotIt}
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            background:
              "linear-gradient(90deg, #60a5fa 0%, #38bdf8 50%, #60a5fa 100%)",
            boxShadow: "0 0 16px rgba(56,189,248,0.25)",
            "&:hover": {
              background:
                "linear-gradient(90deg, #60a5fa 0%, #22d3ee 50%, #60a5fa 100%)",
            },
          }}
        >
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
};
