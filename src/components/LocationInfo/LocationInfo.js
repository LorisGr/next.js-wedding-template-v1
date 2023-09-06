
import React from "react";
import church from "../../../public/church.svg";
import wine from "../../../public/wine.svg";
import Image from "next/image";
import Link from "next/link";
import { Box, Container, Grid, Typography } from "@mui/material";

export const LocationInfo = () => {
  return (
    <Box
      id="location"
      sx={{
        pb: "15rem",
        pt: "5rem",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            mb: "5rem",
            mt: "5rem",
            textAlign: "center",
            fontSize: { xs: "2.4rem", md: "3.1rem" },
          }}
        >
          Location
        </Typography>

        <Grid container justifyContent="space-between">
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h3" sx={{ mb: "2.5rem", textAlign: "center" }}>
              Partecipa con noi al nostro matrimonio!{" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: "2rem",
              }}
            >
              <Box
                sx={{
                  width: "100px",
                }}
              >
                <Image src={church} alt="icon church" />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "20rem",
                  mt: "1rem",
                  textAlign: "center",
                }}
              >
                Il matrimonio sarà in Saint Pro-Cathedral 83
                Marlborough Street, Oslo at 10.00 a.m
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "20rem",
                  textAlign: "center",
                  mt: "1rem",
                }}
              >
                Parcheggio disponibile in città
              </Typography>
              <Link href="https://goo.gl/maps/3q59iGCWT1WseYMK7">
                <Typography
                  position="relative"
                  variant="body1"
                  sx={{
                    color: "#f2779a",
                    mt: "1em",
                    textDecoration: "underline",
                    zIndex: "99",
                    
                  }}
                >
                  guarda sulla mappa
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h3" sx={{ mb: "2.5rem", textAlign: "center" }}>
              Partecipa con noi
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: "2rem",
              }}
            >
              <Box
                sx={{
                  width: "100px",
                }}
              >
                <Image src={wine} alt="icon wine" />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "20rem",
                  textAlign: "center",
                  mt: "1rem",
                }}
              >
                Cena e danze prenderanno atto in Castleknock Hotel &
                Country Club Castleknock, Oslo
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: "20rem",
                  textAlign: "center",
                  mt: "1rem",
                }}
              >
                Parcheggio disponibile in città
              </Typography>
              <Link href="https://goo.gl/maps/3q59iGCWT1WseYMK7">
                <Typography
                  variant="body1"
                  sx={{
                    color: "#f2779a",
                    mt: "1em",
                    textDecoration: "underline",
                  }}
                >
                  guarda la mappa
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
