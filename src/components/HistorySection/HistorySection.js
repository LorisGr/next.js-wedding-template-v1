import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";


import React from "react";
import wavetop from "../../../public/wavetop.svg";
import waveDown from "../../../public/waveDown.svg";
import travelImg from "../../../public/travelImg.svg";
import flameWedding from "../../../public/flame-wedding.svg";
import flameEcology from "../../../public/flame-ecology-care.svg";
import dinner from "../../../public/dinner.png";
import phoneDate from "../../../public/phoneDate.png";
import engagement from "../../../public/engagement.svg";
import Image from "next/image";

const CORE_VALUES = [
  {
    year: "Maggio 2018",
    title: "From Swipe to Soul Mate",
    description: "Ci siao conosciuti in modo moderno, su Tinder!(swoon!) ",
    img: phoneDate,
  },
  {
    year: "Dicembre 2019",
    title: "First date",
    description:
      "Il nostro primo appuntamento è stato un bello start, ha iniziato a piovere con un atmosfera romantica e abbiamo cenato fuori!",
    img: dinner,
  },
  {
    year: "June 2020",
    title: "Adventuring Together",
    description:
      "Abbiamo viaggiato per tutta Italia ed Europa, abbiamo costruito dei ricordi memorabili!",
    img: travelImg,
  },
  {
    year: "April 2021",
    title: "We moved in together",
    description:
      "Dopo un pò, abbiamo deciso di comprare casa e trasferirci a vivere insieme!",
    img: flameEcology,
  },
  {
    year: "July 2022",
    title: "I said YES !!",
    description: "Durante un tramonto in spiaggia sul mare, non ci credevo!",
    img: engagement,
  },
  {
    year: "April 2023",
    title: "Wedding day",
    description: `Siamo molto eccitati all'idea di questo giorno, partecipa anche tu a questo momento unico!`,
    img: flameWedding,
  },
];

export const HistorySection = () => {
  return (
    <>
      <Box
        id="our-story"
        sx={{
          backgroundImage: `url(${wavetop.src})`,
          height: {xs:"200px",md:"340px"},
          width: 1,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f7adc2",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
          }}
        >
          <Stack
            spacing={3}
            sx={{
              maxWidth: 480,
              textAlign: "center",
              mx: "auto",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                mt: { sx: "none", md: "2rem" },
                mb: "5rem",
              }}
            >
              La nostra storia
            </Typography>
          </Stack>

          <Timeline position={"alternate"}>
            {CORE_VALUES.map((value, index) => {
              const { title, description, year, img } = value;
              return (
                <TimelineItem
                  key={title}
                  sx={{
                    "&:before": {
                      display: { xs: "none", md: "block" },
                    },
                  }}
                >
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{ color: "#FFF", backgroundColor: "#FFF" }}
                    />
                    <TimelineConnector
                      sx={{ color: "#FFF", backgroundColor: "#FFF" }}
                    />
                  </TimelineSeparator>
                  <TimelineContent sx={{ pb: { xs: 3, md: 5 } }}>
                    <Typography variant="subtitle1">{year}</Typography>
                    <Paper
                      sx={{
                        p: "1.5rem",
                        mt: "2rem",
                        backgroundColor: "#FCFFF7",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ flex: 2, ml: "10px", mr: "10px" }}>
                          <Typography
                            variant="h3"
                            sx={{
                              mt: 0.5,
                              mb: 1,

                              textAlign: { xs: "center", sm: "left" },
                            }}
                          >
                            {title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              textAlign: { xs: "center", sm: "left" },
                              mt: "1rem",
                              mb: { xs: "1rem", sm: "0" },
                            }}
                          >
                            {description}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 1,
                          }}
                        >
                          <Image src={img} alt="image" />
                        </Box>
                      </Box>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${waveDown.src})`,
          height: "380px",
          width: 1,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          mb: "1rem",
        }}
      ></Box>
    </>
  );
};
