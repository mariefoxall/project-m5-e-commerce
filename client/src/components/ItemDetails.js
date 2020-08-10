import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { receiveItem } from "../actions";

import { getStoreItem } from "./reducers/item.reducer";

const ItemDetails = () => {
  const dispatch = useDispatch();

  const handleItem = () => {
    fetch("/items/6543") // <------------------ placeholder for the id... we could use a prop to replace "6543"
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveItem(json));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleItem();
  }, []);

  const item = useSelector(getStoreItem);
  console.log(item); // <------------------ once "6543" replaced, use this item to render the item details component

  return <div>Item Details</div>;
};

export default ItemDetails;
