import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PieChartDrinks from "../src/components/PieChartDrinks/PieChartDrinks";
import LayoutDashboardDesktop from "../src/components/LayoutDashboardDesktop/LayoutDashboardDesktop";
import ErrorMessage from "../src/components/ErrorMessage/ErrorMessage";
import getSession from "../src/utils/getSession";
import connectToMongoDB from "../src/utils/connectToMongoDB";
import fetchData from "../src/utils/fetchData";
import getUserSession from "../src/utils/getUserSession";

const SummaryDrinks = ({ data, error }) => {
  const [userDataDrinks, setUserDataDrinks] = useState([]);
  console.log(error);
  const vodkaAmount = data?.filter((person) => person.isVodka === true) || [];
  const ginAmount = data?.filter((person) => person.isGin === true) || [];
  const whiskyAmount = data?.filter((person) => person.isWhisky === true) || [];
  const beerAmount = data?.filter((person) => person.isBeer === true) || [];
  const isNonAlcoholAmount =
    data?.filter((person) => person.isNonAlcohol === true) || [];

  useEffect(() => {
    setUserDataDrinks([
      {
        id: 1,
        drink: "Vodka cocktails",
        userGain: vodkaAmount.length,
      },
      {
        id: 2,
        drink: "Gin cocktails",
        userGain: ginAmount.length,
      },
      {
        id: 3,
        drink: "Whisky cocktails",
        userGain: whiskyAmount.length,
      },
      {
        id: 4,
        drink: "Beer",
        userGain: beerAmount.length,
      },
      {
        id: 5,
        drink: "non-alcoholic cocktail",
        userGain: isNonAlcoholAmount.length,
      },
    ]);
  }, [
    vodkaAmount.length,
    ginAmount.length,
    whiskyAmount.length,
    beerAmount.length,
    isNonAlcoholAmount.length,
  ]);

  const userData = {
    labels: userDataDrinks?.map((data) => data?.drink),
    datasets: [
      {
        label: "Users Gained",
        data: userDataDrinks?.map((data) => data?.userGain),
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
            Overview of Wedding Guests&apos; Drink Preferences
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <PieChartDrinks
              userData={userData}
              vodkaAmount={vodkaAmount}
              ginAmount={ginAmount}
              whiskyAmount={whiskyAmount}
              beerAmount={beerAmount}
              isNonAlcoholAmount={isNonAlcoholAmount}
            />
          </Box>
        </LayoutDashboardDesktop>
      )}
    </>
  );
};

export default SummaryDrinks;

export async function getServerSideProps({ req, res }) {
  try {
    const session = await getSession(req, res);

    const client = await connectToMongoDB();

    const jsonData = await fetchData(client);

    const userSession = await getUserSession(client, session);

    return { props: { data: jsonData } };
  } catch (error) {
    console.error(error);

    return { props: { error: error.message || "Something went wrong" } };
  }
}
