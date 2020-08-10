import React from "react";

import styled from "styled-components";

const ShopItem = (item) => {
  // console.log(item);
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
      <ItemInfoHover>
        <Name>{item.item.name}</Name>
        <SoldOut>{item.item.numInStock === 0 && <p>SOLD OUT</p>}</SoldOut>
        <Price>{item.item.price}</Price>
      </ItemInfoHover>
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
  top: 0;
  left: 0;
  height: 300px;
  width: 300px;
  opacity: 0;
  background-color: #000066;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  z-index: 2;
  padding: 10px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.7;
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
export default ShopItem;
