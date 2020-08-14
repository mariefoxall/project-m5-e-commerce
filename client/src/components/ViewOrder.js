import React from "react";
import CartItem from "./CartItem";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getCartItemArray } from "./reducers/cart.reducer";
import { beginPurchaseProcess, receiveOrder, requestOrder } from "../actions";
import { getOrder } from "./reducers/order.reducer";
// const { requestOrder } = require("../actions");

const ViewOrder = () => {
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

  const [orderNumber, setOrderNumber] = React.useState("");
  console.log(orderNumber);

  // const handleGetOrderInfo = () => {
  //   handleOrderById(orderNumber);
  //   console.log("inside handlegetorderinfo");
  // };

  const handleOrderById = (id) => {
    console.log("inside handleOrderById");
    dispatch(requestOrder());
    fetch(`/orders/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveOrder(json));
      })
      .catch((err) => console.error(err));
  };

  const yourOrder = useSelector(getOrder);
  console.log(yourOrder);

  return (
    <PageDiv>
      <form>
        <InputDiv>
          <label htmlFor="orderNumber">Please enter your order number:</label>
          <OrderNumberInput
            type="text"
            id="orderNumber"
            name="orderNumber"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          ></OrderNumberInput>
        </InputDiv>
        <SubmitButton
          onClick={() => {
            // preventDefault();
            handleOrderById(orderNumber);
          }}
        >
          SUBMIT
        </SubmitButton>
      </form>
      {/* <DivBlock>
        <CartDiv>
          <CartTitle>
            <h3> Your Order:</h3>
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
      </DivBlock> */}
    </PageDiv>
  );
};

const OrderNumberInput = styled.input``;

const InputDiv = styled.div`
  color: black;
`;

const SubmitButton = styled.button``;

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
export default ViewOrder;
