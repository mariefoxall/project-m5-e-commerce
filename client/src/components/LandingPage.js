import React from "react";
import { useSelector } from "react-redux";
import { getStoreItemArray } from "./reducers/item.reducer";

const LandingPage = () => {
  const storeItems = useSelector(getStoreItemArray);
  console.log(storeItems);
  return <div>Landing Page</div>;
};

export default LandingPage;
