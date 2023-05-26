import { createTheme } from "@mui/material/styles";
import typography from "./typography";

// ----------------------------------------------------------------------
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const theme = createTheme({
  mode: "light",
  typography: typography,
  breakpoints: breakpoints,
  palette: {
    primary: {
      main: "#FA541A",
      dark: "#212B36",
      darker: "#770508",
    },
    secondary: {
      light: "#FFFFF",
      main: "#212B36",
    },
    text: {
      primary: "#212B36",
    },
    info: {
      main: "#2094D5",
    },
    error: {
      main: "#f44336",
    },

  },
});

export default theme;
