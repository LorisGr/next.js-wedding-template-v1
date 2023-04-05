import React from "react";

// FORMIK
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Box, Typography } from "@mui/material";
import { useField } from "formik";

const TransportRadioFields = ({ name }) => {
  // UseField needs to get the name
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
  };

  // If there is an error, display it
  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <Box marginLeft="10px" marginTop="10px">
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="noNeedTransport"
        name="radio-buttons-group"
        {...configTextfield}
      >
        <FormControlLabel
          value="oneWayTransport"
          control={<Radio />}
          label="Yes, one way from the church to the wedding reception venue"
        />
        <FormControlLabel
          value="roundTransport"
          control={<Radio />}
          label="Yes, round trip"
        />
        <FormControlLabel
          value="onlyReturnTransport"
          control={<Radio />}
          label="Yes, only return after the event"
        />
        <FormControlLabel
          value="noNeedTransport"
          control={<Radio />}
          label="No, I do not need transportation"
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

export default TransportRadioFields;
