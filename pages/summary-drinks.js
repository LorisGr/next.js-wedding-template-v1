import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import PieChartDrinks from "../src/components/PieChartDrinks/PieChartDrinks";
import LayoutDashboardDesktop from "../src/components/LayoutDashboardDesktop/LayoutDashboardDesktop";
import ErrorMessage from "../src/components/ErrorMessage/ErrorMessage";
import getSession from "../src/utils/getSession";
import connectToMongoDB from "../src/utils/connectToMongoDB";
import fetchData from "../src/utils/fetchData";
import getUserSession from "../src/utils/getUserSession";

// [TODO] Implement 
// const countByFields = (data, groupingFields) => {};

const SummaryDrinks = ({ data, error }) => {
  const [userDataDrinks, setUserDataDrinks] = useState([]);

  /** [TODO] 
  useMemo(() => {
    const summary = countByFields(data, [
      "isVodka",
      "isGin",
      "isWhisky",
      "isBeer",
      "isNonAlcohol",
    ]);
    // summary:
    // {
    //    "isVodka": 5,
    //    "isGin": 2,
    //    "isWhisky": 0,
    //    "isBeer": 100,
    //    "isNonAlcohol": 0,
    // }
  }, [data]);
*/

  const amountSummary = useMemo(() => {
    return data.reduce(
      (result, person) => {
        if (person.isVodka) {
          result.vodkaAmount++;
        }
        if (person.isGin) {
          result.ginAmount++;
        }
        if (person.isWhisky) {
          result.whiskyAmount++;
        }
        if (person.isBeer) {
          result.beerAmount++;
        }
        if (person.isNonAlcohol) {
          result.isNonAlcoholAmount++;
        }

        return result;
      },
      {
        vodkaAmount: 0,
        ginAmount: 0,
        whiskyAmount: 0,
        beerAmount: 0,
        isNonAlcoholAmount: 0,
      }
    );
  }, [data]);

  console.log("[debug] amountSummaryDrinks: ", amountSummary);

  useEffect(() => {
    setUserDataDrinks([
      {
        id: 1,
        drink: "Vodka cocktails",
        userGain: amountSummary.vodkaAmount,
      },
      {
        id: 2,
        drink: "Gin cocktails",
        userGain: amountSummary.ginAmount,
      },
      {
        id: 3,
        drink: "Whisky cocktails",
        userGain: amountSummary.whiskyAmount,
      },
      {
        id: 4,
        drink: "Beer",
        userGain: amountSummary.beerAmount,
      },
      {
        id: 5,
        drink: "non-alcoholic cocktail",
        userGain: amountSummary.isNonAlcoholAmount,
      },
    ]);
  }, [
    amountSummary.vodkaAmount,
    amountSummary.ginAmount,
    amountSummary.whiskyAmount,
    amountSummary.beerAmount,
    amountSummary.isNonAlcoholAmount,
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
              vodkaAmount={amountSummary.vodkaAmount}
              ginAmount={amountSummary.ginAmount}
              whiskyAmount={amountSummary.whiskyAmount}
              beerAmount={amountSummary.beerAmount}
              isNonAlcoholAmount={amountSummary.isNonAlcoholAmount}
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

    return {
      props: {
        error: {
          message: error.message || "Something went wrong",
        },
      },
    };
  }
}
