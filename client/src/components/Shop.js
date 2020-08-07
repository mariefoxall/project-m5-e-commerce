import React from "react";
import { useSelector } from "react-redux";
import { getItems } from "./reducers/item.reducer";

const Shop = () => {
  const storeItems = useSelector(getItems);
  console.log(storeItems);
};

export default Shop;
