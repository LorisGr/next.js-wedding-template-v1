import {
  Button,
  Grid,
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
                  disabled={isSubmitting}
                  sx={{ width: "100%", ml: "16px", mr: "16px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {isSubmitting ? "Loading..." : "Login"}
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
