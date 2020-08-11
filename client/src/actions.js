export const receiveItems = (items) => ({
  type: "RECEIVE_ITEMS",
  items,
});

export const receiveCompanies = (companies) => ({
  type: "RECEIVE_COMPANIES",
  companies,
});

export const receiveCompany = (company) => ({
  type: "RECEIVE_COMPANY",
  company,
});

export const requestItem = () => ({
  type: "REQUEST_ITEM",
});

export const receiveItem = (item) => ({
  type: "RECEIVE_ITEM",
  item,
});

export const updateCategory = (category) => ({
  type: "UPDATE_CATEGORY",
  category,
});

export const updateBodyLocation = (bodyLocation) => ({
  type: "UPDATE_BODYLOCATION",
  bodyLocation,
});

export const addCart = (item) => ({
  type: "ADD_ITEM",
  item,
});

export const removeCart = (item) => ({
  type: "REMOVE_ITEM",
  item,
});

export const updateQuantity = (item) => ({
  type: "UPDATE_QUANTITY",
  item,
});
