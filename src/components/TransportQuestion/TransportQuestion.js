import { FormControl, FormLabel, Grid } from "@mui/material";
import { Box } from "@mui/material";
import TransportRadioFields from "../TransportRadioFields/TransportRadioFields";

export const TransportQuestion = () => {
  return (
    <Grid item xs={12} sx={{ textAlign: "left", mt: "0rem", mb: "3rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{
              color: "#212B36",
              mb: "10px",

              textAlign: "left",
            }}
          >
            Would you like us to arrange transportation for you from the church
            to the banquet hall?
          </FormLabel>
          <TransportRadioFields name="transportType" />
        </FormControl>
      </Box>
    </Grid>
  );
};
