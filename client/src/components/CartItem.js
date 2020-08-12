import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeCart, updateQuantity } from "../actions";

const CartItem = ({ item, price, quantity, name, id }) => {
  const dispatch = useDispatch();
  console.log(item);

  let quantityStyle = { color: "black" };
  let stockAlert = false;

  const [quantityValue, setQuantityValue] = React.useState(1);

  if (Number(quantityValue) > Number(item.numInStock)) {
    quantityStyle = { backgroundColor: "red" };
    stockAlert = true;
  }

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
            setQuantityValue(Number(ev.target.value));
            dispatch(updateQuantity({ id, quantity: quantityValue }));
          }}
          type="text"
          id="quantity"
          name="quantity"
          value={item.quantity}
          style={quantityStyle}
        ></QuantityInput>

        {stockAlert && <StockAlert> {item.numInStock} in stock</StockAlert>}
      </QuantityDiv>
    </CartItemDiv>
  );
};
const CartItemDiv = styled.div``;

const QuantityDiv = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityInput = styled.input`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  font-family: "Spartan";
  border: none;
  outline: none;
`;

const StockAlert = styled.div`
  color: red;
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
