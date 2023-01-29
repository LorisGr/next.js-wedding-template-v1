import React, { useContext } from "react";
import { DataContext } from "../../../pages/summary";
import LayoutDashboard from "../LayoutDashboard/LayoutDashboard";

const TestComponent = () => {
  const data = useContext(DataContext);

  console.log("context test w moim text component ", data);
  return (
    <div>
      <LayoutDashboard>
        <p>To moj test component </p>
        {data.map((item) => {
          return <p key={item.id}>{item.firstName}</p>;
        })}
      </LayoutDashboard>
    </div>
  );
};

export default TestComponent;
