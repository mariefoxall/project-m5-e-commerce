import React from "react";
import { useSelector } from "react-redux";
import { getStoreItemArray } from "./reducers/items.reducer";
import { getCompaniesArray } from "./reducers/companies.reducer";

const LandingPage = () => {
  const companies = useSelector(getCompaniesArray);
  const storeItems = useSelector(getStoreItemArray);
  console.log(companies);
  console.log(storeItems);

  return <div>Landing Page</div>;
};

export default LandingPage;
