import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItemArray } from "./reducers/cart.reducer";
import { beginPurchaseProcess, closeCart } from "../actions";

import styled from "styled-components";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItemArray);
  console.log(cartItems);

  let total = 0;
  let numCartItems = 0;

  cartItems !== undefined &&
    cartItems.forEach((item) => {
      total = total + Number(item.price.slice(1)) * Number(item.quantity);
      numCartItems = Number(numCartItems) + Number(item.quantity);
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

  const cartVisibility = useSelector((state) => state.cart.status);

  console.log(cartVisibility);
  return (
    <RightSide>
      <CartDiv style={{ visibility: cartVisibility }}>
        <CloseDiv>
          <CloseButton onClick={() => dispatch(closeCart())}>></CloseButton>
        </CloseDiv>
        <CartItemsPurchase>
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
            <Total>
              Total:
              {/* ${total.toFixed(2)} */}
            </Total>
            <PurchaseButton
              disabled={okayToPurchase ? false : true}
              onClick={() =>
                dispatch(beginPurchaseProcess({ cartItems, total }))
              }
              style={purchaseButtonStyle}
            >
              Purchase
            </PurchaseButton>
          </BottomPart>
        </CartItemsPurchase>
      </CartDiv>
    </RightSide>
  );
};

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
const CloseDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20px;
`;
const TopPart = styled.div`
  /* max-height: calc(100vh-240px); */
  /* position: absolute; */
  top: 20px;
  display: flex;
  flex-direction: column;
  /* flex: 3; */
`;

const RightSide = styled.div`
  /* display: flex; */
  flex: 1;
  /* border-left: 2px dotted #8080ff; */
`;
const CartItemsPurchase = styled.div`
  height: calc(100vh - 180px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CartDiv = styled.div`
  background-color: #ccccff;
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 20px;
  width: 20%;
`;

const CartTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  /* position: sticky; */
`;

const ListDiv = styled.div`
  overflow-y: auto;
  height: calc(100vh - 240px);
`;
const ItemDiv = styled.div`
  border: 1px dashed white;
  padding: 10px;
`;

const BottomPart = styled.div`
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  margin-bottom: 20px;
  justify-content: space-between;
  /* flex: 1; */
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
