import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export type Difficulty = "easy" | "medium" | "hard";
export type Side = "x" | "o";
export type FirstMove = "x" | "o" | "random";

export type SPSettings = {
  difficulty: Difficulty;
  side: Side; // human side
  thinkMs: number; // bot "think time" for realism
};

export function SinglePlayerSettingsDialog({
  open,
  value,
  onSave,
  onClose,
}: {
  open: boolean;
  value: SPSettings;
  onSave: (v: SPSettings) => void;
  onClose: () => void;
}) {
  const [v, setV] = useState<SPSettings>(value);
  const [singlePlayerThinkMs, setSinglePlayerThinkMs] = useState<number>(
    value.thinkMs
  );

  useEffect(() => {
    if (open) {
      setV(value);
      setSinglePlayerThinkMs(value.thinkMs);
    }
  }, [open, value]);

  const handleSave = () => {
    onSave(v);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
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
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        Adjust Single Player Settings
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* Settings */}
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="diff-label" sx={{ color: "#D1D5DB" }}>
                Difficulty
              </InputLabel>
              <Select<Difficulty>
                labelId="diff-label"
                value={v.difficulty}
                label="Difficulty"
                onChange={(e) =>
                  setV({ ...v, difficulty: e.target.value as Difficulty })
                }
                sx={{ color: "#E5E7EB" }}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="side-label" sx={{ color: "#D1D5DB" }}>
                Your side
              </InputLabel>
              <Select<Side>
                labelId="side-label"
                value={v.side}
                label="Your side"
                onChange={(e) => setV({ ...v, side: e.target.value as Side })}
                sx={{ color: "#E5E7EB" }}
              >
                <MenuItem value="x">X</MenuItem>
                <MenuItem value="o">O</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 0.5 }}>
                Bot Think time ({singlePlayerThinkMs} ms)
              </Typography>
              <Slider
                value={singlePlayerThinkMs}
                onChange={(_, val) => {
                  setSinglePlayerThinkMs(val as number);
                  setV({ ...v, thinkMs: val as number });
                }}
                min={500}
                max={2000}
                step={50}
              />
            </Box>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ color: "#AAA" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
