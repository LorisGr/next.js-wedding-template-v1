import {
  Button,
  Grid,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextfieldWrapper from "../src/components/FormSection/FormsUI/Textfield";
import NavigationLoginPage from "../src/components/NavigationLoginPage/NavigationLoginPage";




const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // redirect
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/invitations");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    setIsLoggedIn(false);

    const dataToSend = {
      username: values.username,
      password: values.password,
    };

    const response = await fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    if (response.status === 402) {
      setFieldError("username", "User is incorrect");
      return;
    }

    if (response.status === 401) {
      setFieldError("password", "Password is incorrect");
      return;
    }
    if (response.status === 200) {
      setIsLoggedIn(true);
    }

    const data = await response.json();

    if (data.success) {
      setCookie("session", data.sessionId, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
      setIsLoggedIn(true);
    } else {
      console.log(data.message);
    }

    setSubmitting(false);
  };

  return (
    <>
      <NavigationLoginPage />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
             {/* Sample section to inform users about testing with provided credentials */}
        {/* Sample section to inform users about testing with provided credentials */}
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "#f1f1f1",
            padding: "10px",
            marginBottom: "20px",
            "@media (min-width: 600px)": {
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
        >
          <Typography variant="body1" component="p">
            <strong>Testing the App with Provided Credentials:</strong>
          </Typography>
          <Typography variant="body1" component="p">
            To explore the dashboard, you can use the following credentials:
            <br />
            <strong>Username:</strong> Maciek
            <br />
            <strong>Password:</strong> secretpassword
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              "@media (min-width: 600px)": {
                width: "100%",
              },
            }}
          >
            Please note that these credentials are provided for testing purposes.
          </Typography>
        </Box>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container maxWidth="sm">
                <Grid item xs={12} sx={{ pl: "16px", pr: "16px" }}>
                  {" "}
                  <TextfieldWrapper
                    sx={{ mb: "20px" }}
                    name="username"
                    label="Username"
                  />
                </Grid>
                <Grid item xs={12} sx={{ pl: "16px", pr: "16px" }}>
                  {" "}
                  <TextfieldWrapper
                    sx={{ mb: "20px" }}
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Grid>

                <Button
                  disabled={isLoggedIn}
                  sx={{ width: "100%", ml: "16px", mr: "16px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {isLoggedIn ? "Loading..." : "Login"}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default LoginPage;
