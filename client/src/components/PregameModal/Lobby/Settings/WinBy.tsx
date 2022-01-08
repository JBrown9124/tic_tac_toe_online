import Grid from "@mui/material/Grid";
import { useCookies } from "react-cookie";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useSound } from "use-sound";
interface WinByProps {
  winBy: number;
  setWinBy: (value: number) => void;
  size: number;
}
export default function WinBy({ winBy, setWinBy, size }: WinByProps) {
 
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3"
  );
  const handleInputChange = (value: number) => {
    setWinBy(value);
    playSound();
  };

  return (
    <>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography>Win By</Typography>
        </Grid>
        <Grid item>
          <TextField
            error={winBy > (size === undefined ? 2 : size)}
            inputProps={{
              defaultValue: 2,
              step: 1,
              min: 2,
              max: size === undefined ? 2 : size,
              type: "number",
              "aria-labelledby": "winBy",
            }}
            sx={{ width: "20%" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(parseInt(e.target.value))
            }
            type="number"
          />
        </Grid>
      </Grid>
    </>
  );
}
