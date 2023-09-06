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
        Perfavore facci sapere se sei allergico a:
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<CheckboxField name="isPeanuts" />}
          label="Peanuts"
        />
        <FormControlLabel
          control={<CheckboxField name="isEggs" />}
          label="Uova"
        />
        <FormControlLabel
          control={<CheckboxField name="isMilk" />}
          label="Latte"
        />
      </FormGroup>
      <FormControlLabel
          control={<CheckboxField name="isCereal" />}
          label="Celiaco"
        />
      </FormGroup>
      <FormControlLabel
      control={<CheckboxField name="isVegan" />}
      label="Vegetariano"
    />
  </FormGroup>
  <FormControlLabel
          control={<CheckboxField name="isVegetarian" />}
          label="Vegetariano"
        />
      </FormGroup>
    </Grid>
  );
};
