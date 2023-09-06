import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Box, Typography } from "@mui/material";
import { useField } from "formik";

const ConfirmAttendanceRadioFields = ({ name }) => {
  // useField need to get name
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <Box marginLeft="10px" marginTop="10px">
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Yes"
        name="radio-buttons-group"
        {...configTextfield}
      >
        <FormControlLabel value="Si" control={<Radio />} label="Si, ci sarò!" />
        <FormControlLabel
          value="No"
          control={<Radio />}
          label="Purtroppo, non posso!"
        />
      </RadioGroup>
      <Typography
        sx={{
          color: "error.main",
        }}
      >
        {meta && meta.touched && meta.error ? meta.error : ""}
      </Typography>
    </Box>
  );
};

export default ConfirmAttendanceRadioFields;
