import React from "react";
import Link from "@mui/material/Link";
import NextLink from "next/link";

const Custom404 = () => {
  return (
    <div className="container">
      <h1 className="title">404 - Page Not Found</h1>
      <p className="text">
        Sorry, the page you&apos;re looking for does not exist. 
      </p>
      <NextLink href="/" passHref>
        <a className="link">Go back to the main page</a>
      </NextLink>
    </div>
  );
};

export default Custom404;
