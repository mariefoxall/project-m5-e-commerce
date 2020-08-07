import React, { useState, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import Shop from "./Shop";
import ItemDetails from "./ItemDetails";

function App() {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch("/bacon")
      .then((res) => res.json())
      .then((data) => setBacon(data));
  }, []);

  return (
    // <div>{bacon ? bacon : `...where's my stuff?...`}</div>
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
  );
}

export default App;
