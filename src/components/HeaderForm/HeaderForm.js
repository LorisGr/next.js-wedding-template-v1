import { Typography } from "@mui/material";
import React from "react";

export const HeaderForm = () => {
  return (
    <>
      <Typography variant="h2" sx={{ mb: "3rem" }}>
        Conferma la partecipazione
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: "1rem",
          fontWeight: "bold",
          color: "#e74c3c",
        }}
      >
        Il matrimonio sarà il 23 Maggio
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: "30rem",
          margin: "0 auto",
          mb: "2rem",
          mt: "2rem",
        }}
      >
        Resta con noi durante il nostro grande giorno! Conferma la
        partecipazione.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: "30rem",
          margin: "0 auto",
        }}
      >
        Perfavore conferma l'invito prima del{" "}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: "30rem",
          margin: "0 auto",

          fontWeight: "bold",
        }}
      >
        22 Marzo 2023
      </Typography>
    </>
  );
};
