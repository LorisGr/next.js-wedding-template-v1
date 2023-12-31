import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import useCountdown from "../../hooks/useCountdown";
import Lottie from "lottie-react";
import stopwatch from "../../../public/stopwatch.json";

const style = {
  height: 200,
};

const AnimationWatch = () => {
  return <Lottie animationData={stopwatch} style={style} />;
};

export const CountdownTimer = () => {
  // '10/05/2022 17:47' month/day/year time
  const localOffset = new Date().getTimezoneOffset() * 60 * 1000; // get local timezone offset in milliseconds
  const countdown = useCountdown(new Date("12/08/2023 15:00") - localOffset);

  // check if the wedding day has arrived
  const isWeddingDay = countdown.days === "0";
  return (
    <Box
      sx={{
        pt: "5rem",
        pb: "8rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        id="when"
        maxWidth="lg"
        sx={{
          textAlign: "center",
        }}
      >
        {isWeddingDay ? (
          <>
            <AnimationWatch />
            <Typography
              variant="h2"
              sx={{
                mb: "2rem",
                mt: "5rem",
              }}
            >
              Il countdown è terminato. Oggi è il grande giorno!{" "}
            </Typography>
          </>
        ) : (
          <>
            <AnimationWatch />
            <Typography
              variant="h2"
              sx={{
                mb: "3rem",
                mt: "5rem",
                fontSize: { xs: "2.4rem", md: "3.1rem" },
              }}
            >
              8 Dicembre 2023
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: "35em",
                margin: "0 auto",
              }}
            >
              Il giorno più bello della nostra vita sta arrivando. Siamo veramente 
              felici di vedervi lì.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "5rem" }}>
              {TimeBox(countdown.days, "Days")}
              <Typography
                variant="h2"
                sx={{
                  mr: "5px",
                  ml: "5px",
                  fontSize: { xs: "2.4rem", md: "3.1rem" },
                }}
              >
                :
              </Typography>
              {TimeBox(countdown.hours, "Hours")}
              <Typography
                variant="h2"
                sx={{
                  mr: "5px",
                  ml: "5px",
                  fontSize: { xs: "2.4rem", md: "3.1rem" },
                }}
              >
                :
              </Typography>
              {TimeBox(countdown.minutes, "Minutes")}
              <Typography
                variant="h2"
                sx={{
                  mr: "5px",
                  ml: "5px",
                  fontSize: { xs: "2.4rem", md: "3.1rem" },
                }}
              >
                :
              </Typography>
              {TimeBox(countdown.seconds, "Seconds")}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

function TimeBox(type, label) {
  return (
    <div>
      <Typography
        variant="h2"
        sx={{ fontSize: { xs: "2.4rem", md: "3.1rem" } }}
      >
        {type}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
    </div>
  );
}
