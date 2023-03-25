import React, { useState, useEffect } from "react";

import { Box, Typography } from "@mui/material";
import BarChartFoodAllergy from "../src/components/BarChartFoodAllergy/BarChartFoodAllergy";
import LayoutDashboardDesktop from "../src/components/LayoutDashboardDesktop/LayoutDashboardDesktop";
import ErrorMessage from "../src/components/ErrorMessage/ErrorMessage";
import getSession from "../src/utils/getSession";
import connectToMongoDB from "../src/utils/connectToMongoDB";
import fetchData from "../src/utils/fetchData";
import getUserSession from "../src/utils/getUserSession";

const SummaryFoodAllergy = ({ data, error }) => {
  const [userDataAllergyFood, setUserDataAllergyFood] = useState([]);

  const peanutsPeopleAllergies = data
    ? data.filter((person) => {
        return person.isPeanuts === true;
      })
    : [];
  const eggsPeopleAllergies = data
    ? data.filter((person) => {
        return person.isEggs === true;
      })
    : [];
  const nutsPeopleAllergies = data
    ? data.filter((person) => {
        return person.isNuts === true;
      })
    : [];

  useEffect(() => {
    setUserDataAllergyFood([
      {
        id: 1,
        food: "Peanuts",
        userGain: peanutsPeopleAllergies?.length,
      },
      {
        id: 2,
        food: "Egg",
        userGain: eggsPeopleAllergies?.length,
      },
      {
        id: 3,
        food: "Nuts",
        userGain: nutsPeopleAllergies?.length,
      },
    ]);
  }, [
    peanutsPeopleAllergies?.length,
    eggsPeopleAllergies?.length,
    nutsPeopleAllergies?.length,
  ]);

  const userDataFoodAllergy = {
    labels: userDataAllergyFood?.map((data) => data?.food),
    datasets: [
      {
        label: "Food Allergy",
        data: userDataAllergyFood?.map((data) => data?.userGain),
        backgroundColor: [
          "rgba(155, 199, 232, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(155, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(155, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(155, 199, 232, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(155, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(155, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <LayoutDashboardDesktop>
          <Typography
            variant="h3"
            sx={{
              mb: 5,
              mt: 1,
              textAlign: "left",
            }}
          >
            Summary of Wedding Guests&apos; Food Allergies
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <BarChartFoodAllergy
              userDataFoodAllergy={userDataFoodAllergy}
              peanutsPeopleAllergies={peanutsPeopleAllergies}
              eggsPeopleAllergies={eggsPeopleAllergies}
              nutsPeopleAllergies={nutsPeopleAllergies}
            />
          </Box>
        </LayoutDashboardDesktop>
      )}
    </>
  );
};

export default SummaryFoodAllergy;

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
