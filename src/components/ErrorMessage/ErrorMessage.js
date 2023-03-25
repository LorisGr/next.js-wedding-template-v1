import { Typography, Button } from "@mui/material";
import React from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

const ErrorMessage = ({ message }) => {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        p: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "error.main",
          color: "error.contrastText",
          p: 3,
          borderRadius: 1,
        }}
      >
        <SentimentDissatisfiedIcon />
        <Typography sx={{ ml: "10px" }} variant="h5">
          {message && message.toString()}
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "green", color: "white" }}
          onClick={handleBackToLogin}
        >
          Back to Login
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorMessage;