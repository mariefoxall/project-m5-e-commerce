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
  const [maxNumItemsPerPage, setMaxNumItemsPerPage] = React.useState(15);

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
    maxNumItemsPerPage * (currentPage - 1),
    maxNumItemsPerPage * currentPage
  );

  const activePageStyle = { backgroundColor: "blue" };
  const mapShopItemsArray =
    activeCompany === "All"
      ? bodyLocationFilterArray
      : bodyLocationFilterArray.filter(
          (item) => item.companyId === activeCompany
        );

  const toggleNumItemsPerPage = (ev) => {
    setMaxNumItemsPerPage(ev.target.value);
  };

  return (
    <>
      <Header />
      <ShopPageAll>
        <SpacerDiv>
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
          </FilterDiv>{" "}
        </SpacerDiv>
        <ShopDiv>
          {status && status === "loading" ? (
            <div>LOADING</div>
          ) : (
            <Display>
              <ItemList>
                {currentPageArray.map((item) => {
                  //console.log(item.category);
                  return (
                    <div key={item.id}>
                      {/* <Link to={`/items/${item.id}`}> */}
                      <ShopItem item={item} />
                      {/* </Link> */}
                    </div>
                  );
                })}
              </ItemList>
              <Pagination>
                <NumItems>
                  show
                  <Dropdown
                    onChange={(ev) => toggleNumItemsPerPage(ev)}
                    defaultValue={15}
                    id="numItemsPerPage"
                    name="numItemsPerPage"
                  >
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={45}>45</option>
                    <option value={60}>60</option>
                    <option value={mapShopItemsArray.length}>all</option>
                  </Dropdown>
                  items per page
                </NumItems>
                {mapShopItemsArray.length > maxNumItemsPerPage && (
                  <>
                    <PagesList>
                      <PageNav
                        onClick={() => {
                          currentPage > 1 && goToPage(currentPage - 1);
                        }}
                      >
                        PREV
                      </PageNav>
                      {pagesArray.map((pageNum) => {
                        return (
                          <PageNav
                            style={{
                              backgroundColor:
                                currentPage === pageNum ? "#aa80ff" : "#ccccff",
                            }}
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                          >
                            {pageNum}
                          </PageNav>
                        );
                      })}
                      <PageNav
                        onClick={() => {
                          currentPage < pagesArray.length &&
                            goToPage(currentPage + 1);
                        }}
                      >
                        NEXT
                      </PageNav>
                    </PagesList>
                  </>
                )}
              </Pagination>
            </Display>
          )}
        </ShopDiv>
        <Cart />
        <PurchaseModal />
      </ShopPageAll>
    </>
  );
};

const Pagination = styled.div`
  padding: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NumItems = styled.div`
  color: #8080ff;
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
  /* width: 40%; */
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
