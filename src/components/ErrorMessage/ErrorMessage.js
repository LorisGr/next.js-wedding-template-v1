import { Typography } from "@mui/material";
import React from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Box } from "@mui/system";

const ErrorMessage = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        p: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "error.main",
          color: "error.contrastText",
          p: 3,
          mt: 4,
          borderRadius: 1,
        }}
      >
        <SentimentDissatisfiedIcon />
        <Typography sx={{ ml: "10px" }} variant="h5">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorMessage;
