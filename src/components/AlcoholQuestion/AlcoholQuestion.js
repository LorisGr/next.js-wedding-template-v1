import { FormControlLabel, FormGroup, FormLabel, Grid } from "@mui/material";
import React from "react";
import CheckboxField from "../FormSection/FormsUI/CheckboxField";

export const AlcoholQuestion = () => {
  return (
    <Grid item xs={12} sx={{ textAlign: "left", mt: "1rem",mb:"1rem" }}>
      <FormLabel
        component="legend"
        sx={{
          color: "#212B36",
          mb: "10px",
    
        }}
      >

        Qual'è il tuo alcolico preferito?
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<CheckboxField name="isVodka" />}
          label="Vodka cocktails"
        />
        <FormControlLabel
          control={<CheckboxField name="isGin" />}
          label="Gin cocktails"
        />
        <FormControlLabel
          control={<CheckboxField name="isWhisky" />}
          label="Whisky cocktails"
        />
        <FormControlLabel
          control={<CheckboxField name="isBeer" />}
          label="Birra"
        />
        <FormControlLabel
          control={<CheckboxField name="isNonAlcohol" />}
          label="non-alcoholic cocktail"
        />
      </FormGroup>
    </Grid>
  );
};
