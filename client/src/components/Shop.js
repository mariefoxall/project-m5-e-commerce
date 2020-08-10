import React from "react";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getStoreItemArray } from "./reducers/item.reducer";

const Shop = () => {
  const shopItems = useSelector(getStoreItemArray);
  const shopItemsArray =
    shopItems !== null ? Object.values(shopItems.items) : [];
  const stateObject = useSelector((state) => state);
  const status = useSelector((state) => state.items.status);
  if (shopItems !== null) {
    console.log("shopItemsArray", shopItemsArray);
  }
  console.log("stateObject", stateObject);
  console.log("status", status);

  const [activeCategory, setActiveCategory] = React.useState("All");

  const toggleCategory = (ev) => {
    setActiveCategory(ev.target.value);
  };

  const [activeBodyLocation, setActiveBodyLocation] = React.useState("All");

  const toggleBodyLocation = (ev) => {
    setActiveBodyLocation(ev.target.value);
  };

  console.log(activeCategory);

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
    <ShopDiv>
      <Header>
        <Title>WEARABLES SHOP</Title>
        <FilterDiv>
          <Category>
            <label htmlFor="category">Category:</label>
            <Dropdown
              onChange={(ev) => toggleCategory(ev)}
              id="category"
              name="category"
              placeholder="Category"
            >
              {/* <option id="default-option">Category</option> */}
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
            <label htmlFor="bodylocation">Body Location:</label>
            <Dropdown
              onChange={(ev) => toggleBodyLocation(ev)}
              id="bodylocation"
              name="bodylocation"
            >
              {" "}
              {/* <option id="default-option">Body Location</option> */}
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
      </Header>
      {status && status === "loading" ? (
        <div>LOADING</div>
      ) : (
        <ItemList>
          {mapShopItemsArray.map((item) => {
            console.log(item.category);
            return (
              <Link key={item.id} to={`/items/${item.id}`}>
                <ShopItem item={item} />
              </Link>
            );
          })}
        </ItemList>
      )}
    </ShopDiv>
  );
};
const ShopDiv = styled.div`
  /* background-color: #6694ff; /* For browsers that do not support gradients */
  /* background-image: linear-gradient(to right, #52d7e0, #0036b3); */ */
  min-height: 100vh;
`;

const Header = styled.div`
  background-image: linear-gradient(to right, #52d7e0, #0036b3);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  color: white;
  font-family: sans-serif;
`;

const FilterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Category = styled.div`
  margin: 10px;
  padding: 10px 0;
  font-family: sans-serif;
`;

const BodyLocation = styled.div`
  margin: 10px;
  padding: 10px 0;
  font-family: sans-serif;
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

export default Shop;
