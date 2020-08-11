import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeCart, updateQuantity } from "../actions";

const CartItem = ({ item, price, quantity, name, id }) => {
  const dispatch = useDispatch();

  return (
    <CartItemDiv>
      <ItemName>
        <div>{name}</div>
        <CloseButton onClick={() => dispatch(removeCart(item))}>X</CloseButton>
      </ItemName>
      <QuantityDiv>
        <label htmlFor="quantity">Quantity:</label>
        <QuantityInput
          onChange={(ev) => {
            const quantityValue = Number(ev.target.value);
            dispatch(updateQuantity({ id, quantity: quantityValue }));
          }}
          type="text"
          id="quantity"
          name="quantity"
          value={quantity}
        ></QuantityInput>
      </QuantityDiv>
    </CartItemDiv>
  );
};
const CartItemDiv = styled.div``;

const QuantityDiv = styled.div``;

const QuantityInput = styled.input`
  width: 25px;
  margin-left: 10px;
`;

const CloseButton = styled.button`
  border: none;
  outline: none;
  width: 30px;
  height: 20px;
  background-color: #8080ff;
  color: white;
  &:hover {
    cursor: pointer;
    background-color: white;
    color: #8080ff;
  }
`;

const ItemName = styled.div`
  display: flex;
`;

export default CartItem;
