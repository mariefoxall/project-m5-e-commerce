import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { addCart } from "../actions";
import { Link, useHistory } from "react-router-dom";

const ShopItem = (item) => {
  const dispatch = useDispatch();
  // console.log(item);

  let history = useHistory();
  const handleClick = () => {
    history.push(`/items/${item.item.id}`);
  };
  return (
    <ItemDiv
      style={{
        border: `10px solid rgb(${Math.floor(
          Math.random() * 50 + 120
        )},${Math.floor(Math.random() * 155)},${Math.floor(
          Math.random() * 20 + 235
        )})`,
      }}
    >
      <img src={item.item.imageSrc} alt={`${item.item.name} product`} />
      {/* <Link to={`/items/${item.item.id}`}> */}
      <ItemInfoHover onClick={() => handleClick()}>
        <Name>{item.item.name}</Name>
        <SoldOut>{item.item.numInStock === 0 && <p>SOLD OUT</p>}</SoldOut>
        <AddCartButton
          disabled={item.item.numInStock === 0 ? true : false}
          onClick={(ev) => {
            ev.stopPropagation();
            dispatch(addCart(item.item));
          }}
        >
          Add to Cart - {item.item.price}
        </AddCartButton>
        {/* <Price>{item.item.price}</Price> */}
      </ItemInfoHover>
      {/* </Link> */}
    </ItemDiv>
  );
};
const ItemDiv = styled.div`
  height: 300px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  background-color: white;
  position: relative;
`;

const ItemInfoHover = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  height: 300px;
  width: 300px;
  opacity: 0;
  background-color: #000066;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 20px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Name = styled.h3`
  font-family: sans-serif;
  text-align: center;
`;

const Price = styled.h3`
  font-family: sans-serif;
  text-align: center;
`;

const SoldOut = styled.h2`
  font-family: sans-serif;
  text-align: center;
  padding: 5px;
  color: red;
`;

const AddCartButton = styled.button`
  z-index: 3;
  background-color: #8080ff;
  color: white;
  border: none;
  outline: none;
  padding: 5px 10px;
  font-family: "Spartan";
  font-size: 16px;
  &:hover {
    cursor: pointer;
    background-color: white;
    color: #8080ff;
  }
`;
export default ShopItem;
