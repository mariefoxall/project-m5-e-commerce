import React from "react";
import { useSelector } from "react-redux";
import { getItems } from "./reducers/item.reducer";

const LandingPage = () => {
  const storeItems = useSelector(getItems);
  console.log(storeItems);
  return <div>Landing Page</div>;
};

export default LandingPage;
