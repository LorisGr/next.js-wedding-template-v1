import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LayoutDashboardDesktop from "../src/components/LayoutDashboardDesktop/LayoutDashboardDesktop";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ErrorMessage from "../src/components/ErrorMessage/ErrorMessage";
import getSession from "../src/utils/getSession";
import connectToMongoDB from "../src/utils/connectToMongoDB";
import fetchData from "../src/utils/fetchData";
import getUserSession from "../src/utils/getUserSession";

const SummaryTransport = ({ data, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();

  const comingGuests = data
    ? data.filter((guest) => guest.isComing === "Yes")
    : [];

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallTabletScreen = useMediaQuery(theme.breakpoints.down("md"));

  //console.log("comingGuests", comingGuests);

  // ----------------------------------------------------------------------

  // PAGINATION
  const itemsPerPage = 10; // Change this value to adjust the number of items per page

  // Calculate the indexes of the first and last items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the paginated data for the current page
  const paginatedGuests = comingGuests.slice(indexOfFirstItem, indexOfLastItem);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Math.ceil -indicating that we need a total of pages to display all the guests.We round up to the nearest whole number,
  const totalPages = Math.ceil(comingGuests.length / itemsPerPage);

  const getTransportOptionLabel = (transportOption) => {
    switch (transportOption) {
      case "oneWayTransport":
        return "One way";
      case "roundTransport":
        return "Round Transport";
      case "onlyReturnTransport":
        return "only return Transport";
      case "noNeedTransport":
        return "No need Transport";
      default:
        return "";
    }
  };

  const getTransportOptionColor = (transportOption) => {
    switch (transportOption) {
      case "oneWayTransport":
        return "#2196F3"; // blue
      case "roundTransport":
        return "#4CAF50"; // green
      case "onlyReturnTransport":
        return "#FF9800"; // orange
      case "noNeedTransport":
        return "#9E9E9E"; // gray
      default:
        return "inherit";
    }
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
            Confirmation of Transportation for Wedding Guests
          </Typography>
          <Paper
            sx={{
              overflowX: "auto",
              maxHeight: isSmallScreen ? "100%" : 840,
              width: isSmallScreen ? "auto" : "85%",
            }}
          >
            <TableContainer
              sx={{
                fontSize: isSmallScreen ? "0.8rem" : "inherit",
                minWidth: "auto",
              }}
            >
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      Last Name
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      Travel options
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      Total number of people in the family
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedGuests.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell
                        sx={{
                          color: getTransportOptionColor(row.transportType),
                        }}
                      >
                        {getTransportOptionLabel(row.transportType)}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        {row.totalFamilyMember}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Box sx={{ mt: "1rem" }}>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              sx={{
                marginRight: 2,
                backgroundColor: theme.palette.primary.main,
                color: "#FFF",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Previous Page
            </Button>

            <Button
              onClick={goToNextPage}
              disabled={indexOfLastItem >= comingGuests.length}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#FFF",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Next Page
            </Button>
          </Box>
        </LayoutDashboardDesktop>
      )}
    </>
  );
};

export default SummaryTransport;

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
