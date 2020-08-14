import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemArray } from "./reducers/cart.reducer";
import { removeCart, updateQuantity } from "../actions";

const CartItem = ({ item, price, quantity, name, id }) => {
  const dispatch = useDispatch();
  console.log(item);

  const cartItemsArray = useSelector(getCartItemArray);
  console.log("cartItemsArray", cartItemsArray);
  const currentItem = cartItemsArray.find((item) => item.id === id);
  console.log("currentItem", currentItem);

  let quantityStyle = { color: "black" };
  let stockAlert = false;

  // const [quantityValue, setQuantityValue] = React.useState(1);

  if (Number(currentItem.quantity) > Number(item.numInStock)) {
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
            // setQuantityValue(Number(ev.target.value));
            dispatch(updateQuantity({ id, quantity: ev.target.value }));
          }}
          type="text"
          id="quantity"
          name="quantity"
          value={currentItem.quantity}
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
  font-size: 12px;
`;

const CloseButton = styled.button`
  border: none;
  outline: none;
  width: 30px;
  height: 20px;
  background-color: #006666;
  color: white;
  &:hover {
    cursor: pointer;
    background-color: #28bbbd;
  }
`;

const ItemName = styled.div`
  display: flex;
`;

export default CartItem;
