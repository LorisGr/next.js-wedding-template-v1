import { FormControlLabel, FormGroup, FormLabel, Grid } from "@mui/material";
import React from "react";
import CheckboxField from "../FormSection/FormsUI/CheckboxField";

export const FoodAllergicQuestion = () => {
  return (
    <Grid item xs={12} sx={{ textAlign: "left" }}>
      <FormLabel
        component="legend"
        sx={{
          color: "#212B36",
          mt: "20px",
          mb: "10px",
    
        }}
      >
        Please let us know if you have any food allergies to:
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<CheckboxField name="isPeanuts" />}
          label="Peanuts"
        />
        <FormControlLabel
          control={<CheckboxField name="isEggs" />}
          label="Eggs"
        />
        <FormControlLabel
          control={<CheckboxField name="isMilk" />}
          label="Milk"
        />
      </FormGroup>
    </Grid>
  );
};
