import React from "react";
import CartItem from "./CartItem";
import styled from "styled-components";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { getCartItemArray } from "./reducers/cart.reducer";
import { beginPurchaseProcess } from "../actions";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItemArray);
  console.log(cartItems);

  let total = 0;
  let numCartItems = 0;

  cartItems.forEach((item) => {
    console.log(item.price);
    console.log(item.quantity);
    total = total + Number(item.price.slice(1)) * Number(item.quantity);
    numCartItems = Number(numCartItems) + Number(item.quantity);
  });
  return (
    <PageDiv>
      {/* <Header /> */}
      <DivBlock>
        <CartDiv>
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
          <BottomPart>
            <Total>Total: ${total.toFixed(2)}</Total>
            <PurchaseButton
              disabled={cartItems.length > 0 ? false : true}
              onClick={() =>
                dispatch(beginPurchaseProcess({ cartItems, total }))
              }
            >
              Purchase
            </PurchaseButton>
          </BottomPart>
        </CartDiv>
      </DivBlock>
    </PageDiv>
  );
};

const PageDiv = styled.div`
  width: 100vw;
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
`;

const DivBlock = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(to right, #52d7e0, #0036b3);
  flex: 3;
`;

const CartDiv = styled.div`
  /* flex: 3; */
  position: fixed;
  top: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
  padding: 30px;
  height: calc(100vh - 140px);
`;

const CartTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const ListDiv = styled.div`
  overflow-y: scroll;
`;
const ItemDiv = styled.div`
  border: 1px dashed white;
  padding: 10px;
`;

const BottomPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;
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
export default CartPage;
