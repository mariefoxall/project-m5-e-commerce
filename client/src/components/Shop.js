import React from "react";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getStoreItems } from "./reducers/items.reducer";
import {
  getFilterCategory,
  getFilterbodyLocation,
} from "./reducers/filter.reducer";
import { updateCategory, updateBodyLocation } from "../actions";
import Cart from "./Cart";

import Header from "./Header";
import PurchaseModal from "./PurchaseModal";

const Shop = ({ handleItems }) => {
  const dispatch = useDispatch();

  const shopItems = useSelector(getStoreItems);
  const shopItemsArray =
    shopItems.items !== null ? Object.values(shopItems.items.items) : [];

  const status = shopItems.status;

  const activeCategory = useSelector(getFilterCategory);
  const activeBodyLocation = useSelector(getFilterbodyLocation);

  const toggleCategory = (ev) => {
    dispatch(updateCategory(ev.target.value));
  };

  const toggleBodyLocation = (ev) => {
    dispatch(updateBodyLocation(ev.target.value));
  };

  const categoryFilterArray =
    activeCategory === "All"
      ? shopItemsArray
      : shopItemsArray.filter((item) => item.category === activeCategory);

  const mapShopItemsArray =
    activeBodyLocation === "All"
      ? categoryFilterArray
      : categoryFilterArray.filter(
          (item) => item.body_location === activeBodyLocation
        );

  return (
    <ShopPageAll>
      <ShopDiv>
        <FilterDiv>
          <Category>
            <label htmlFor="category">WHAT:</label>
            <Dropdown
              onChange={(ev) => toggleCategory(ev)}
              defaultValue={activeCategory}
              id="category"
              name="category"
              placeholder="Category"
            >
              <option value="All">Show All</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Fitness">Fitness</option>
              <option value="Gaming">Gaming</option>
              <option value="Industrial">Industrial</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Medical">Medical</option>
              <option value="Pets and Animals">Pets and Animals</option>
            </Dropdown>
          </Category>
          <BodyLocation>
            <label htmlFor="bodylocation">WHERE:</label>
            <Dropdown
              onChange={(ev) => toggleBodyLocation(ev)}
              defaultValue={activeBodyLocation}
              id="bodylocation"
              name="bodylocation"
            >
              <option value="All">Show All</option>
              <option value="Arms">Arms</option>
              <option value="Chest">Chest</option>
              <option value="Feet">Feet</option>
              <option value="Hands">Hands</option>
              <option value="Head">Head</option>
              <option value="Neck">Neck</option>
              <option value="Waist">Waist</option>
              <option value="Wrist">Wrist</option>
            </Dropdown>
          </BodyLocation>
        </FilterDiv>
        <ItemsDiv>
          {status && status === "loading" ? (
            <div>LOADING</div>
          ) : (
            <ItemList>
              {mapShopItemsArray.map((item) => {
                return (
                  <div key={item.id}>
                    {/* <Link to={`/items/${item.id}`}> */}
                    <ShopItem item={item} />
                    {/* </Link> */}
                  </div>
                );
              })}
            </ItemList>
          )}
        </ItemsDiv>
      </ShopDiv>
      <Cart />
      <PurchaseModal handleItems={handleItems} />
    </ShopPageAll>
  );
};

const ItemsDiv = styled.div``;
const ShopDiv = styled.div`
  /* background-color: #6694ff; /* For browsers that do not support gradients */
  /* background-image: linear-gradient(to right, #52d7e0, #0036b3); */
  min-height: 100vh;
  flex: 3;
  display: flex;
`;

// const Header = styled.div`
//   background-image: linear-gradient(to right, #52d7e0, #0036b3);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: white;
// `;

const Title = styled.h1`
  color: white;
  font-family: sans-serif;
`;

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
`;

const Category = styled.div`
  margin: 10px;
  padding: 10px;
  font-family: sans-serif;
  color: #8080ff;
`;

const BodyLocation = styled.div`
  margin: 10px;
  padding: 10px;
  font-family: sans-serif;
  color: #8080ff;
`;

const Dropdown = styled.select`
  font-family: sans-serif;
  padding: 5px;
  margin: 10px;
  background-color: #aa80ff;
  color: white;
`;

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ShopPageAll = styled.div`
  display: flex;
  flex-basis: 100vw;
  position: relative;
`;

export default Shop;
