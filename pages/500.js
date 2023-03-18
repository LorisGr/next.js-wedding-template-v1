import Link from "@mui/material/Link";
import NextLink from "next/link";

export default function Custom500() {
  return (
    <div className="container">
      <h1>500 - Server-side error occurred</h1>
      <p>
        We apologize for the inconvenience, but there seems to be a problem with
        our server.
      </p>
      <p>Please try again later or contact us for assistance.</p>
      <NextLink href="/" passHref>
        <a className="link">Go back to the main page</a>
      </NextLink>

      {/* Doesn't work the styles from mui  */}
      {/* <Link
        sx={{ textDecoration: "none", color: "#0021F5" }}
        href="/"
        component={NextLink}
      >
        Go back to the main page
      </Link> */}
    </div>
  );
}
