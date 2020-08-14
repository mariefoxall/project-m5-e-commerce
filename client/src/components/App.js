import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { receiveItems, receiveCompanies } from "../actions";

import LandingPage from "./LandingPage";
import Shop from "./Shop";
import ItemDetails from "./ItemDetails";
import Header from "./Header";
import CartPage from "./CartPage";
import PurchaseModal from "./PurchaseModal";
import Contact from "./Contact";
import About from "./About";
import ViewOrder from "./ViewOrder";

function App() {
  const dispatch = useDispatch();

  const handleItems = () => {
    fetch("/items")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveItems(json));
      })
      .catch((err) => console.error(err));
  };

  const handleCompanies = () => {
    fetch("/companies")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveCompanies(json));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleItems();
    handleCompanies();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/shop">
            {/* <Header /> */}
            <Shop handleItems={handleItems} />
          </Route>
          <Route path="/items/:itemId">
            <Header />
            <ItemDetails />
          </Route>
          <Route path="/about">
            {/* <Header /> */}
            <About />
          </Route>
          <Route path="/cart">
            <Header />

            <CartPage />
          </Route>
          <Route path="/order">
            <Header />

            <ViewOrder />
          </Route>

          <Route path="/contact">
            <Header />
            <Contact />
          </Route>
        </Switch>
        <PurchaseModal handleItems={handleItems} />
      </Router>
    </>
  );
}

export default App;
