import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { receiveItems, receiveCompanies } from "../actions";

import LandingPage from "./LandingPage";
import Shop from "./Shop";
import ItemDetails from "./ItemDetails";

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
            <Shop />
          </Route>
          <Route path="/items/:itemId">
            <ItemDetails />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
