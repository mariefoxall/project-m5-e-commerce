import styled from "styled-components";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStoreItem } from "./reducers/item.reducer";
import { getCompany } from "./reducers/company.reducer";
import { useParams } from "react-router-dom";
import { receiveItem, receiveCompany } from "../actions";

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

  const handleCompany = (id) => {
    fetch(`/companies/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveCompany(json));
      })
      .catch((err) => console.error(err));
  };

  const item = useSelector(getStoreItem);

  useEffect(() => {
    handleItem(id);
    if (item.status === "idle") {
      handleCompany(item.item.companyId);
    }
  }, [item.status]);

  const company = useSelector(getCompany);

  console.log(item, "item");
  console.log(company, "company");

  if (item.status === "loading") {
    return <>LOADING</>;
  } else {
    return (
      <ItemDiv>
        {item.item.numInStock === 0 ? (
          <ImageDiv>
            <SoldOut>SOLD OUT</SoldOut>
            <ItemImage
              src={item.item.imageSrc}
              alt={`${item.item.name} product`}
            />
          </ImageDiv>
        ) : (
          <ItemImage
            src={item.item.imageSrc}
            alt={`${item.item.name} product`}
          />
        )}
        <ItemInfo>
          <ItemName>{item.item.name}</ItemName>
          <ItemPrice>{item.item.price}</ItemPrice>
          <ItemCompany>Company Name</ItemCompany>
          {item.item.numInStock === 0 ? null : (
            <PurchaseButton>ADD TO CART</PurchaseButton>
          )}
        </ItemInfo>
      </ItemDiv>
    );
  }
};

const ItemDiv = styled.div`
  font-family: sans-serif;
  width: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageDiv = styled.div``;

const SoldOut = styled.div`
  width: 100px;
  height: 50px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemImage = styled.img`
  min-height: 400px;
  min-width: 400px;
  overflow: hidden;
`;

const ItemInfo = styled.div`
  margin-left: 30px;
  width: 400px;
`;

const ItemName = styled.h1``;

const ItemPrice = styled.p``;

const ItemCompany = styled.p``;

const PurchaseButton = styled.button`
  background-color: #aa80ff;
  color: white;
  border: none;
  padding: 10px 20px;
  &:hover {
    cursor: pointer;
    background-color: #443366;
  }
`;

export default ItemDetails;
