// pages/_error.js
// https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing

import React from "react";
import Link from "next/link";

const ErrorPage = ({ statusCode }) => {
  return (
    <div className="container">
      <h1 className="title">{statusCode} - Error</h1>
      <p className="text">
        Sorry, an error occurred.
      </p>
      <Link href="/" passHref>
        <a className="link">Go back to the main page</a>
      </Link>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  let statusCode = 404;
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = err.statusCode;
  }
  return { statusCode };
};
