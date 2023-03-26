import React, { useMemo } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import CardDataSummary from "../src/components/CardDataSummary/CardDataSummary";
import LayoutDashboardDesktop from "../src/components/LayoutDashboardDesktop/LayoutDashboardDesktop";
import ErrorMessage from "../src/components/ErrorMessage/ErrorMessage";
import getSession from "../src/utils/getSession";
import connectToMongoDB from "../src/utils/connectToMongoDB";
import fetchData from "../src/utils/fetchData";
import getUserSession from "../src/utils/getUserSession";
import generatePDF from "../src/utils/generatePDF";

const amountPeople = 100;

const Invitations = ({ data, error }) => {
  // How many people is coming who answer Yes
  const comingGuests = data
    ? data.filter((guest) => guest.isComing === "Yes")
    : [];

  // How many people is coming plus with extra person
  const confirmedPeopleWhoComingAndWithExtraPerson = data
    ? data.filter((person) => {
        return person.isWithCompanion === true && person.isComing === "Yes";
      })
    : [];

  // console.log("extra", confirmedPeopleWhoComingAndWithExtraPerson);

  const confirmedPeopleWhoComingAlone = data
    ? data.filter((person) => {
        return person.isWithCompanion === false && person.isComing === "Yes";
      })
    : [];

  // console.log("coming but alone", confirmedPeopleWhoComingAlone);

  // How many people is not coming
  const amountNotComingPeople = data
    ? data.filter((person) => {
        return person.isComing === "No";
      })
    : [];

  const amountConfirmedPeopleWhoComingAloneOrWithExtraPerson =
    Number(confirmedPeopleWhoComingAndWithExtraPerson?.length * 2) +
    Number(confirmedPeopleWhoComingAlone?.length);

  // waiting for answer
  const amountPendingPeople =
    amountPeople -
    Number(comingGuests?.length) -
    Number(amountNotComingPeople?.length);

  // Number of Children under  3
  const numberChildren = data
    ? data.filter((person) => {
        return person.isWithChildren === true;
      })
    : [];

  const numberChildrenUnder3 = numberChildren.map((child) => {
    return child.amountKids;
  });

  const sumChildrenUnder3 = numberChildrenUnder3.reduce((prev, curr) => {
    return Number(prev) + Number(curr);
  }, 0);

  //Number of Children above 3
  const numberChildrenOver3 = numberChildren.map((child) => {
    return child.amountTeenagers;
  });

  const sumChildrenAbove3 = numberChildrenOver3.reduce((prev, curr) => {
    return Number(prev) + Number(curr);
  }, 0);

  return (
    <>
      {error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <LayoutDashboardDesktop>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "space-between" },
                alignItems: { xs: "center", sm: "flex-start" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  mb: 5,
                  mt: 1,
                  textAlign: "left",
                }}
              >
                Wedding Guest Invitation Summary
              </Typography>
              <Button
                sx={{ height: "40px", mb: { xs: "30px", sm: "0" } }}
                onClick={() => generatePDF(data)}
                variant="contained"
                color="secondary"
              >
                Download PDF
              </Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <CardDataSummary
                  title="Confirmed"
                  subTitle="Number of confirmed adult guests and their companions"
                  total={amountConfirmedPeopleWhoComingAloneOrWithExtraPerson}
                  icon={"akar-icons:people-group"}
                  colorIcon="#20A4F3"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <CardDataSummary
                  title="Not Coming"
                  subTitle="Number of confirmed adult guests who will not be attending"
                  total={amountNotComingPeople.length}
                  color="info"
                  icon={"emojione-monotone:no-pedestrians"}
                  colorIcon="#011627"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <CardDataSummary
                  title="Children"
                  subTitle="Number of confirmed guests under the age of 3"
                  total={sumChildrenUnder3}
                  color="warning"
                  icon={"uil:kid"}
                  colorIcon="#2ec4b6"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardDataSummary
                  title="Children"
                  subTitle="Number of confirmed guests aged 3 and over"
                  total={sumChildrenAbove3}
                  color="warning"
                  icon={"fluent-emoji-high-contrast:children-crossing"}
                  colorIcon="#C490D1"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <CardDataSummary
                  title={"Pending"}
                  subTitle="Number of unconfirmed guests"
                  total={amountPendingPeople}
                  color="error"
                  icon={"ic:baseline-pending-actions"}
                  colorIcon="#FF3366"
                />
              </Grid>
            </Grid>
          </Box>
        </LayoutDashboardDesktop>
      )}
    </>
  );
};

export default Invitations;

export async function getServerSideProps({ req, res }) {
  try {
    const session = await getSession(req, res);

    const client = await connectToMongoDB();

    const jsonData = await fetchData(client);

    const userSession = await getUserSession(client, session);

    return { props: { data: jsonData } };
  } catch (error) {
    console.error(error);

    return {
      props: {
        error: {
          message: error.message || "Something went wrong",
        },
      },
    };
  }
}
