import LayoutDashboard from "../src/components/LayoutDashboard/LayoutDashboard";
import React, { useContext } from "react";
import { DataContext } from "./summary";

const TestPage = () => {
  const data = useContext(DataContext);

  console.log("context test", data);
  return (
    <LayoutDashboard>
      <p>to jest moj test Page need to use data from context </p>
    </LayoutDashboard>
  );
};

export default TestPage;
