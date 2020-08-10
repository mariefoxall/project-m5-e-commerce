import styled from "styled-components";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStoreItem } from "./reducers/item.reducer";
import { useParams } from "react-router-dom";
import { receiveItem } from "../actions";

const ItemDetails = () => {
  const params = useParams();
  const id = params.itemId;

  const dispatch = useDispatch();

  const handleItem = (id) => {
    fetch(`/items/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveItem(json));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleItem(id);
  }, []);

  const item = useSelector(getStoreItem);
  console.log(item);

  const stateObject = useSelector((state) => state);
  //console.log(stateObject, "state object");

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
