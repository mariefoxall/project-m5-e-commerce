import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import styled from "styled-components";
import CartItem from "./CartItem";
import { cancelPurchaseProcess, NumInStockUpdateSuccess } from "../actions";
import { getCartItemArray } from "./reducers/cart.reducer";

const PurchaseModal = ({ handleItems }) => {
  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [email, setEmail] = React.useState("");
  const purchaseInfo = useSelector((state) => state.purchase);
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItemArray);
  const purchaseStatus = purchaseInfo && purchaseInfo.status;

  const handleUpdateNumInStock = (cartItemArray) => {
    fetch(`/items`, {
      method: "PUT",
      body: JSON.stringify({ update: cartItemArray }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleNewOrder = (firstName, lastName, email, cartItems, total) => {
    fetch(`/orders`, {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        cartItems: cartItems,
        total: total,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleClose = () => {
    dispatch(cancelPurchaseProcess());
  };
  let total = 0;
  cartItems.forEach((item) => {
    //console.log(item.price);
    //console.log(item.quantity);
    total = total + Number(item.price.slice(1)) * Number(item.quantity);
  });
  return (
    <div>
      <Dialog
        open={purchaseStatus === "begin-purchase"}
        onClose={handleClose}
        aria-labelledby="purchase-form-dialog"
      >
        <DialogTitle id="purchase-form-dialog" />
        <All>
          <DialogContent>
            <CartTitle>Please verify the contents of your cart:</CartTitle>
            <ItemsList>
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
              <div>Total: ${total.toFixed(2)}</div>
            </ItemsList>
          </DialogContent>
          <DialogContent>
            <h3>Enter Payment Details:</h3>
            <TextField
              autoComplete="on"
              onChange={(ev) => setFirstName(ev.target.value)}
              autoFocus
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
            />
            <TextField
              onChange={(ev) => setLastName(ev.target.value)}
              autoFocus
              margin="dense"
              label="Last Name"
              type="text"
              fullWidth
            />
            <TextField
              onChange={(ev) => setEmail(ev.target.value)}
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
            />
            <TextField
              onChange={(ev) => setCreditCard(ev.target.value)}
              autoFocus
              margin="dense"
              label="Credit Card"
              type="text"
              fullWidth
            />
            <TextField
              onChange={(ev) => setExpiration(ev.target.value)}
              autoFocus
              margin="dense"
              label="Expiration"
              type="text"
              fullWidth
            />
            <DialogActions>
              <ConfirmButton
                onClick={() => {
                  handleUpdateNumInStock(cartItems);
                  handleNewOrder(firstName, lastName, email, cartItems, total);
                  handleItems();
                }}
              >
                Confirm Purchase
              </ConfirmButton>
            </DialogActions>
          </DialogContent>
        </All>
      </Dialog>
    </div>
  );
};

const All = styled.div`
  display: flex;
`;

const ConfirmButton = styled.button`
  background-color: #8080ff;
  color: white;
  border: none;
  outline: none;
  padding: 5px 10px;
  font-family: "Spartan";
  font-size: 16px;
  &:hover {
    cursor: pointer;
    background-color: #ccccff;
    /* border: 1px solid #8080ff; */
    color: #8080ff;
  }
`;
const CartTitle = styled.h3`
  margin-bottom: 20px;
`;
const ItemDiv = styled.div`
  border: 1px dashed #8080ff;
  padding: 10px;
`;

const ItemsList = styled.div`
  overflow-y: scroll;
`;

export default PurchaseModal;
