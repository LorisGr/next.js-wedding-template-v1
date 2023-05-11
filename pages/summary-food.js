import React, { useState, useEffect, useMemo } from "react";
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

  const amountSummary = useMemo(() => {
    return data.reduce(
      (result, person) => {
        if (person.isPeanuts) {
          result.isPeanuts++;
        }
        if (person.isEggs) {
          result.isEggs++;
        }
        if (person.isMilk) {
          result.isMilk++;
        }

        return result;
      },
      {
        isPeanuts: 0,
        isEggs: 0,
        isMilk: 0,
      }
    );
  }, [data]);

  console.log("[debug] amountSummaryFood: ", amountSummary);

  useEffect(() => {
    setUserDataAllergyFood([
      {
        id: 1,
        food: "Peanuts",
        userGain: amountSummary.isPeanuts,
      },
      {
        id: 2,
        food: "Egg",
        userGain: amountSummary.isEggs,
      },
      {
        id: 3,
        food: "Milk",
        userGain: amountSummary.isMilk,
      },
    ]);
  }, [amountSummary.isPeanuts, amountSummary.isEggs, amountSummary.isMilk]);

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
              peanutsPeopleAllergies={amountSummary.isPeanuts}
              eggsPeopleAllergies={amountSummary.isEggs}
              milkPeopleAllergies={amountSummary.isMilk}
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
