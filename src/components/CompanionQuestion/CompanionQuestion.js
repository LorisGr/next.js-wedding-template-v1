import { Box, Grid, Typography } from "@mui/material";
import Textfield from "../FormSection/FormsUI/Textfield";
import Checkbox from "../FormSection/FormsUI/Checkbox";

const CompanionQuestion = ({ values }) => {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          mt: "24px",
          textAlign: "left",
        }}
      >
        <Checkbox

          name="isWithCompanion"
          label="Will you come with an accompanying person?"
        />
      </Box>
      <Grid container sx={{ mb: "24px" }}>
        {values.isWithCompanion === true ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  mb: "24px",
                  mt: "24px",
                  textAlign: "left",
                }}
              >
                Magnifico! 😊 Puoi dirci perfavore nome e cognome
                del tuo partner?
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Textfield name="firstNameCompanion" label="First Name" />
            </Grid>
            <Grid item xs={6}>
              <Textfield name="lastNameCompanion" label="Last Name" />
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default CompanionQuestion;
