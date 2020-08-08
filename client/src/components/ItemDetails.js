import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { receiveItem } from "../actions";

const ItemDetails = () => {
  const dispatch = useDispatch();

  const handleItem = () => {
    fetch("/items/####") // <------------------ placeholder for the id... we could use a prop
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveItem(json));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleItem();
  }, []);

  return <div>Item Details</div>;
};

export default ItemDetails;
