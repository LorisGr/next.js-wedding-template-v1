///////////////////////////////////////////////////-------------------------------------------------------------------------------------------------

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { Box, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import leftdeco from "../../../public/leftdeco.svg";

import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";

import Textfield from "./FormsUI/Textfield";
import Select from "./FormsUI/Select";

import Checkbox from "./FormsUI/Checkbox";
import Button from "./FormsUI/Button";

// Importing toastify module
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import { ConfettiSection } from "../ConfettiSection/ConfettiSection";

// For showing notify
toast.configure();

const initialValues = {
  guestList: [
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      termsOfService: false,
    },
  ],
};

export const FormSection = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const onSubmit = async (values) => {
    // alert(JSON.stringify(values, null, 2));
    console.log({ values });
  };

  return (
    <Box
      sx={{
        pt: "8rem",
        pb: "8rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{ mb: "5rem" }}>
          Confirm your attendance
        </Typography>
        <Typography sx={{ maxWidth: "35em", margin: "0 auto" }}>
          Join us as we celebrate our wedding, and use form to confirm your
          attendance.
        </Typography>
        <Typography sx={{ maxWidth: "35em", margin: "0 auto" }}>
          Please confirm your attendance no later than 24th March 2023
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "5%", sm: "0%", md: "-10%" },
            left: { xs: "40%", sm: "10%", md: "40%" },
            transform: "translate(-50%,-50%)",
            height: { xs: "auto", sm: "200px", md: "200px" },
            width: { xs: "450px", sm: "500px", md: "650px" },
          }}
        >
          <Image src={leftdeco} alt="image" />
        </Box>
        <Box
          sx={{
            mt: "4rem",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={1}
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item xs={0} sm={1} md={2}>
                {/* svg */}
              </Grid>
              <Grid item xs={12} sm={10} md={8}>
                {/* form */}
                <Paper
                  sx={{
                    pt: "4rem",
                    pb: "4rem",
                    pl: { xs: "0", md: "2rem" },
                    pr: { xs: "0", md: "2rem" },
                  }}
                >
                  <ConfettiSection isExploding={isExploding} />

                  <Grid container>
                    <Grid item xs={12}>
                      <Container maxWidth="md">
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h4" sx={{ mb: "1rem" }}>
                              Wedding Form
                            </Typography>
                          </Grid>
                          <Formik
                            initialValues={initialValues}
                            onSubmit={async (values, actions) => {
                              // console.log("Values:", values);
                              actions.setSubmitting(true);
                              await onSubmit(values);
                              actions.setSubmitting(false);
                            }}
                          >
                            {({ values }) => (
                              <Form>
                                <FieldArray name="guestList">
                                  {({ insert, remove, push }) => (
                                    <div>
                                      {values.guestList.length > 0 &&
                                        values.guestList.map((friend, index) => (
                                          <Grid container spacing={2} key={index}>
                                            <Grid item xs={6}>
                                              <Textfield

                                                name={`guestList.${index}.firstName`}
                                                label="First Name"
                                              />
                                            </Grid>
                                            <Grid item xs={6}>
                                              <Textfield
                                                name={`guestList.${index}.lastName`}

                                                label="Last Name"
                                              />
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Textfield
                                                name={`guestList.${index}.email`}

                                                label="Email"
                                              />
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Textfield
                                                name={`guestList.${index}.phone`}

                                                label="Phone"
                                              />
                                            </Grid>

                                            <Grid item xs={12}>
                                              <Typography
                                                sx={{
                                                  textAlign: "left",
                                                  mt: "1rem",
                                                  mb: "1rem",
                                                }}
                                              >
                                                Additional information
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={12}
                                              sx={{ textAlign: "left" }}
                                            >
                                              <Checkbox
                                                name={`guestList.${index}.termsOfService`}

                                                legend="Terms Of Service"
                                                label="I agree"
                                              />
                                            </Grid>
                                          </Grid>
                                        ))}
                                    </div>
                                  )}
                                </FieldArray>
                                <Grid item xs={12}>
                                  <Button>confirm your attendance</Button>
                                </Grid>
                              </Form>
                            )}
                          </Formik>
                        </Grid>
                      </Container>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={0} sm={1} md={2}>
                {/* svg */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
