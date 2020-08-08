import React from "react";

import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Shop = () => {
  const shopItemsArray = useSelector((state) => state);
  console.log(shopItemsArray);
  //GETITEMSARRAY
  return (
    <>
      <div>
        <label for="category">Choose a category:</label>
        <select id="category" name="category">
          <option value="fitness">Fitness</option>
          <option value="medical">Medical</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
      </div>
      <ItemList>
        {shopItemsArray.map((item) => {
          return (
            <Link to={`/items${item.id}`}>
              <ShopItem item={item} />
            </Link>
          );
        })}
      </ItemList>
    </>
  );
};

const ItemList = styled.div``;

export default Shop;
