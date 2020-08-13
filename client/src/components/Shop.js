import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getStoreItems } from "./reducers/items.reducer";
import { getCompanies } from "./reducers/companies.reducer";
import {
  getFilterCategory,
  getFilterbodyLocation,
  getFilterCompany,
} from "./reducers/filter.reducer";
import {
  updateCategory,
  updateBodyLocation,
  updateCompany,
  receiveCompanies,
} from "../actions";
import Cart from "./Cart";

import Header from "./Header";
import PurchaseModal from "./PurchaseModal";

const Shop = () => {
  const dispatch = useDispatch();

  const shopItems = useSelector(getStoreItems);
  const shopItemsArray =
    shopItems.items !== null ? Object.values(shopItems.items.items) : [];

  console.log(shopItems, "items");
  console.log(shopItemsArray, "item Array");
  const status = shopItems.status;
  const activeCategory = useSelector(getFilterCategory);
  const activeBodyLocation = useSelector(getFilterbodyLocation);
  const activeCompany = useSelector(getFilterCompany);

  const handleCompanies = () => {
    fetch(`/companies`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveCompanies(json));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (status === "idle") {
      handleCompanies(shopItemsArray.companyId);
    }
  }, [status]);

  const companies = useSelector(getCompanies);

  console.log(activeCompany, "company");

  const toggleCategory = (ev) => {
    dispatch(updateCategory(ev.target.value));
    setCurrentPage(1);
  };

  const toggleBodyLocation = (ev) => {
    dispatch(updateBodyLocation(ev.target.value));
    setCurrentPage(1);
  };

  const toggleCompany = (ev) => {
    dispatch(updateCompany(ev.target.value));
  };

  const categoryFilterArray =
    activeCategory === "All"
      ? shopItemsArray
      : shopItemsArray.filter((item) => item.category === activeCategory);

  const bodyLocationFilterArray =
    activeBodyLocation === "All"
      ? categoryFilterArray
      : categoryFilterArray.filter(
          (item) => item.body_location === activeBodyLocation
        );

  const totalItemCount = mapShopItemsArray.length;
  console.log(totalItemCount);
  const maxNumItemsPerPage = 30;

  const numOfPages = Math.ceil(totalItemCount / maxNumItemsPerPage);

  let pagesArray = [];

  for (let i = 1; i <= numOfPages; i++) {
    pagesArray.push(i);
    console.log("pagesArray: ", pagesArray);
  }

  const [currentPage, setCurrentPage] = React.useState(1);

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  console.log(currentPage);

  const currentPageArray = mapShopItemsArray.slice(
    30 * (currentPage - 1),
    30 * currentPage
  );

  const activePageStyle = { backgroundColor: "blue" };
  const mapShopItemsArray =
    activeCompany === "All"
      ? bodyLocationFilterArray
      : bodyLocationFilterArray.filter(
          (item) => item.companyId === activeCompany
        );

  return (
    <>
      
    </>
  );
};

const NumItems = styled.div`
  background: #ccccff;
  padding: 5px;
  margin-bottom: 10px;
`;
const PageNav = styled.li`
  padding: 5px;
  &:hover {
    cursor: pointer;
    background-color: #8080ff;
  }
`;
const Display = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PagesList = styled.ul`
  background: #ccccff;
  display: flex;
  justify-content: space-between;
  width: 40%;
`;
const SpacerDiv = styled.div`
  height: calc(100vh-120px);
  position: relative;
  flex: 1;
`;

const ShopDiv = styled.div`
  min-height: 100vh;
  flex: 3;
  display: flex;
`;

const Title = styled.h1`
  color: white;
  font-family: sans-serif;
`;

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  /* width: calc(20% - 20px); */
  /* justify-content: flex-start; */
`;

const Category = styled.div`
  margin: 10px;
  padding: 10px;
  font-family: "Spartan";
  color: #8080ff;
`;

const BodyLocation = styled.div`
  margin: 10px;
  padding: 10px;
  font-family: "Spartan";
  color: #8080ff;
`;

const Company = styled.div`
  margin: 10px;
  padding: 10px;
  font-family: sans-serif;
  color: #8080ff;
`;

const Dropdown = styled.select`
  font-family: "Spartan";
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
  margin: 0;
  padding: 0;
`;

export default Shop;
