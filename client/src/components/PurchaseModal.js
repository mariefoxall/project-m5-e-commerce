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
  const purchaseInfo = useSelector((state) => state.purchase);
  //console.log("purchaseInfo", purchaseInfo);
  //   const purchaseItems = purchaseInfo.selectedItems;
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItemArray);
  const purchaseStatus = purchaseInfo && purchaseInfo.status;
  //console.log(purchaseStatus);

  const handleUpdateNumInStock = (cartItemArray) => {
    //console.log({ update: cartItemArray });
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
        <DialogTitle id="purchase-form-dialog">Purchase Items</DialogTitle>
        <DialogContent>
          <h2>Please verify the contents of your cart:</h2>
          {/* <DialogContentText> */}
          {cartItems.map((item) => {
            return (
              <div key={item.id}>
                <CartItem
                  price={item.price}
                  quantity={item.quantity}
                  name={item.name}
                  id={item.id}
                  item={item}
                />
              </div>
            );
          })}
          <div>Total: ${total.toFixed(2)}</div>
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogContent>
          <h3>Enter Payment Details:</h3>
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
            <button
              onClick={(ev) => {
                handleUpdateNumInStock(
                  cartItems
                  // creditCard,
                  // expiration,
                  // total
                );
                handleItems();
              }}
            >
              Confirm Purchase
            </button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PurchaseModal;
