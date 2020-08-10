import { combineReducers } from "redux";

import items from "./items.reducer";
import item from "./item.reducer";
import companies from "./companies.reducer";
import company from "./company.reducer";
import filter from "./filter.reducer";

export default combineReducers({ items, companies, company, item, filter });
