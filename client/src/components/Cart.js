import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItemArray } from "./reducers/cart.reducer";
import { beginPurchaseProcess } from "../actions";

import styled from "styled-components";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItemArray);
  console.log(cartItems);

  let total = 0;
  let numCartItems = 0;

  cartItems.forEach((item) => {
    total = total + Number(item.price.slice(1)) * Number(item.quantity);
    numCartItems = numCartItems + item.quantity;
  });

  const orderInStock = cartItems.every(
    (item) => item.quantity <= item.numInStock
  );
  console.log("orderInStock", orderInStock);

  const orderInCart = cartItems.length > 0;
  console.log("orderInCart", orderInCart);

  const okayToPurchase = orderInCart && orderInStock;

  let purchaseButtonStyle = {};

  if (okayToPurchase === false) {
    purchaseButtonStyle = {
      cursor: "auto",
      color: "lightgrey",
      backgroundColor: "grey",
    };
  }

  return (
    <RightSide>
      <CartDiv>
        <TopPart>
          <CartTitle>
            <h3> Your Cart:</h3>
            <p>{numCartItems} item(s)</p>
          </CartTitle>
          <ListDiv>
            {cartItems.map((item) => {
              return (
                <ItemDiv key={item.id}>
                  <CartItem
                    price={item.price}
                    quantity={item.quantity}
                    name={item.name}
                    id={item.id}
                    item={item}
                  />
                </ItemDiv>
              );
            })}
          </ListDiv>
        </TopPart>
        <BottomPart>
          <Total>Total: ${total.toFixed(2)}</Total>
          <PurchaseButton
            disabled={okayToPurchase ? false : true}
            onClick={() => dispatch(beginPurchaseProcess({ cartItems, total }))}
            style={purchaseButtonStyle}
          >
            Purchase
          </PurchaseButton>
        </BottomPart>
      </CartDiv>
    </RightSide>
  );
};
const TopPart = styled.div`
  /* max-height: calc(100vh-240px); */
  position: fixed;
  top: 140px;
  display: flex;
  flex-direction: column;
`;

const RightSide = styled.div`
  border: 2px solid green;
  /* display: flex; */
  flex: 1;
  border-left: 2px dotted #8080ff;
`;

const CartDiv = styled.div`
  height: calc(100vh - 120px);
  background-color: #ccccff;
  position: fixed;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border: 2px solid red;
  /* flex: 1; */
  width: calc(20% - 20px);
`;

const CartTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;

const ListDiv = styled.div`
  /* flex-grow: 3; */
  /* overflow-y: scroll; */
`;
const ItemDiv = styled.div`
  border: 1px dashed white;
  padding: 10px;
`;

const BottomPart = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 20px;
  position: fixed;
  bottom: 0;
  right: 20px;
  justify-content: space-between;
  width: inherit;
  padding: 20px;
`;

const Total = styled.div`
  color: white;
`;

const PurchaseButton = styled.button`
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
export default Cart;
