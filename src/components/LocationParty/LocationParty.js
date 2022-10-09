import { Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React from "react";

import wine from "../../../public/wine.svg";
import Image from "next/image";

//https://www.npmjs.com/package/google-map-react
//https://leafletjs.com/index.html

const iframe = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15993.067311743673!2d10.67386275!3d59.92992835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416d95a2fd9315%3A0xb5d6eb5de3a26594!2sNorwegian%20Radium%20Hospital!5e0!3m2!1spl!2sno!4v1665298540040!5m2!1spl!2sno" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

export const LocationParty = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: "5rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between">
          <Grid item xs={12} md={6} lg={6}>
            <div dangerouslySetInnerHTML={{ __html: iframe }} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h3" sx={{ mb: "2.5rem", textAlign: "right" }}>
              Join us for the wedding{" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                mb: "2rem",
              }}
            >
              <Box
                sx={{
                  width: "100px",
                }}
              >
                <Image src={wine} alt="image" />
              </Box>
              <Typography
                variant="body2"
                sx={{ maxWidth: "20rem", textAlign: "right", mt: "1.5rem" }}
              >
                Dinner and dancing will take place in Castleknock Hotel &
                Country Club Castleknock, Oslo
              </Typography>
              <Typography
                variant="body2"
                sx={{ maxWidth: "20rem", textAlign: "right", mt: "1.5rem" }}
              >
                Free parking is available
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
