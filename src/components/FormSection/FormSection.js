import React, { useState } from "react";
import Image from "next/image";

import { Box, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import leftdeco from "../../../public/leftdeco.svg";

import Textfield from "./FormsUI/Textfield";
import Button from "./FormsUI/Button";
import { Formik, Form, FieldArray } from "formik";
// Importing toastify module
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

// For showing notify
toast.configure();

export const FormSection = () => {
  
  const [successMessage, setSuccessMessage] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const initialValues = {
    friends: [
      {
        name: "",
        email: "",
      },
    ],
  };

  const onSubmit = async (values) => {
    // alert(JSON.stringify(values, null, 2));
    const data = {
      name: values.name,
      email: values.email,
    };

    console.log(values);

    //   await fetch("/api/user", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((res) => {
    //       let responseStatus = res.status;

    //       console.log("response z api", { res, status: responseStatus });

    //       // Success Message
    //       if (responseStatus === 200) {
    //         setSuccessMessage(true);
    //         toast.success(" We have successfully saved your data 😊", {
    //           autoClose: 3000,
    //         });
    //         setIsExploding(true);
    //       } else if (responseStatus === 400) {
    //         setSuccessMessage(false);
    //         toast.error("Validation error ", { autoClose: 1000 });
    //         setIsExploding(false);
    //       } else {
    //         setSuccessMessage(false);
    //         toast.error("Unknown server error", { autoClose: 1000 });
    //         setIsExploding(false);
    //       }

    //       return res.json();
    //     })
    //     .then((data) => {
    //       console.log("res message", data.message);
    //       console.log("ID", data.id);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       setSuccessMessage(false);
    //       toast.error("Runtime error, try again", { autoClose: 1000 });
    //     });
    // };

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
                                  <FieldArray name="friends">
                                    {({ insert, remove, push }) => (
                                      <div>
                                        {values.friends.length > 0 &&
                                          values.friends.map(
                                            (friend, index) => (
                                              <div key={index}>
                                                <Grid item xs={6}>
                                                  <Textfield
                                                    name={`friends.${index}.name`}
                                                    label="Last Name"
                                                  />
                                                </Grid>
                                                <Grid item xs={12}>
                                                  <Textfield
                                                    name={`friends.${index}.email`}
                                                    label="Email"
                                                  />
                                                </Grid>
                                                <div className="col">
                                                  <button
                                                    type="button"
                                                    className="secondary"
                                                    onClick={() =>
                                                      remove(index)
                                                    }
                                                  >
                                                    X
                                                  </button>
                                                </div>
                                              </div>
                                            )
                                          )}
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
};


