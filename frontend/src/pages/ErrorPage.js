import React from "react";
import MainNavigation from "../components/navbar/MainNavigation";
import ErrorContent from "../components/ErrorContent";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page!";
  }

  return (
    <>
      <MainNavigation />
      <ErrorContent title={title}>
        <p>{message}</p>
      </ErrorContent>
    </>
  );
};

export default ErrorPage;
