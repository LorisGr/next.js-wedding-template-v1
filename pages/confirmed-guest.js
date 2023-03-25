import { Typography } from "@mui/material";
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

const ConfirmedGuest = ({ data, error }) => {
  const theme = useTheme();
  const comingGuests = data
    ? data.filter((guest) => guest.isComing === "Yes")
    : [];

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallTabletScreen = useMediaQuery(theme.breakpoints.down("md"));

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
            List of Confirmed Guests and Their Companions, with Number of
            Children
          </Typography>
          <Paper
            sx={{
              overflowX: "auto",
              maxHeight: isSmallScreen ? "100%" : 840,
            }}
          >
            <TableContainer
              sx={{
                fontSize: isSmallScreen ? "0.8rem" : "inherit",
                minWidth: isSmallScreen && isSmallTabletScreen ? 650 : "auto",
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
                      Surname
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      Phone Number
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      Companion
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      Companion Name
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      {" "}
                      Companion Surname
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      {" "}
                      Kids Under 3
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#212B36",
                        color: "#FFF",
                        p: { xs: "8px", md: "16px" },
                      }}
                    >
                      {" "}
                      Old Kids Over 3
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comingGuests.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>
                        {row.isWithCompanion ? "Yes" : "NO"}
                      </TableCell>
                      <TableCell>{row.firstNameCompanion}</TableCell>
                      <TableCell>{row.lastNameCompanion}</TableCell>
                      <TableCell align="center">{row.amountKids}</TableCell>
                      <TableCell align="center">
                        {row.amountTeenagers}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </LayoutDashboardDesktop>
      )}
    </>
  );
};

export default ConfirmedGuest;

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
