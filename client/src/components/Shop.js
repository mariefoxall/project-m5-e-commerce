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
    setCurrentPage(1);
  };

  const toggleBodyLocation = (ev) => {
    dispatch(updateBodyLocation(ev.target.value));
    setCurrentPage(1);
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

  return (
    <>
      <ShopPageAll>
        <SpacerDiv>
          <FilterDiv>
            <Category>
              <label htmlFor="category">WHAT:</label>
              <Dropdown
                onChange={(ev) => toggleCategory(ev)}
                id="category"
                name="category"
                placeholder="Category"
              >
                <option
                  selected={activeCategory === "All" && "selected"}
                  value="All"
                >
                  Show All
                </option>
                <option
                  selected={activeCategory === "Entertainment" && "selected"}
                  value="Entertainment"
                >
                  Entertainment
                </option>
                <option
                  selected={activeCategory === "Fitness" && "selected"}
                  value="Fitness"
                >
                  Fitness
                </option>
                <option
                  selected={activeCategory === "Gaming" && "selected"}
                  value="Gaming"
                >
                  Gaming
                </option>
                <option
                  selected={activeCategory === "Industrial" && "selected"}
                  value="Industrial"
                >
                  Industrial
                </option>
                <option
                  selected={activeCategory === "Lifestyle" && "selected"}
                  value="Lifestyle"
                >
                  Lifestyle
                </option>
                <option
                  selected={activeCategory === "Medical" && "selected"}
                  value="Medical"
                >
                  Medical
                </option>
                <option
                  selected={activeCategory === "Pets and Animals" && "selected"}
                  value="Pets and Animals"
                >
                  Pets and Animals
                </option>
              </Dropdown>
            </Category>
            <BodyLocation>
              <label htmlFor="bodylocation">WHERE:</label>
              <Dropdown
                onChange={(ev) => toggleBodyLocation(ev)}
                id="bodylocation"
                name="bodylocation"
              >
                <option
                  selected={activeBodyLocation === "All" && "selected"}
                  value="All"
                >
                  Show All
                </option>
                <option
                  selected={activeBodyLocation === "Arms" && "selected"}
                  value="Arms"
                >
                  Arms
                </option>
                <option
                  selected={activeBodyLocation === "Chest" && "selected"}
                  value="Chest"
                >
                  Chest
                </option>
                <option
                  selected={activeBodyLocation === "Feet" && "selected"}
                  value="Feet"
                >
                  Feet
                </option>
                <option
                  selected={activeBodyLocation === "Hands" && "selected"}
                  value="Hands"
                >
                  Hands
                </option>
                <option
                  selected={activeBodyLocation === "Head" && "selected"}
                  value="Head"
                >
                  Head
                </option>
                <option
                  selected={activeBodyLocation === "Neck" && "selected"}
                  value="Neck"
                >
                  Neck
                </option>
                <option
                  selected={activeBodyLocation === "Waist" && "selected"}
                  value="Waist"
                >
                  Waist
                </option>
                <option
                  selected={activeBodyLocation === "Wrist" && "selected"}
                  value="Wrist"
                >
                  Wrist
                </option>
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
              {mapShopItemsArray.length > 30 && (
                <>
                  <NumItems>{maxNumItemsPerPage} items per page</NumItems>
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
                              currentPage === pageNum ? "blue" : "#ccccff",
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
            </Display>
          )}
        </ShopDiv>
        <Cart />
        <PurchaseModal handleItems={handleItems} />
      </ShopPageAll>
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
