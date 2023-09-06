import { Box, FormControl, FormLabel, Typography } from "@mui/material";
import React from "react";
import KidsRadioFields from "../KidsRadioFields/KidsRadioFields";

export const KidsQuestion = () => {
  return (
    <>
      <Typography
        variant="body1"
        component="p"
        sx={{
          textTransform: "none",
          fontWeight: "500",
          mb: "24px",
          textAlign: "left",
        }}
      >
        Ottimp! 😊 Ci sarà dell'animazione solo per i pupetti
        così potremo ballare tutta la notte!💃🕺 Solo per sapere, vogliamo capire quanti
        mini ospiti ci saranno.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: "30px",
          mt: "30px",
          textAlign: "left",
        }}
      >
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{
              mb: "16px",
              color: "#212B36",
            }}
          >
            Quanti bambini porterai?
            <span style={{ fontWeight: "bold" }}> Meno di 3 </span>?
          </FormLabel>
          <KidsRadioFields name="amountKids" />
        </FormControl>
      </Box>
    </>
  );
};
