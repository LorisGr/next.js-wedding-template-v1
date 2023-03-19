import connectPromise from "../lib/mongodb";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PieChartDrinks from "../src/components/PieChartDrinks/PieChartDrinks";
import { getCookie } from "cookies-next";
import LayoutDashboardDesktop from "../src/components/LayoutDashboardDesktop/LayoutDashboardDesktop";
import ErrorMessage from "../src/components/ErrorMessage/ErrorMessage";

const SummaryDrinks = ({ data, error }) => {
  const [userDataDrinks, setUserDataDrinks] = useState([]);

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
        <ErrorMessage
          message={
            error.message ||
            "Oops! Something went wrong. Please try again later."
          }
        />
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
  const session = getCookie("session", { req, res });

  if (!session) {
    // If no session found, redirect to login page
    res.writeHead(302, {
      Location: "/login",
    });
    res.end();
    return { props: {} };
  }

  console.log("session", session);

  try {
    // Connect with MongoDB
    const client = await connectPromise;
    const isConnected = await client.isConnected();

    if (!isConnected) {
      console.log("MongoDB client is not connected");
      throw new Error("MongoDB client is not connected");
    }

    // Fetch data from MongoDB
    const db = client.db(process.env.NEXT_PUBLIC_DB_NAME);
    const collection = db.collection(process.env.NEXT_PUBLIC_COLLECTION_NAME);
    const data = await collection.find({}).toArray();
    // Session and user info
    const dbUserAccount = client.db(process.env.NEXT_USER_ACCOUNT_DB_NAME);
    const sessionCollection = dbUserAccount.collection(
      process.env.NEXT_SESSION_COLLECTION_NAME
    );

    // Get the user  session corresponding to the sessionId cookie from the database
    const userSession = await sessionCollection.findOne({ sessionId: session });

    console.log("user", userSession.sessionId);
    console.log("session", typeof session);

    if (!userSession || userSession.sessionId !== session) {
      res.writeHead(302, {
        Location: "/login",
      });
      res.end();
      return { props: {} };
    }

    if (data.length === 0) {
      console.error("Data not found");
      return {
        props: {
          error: {
            message: "Oops! Something went wrong. Please try again later.",
            status: error?.response?.status || 404,
          },
        },
      };
    }

    // fix error serialized to JSON, MongoDB return _id property as object not STRING
    const jsonData = data.map((item) => {
      item._id = item._id.toString();
      return item;
    });

    return { props: { data: jsonData } };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: {
          message:
            "Internal Server Error. Something went wrong. Please try again later",
          status: error?.response?.status || 500,
        },
      },
    };
  }
}
