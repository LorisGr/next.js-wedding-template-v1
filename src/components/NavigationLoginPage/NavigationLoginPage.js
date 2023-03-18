import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { makeStyles } from "@mui/styles";



const useStyles = makeStyles({
  link: {
    color: "#FA541A",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const NavigationLoginPage = () => {
  const classes = useStyles();
  return (
    <AppBar sx={{ backgroundColor: "#fcfff7" }} elevation={1} position="static">
      <Container maxWidth="md">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: "0",
          }}
        >
          <Typography color="primary" variant="h3">
            E&L
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#FA541A",
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} color="primary" />
            <Link component={NextLink} href="/" className={classes.link}>
              Back to Wedding Page
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationLoginPage;
