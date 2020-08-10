import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getStoreItem } from "./reducers/item.reducer";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { itemId } = useParams();
  console.log(itemId, "item");
  const ItemDetailsArray = useSelector(getStoreItem);
  const stateObject = useSelector((state) => state);
  console.log(stateObject, "state object");
  console.log(ItemDetailsArray, "item array");

  if (stateObject)
    return (
      <ItemDiv>
        <ImageDiv>
          <SoldOut>SOLD OUT</SoldOut>
          <ItemImage />
        </ImageDiv>
        <ItemInfo>
          <ItemName>name</ItemName>
          <ItemPrice>price</ItemPrice>
          <ItemCompany>company</ItemCompany>
        </ItemInfo>
      </ItemDiv>
    );
};

const ItemDiv = styled.div`
  margin: 50px;
  display: flex;
`;

const ImageDiv = styled.div`
  width: 500px;
  height: 500px;
  background-color: lightblue;
`;

const SoldOut = styled.div`
  width: 100px;
  height: 50px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 400px;
`;

const ItemImage = styled.img``;

const ItemInfo = styled.div`
  margin-left: 30px;
`;

const ItemName = styled.h1``;

const ItemPrice = styled.p``;

const ItemCompany = styled.p``;

export default ItemDetails;
