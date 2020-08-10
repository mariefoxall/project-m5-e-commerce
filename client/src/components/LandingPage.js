import React from "react";
import { useSelector } from "react-redux";
import { getStoreItems } from "./reducers/items.reducer";
import { getCompanies } from "./reducers/companies.reducer";

const LandingPage = () => {
  const companies = useSelector(getCompanies);
  const storeItems = useSelector(getStoreItems);
  console.log(companies);
  console.log(storeItems);

  return <div>Landing Page</div>;
};

export default LandingPage;
