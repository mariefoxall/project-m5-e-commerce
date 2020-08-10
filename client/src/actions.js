// export const requestItems = () => ({
//   type: "REQUEST_ITEMS",
// });

export const receiveItems = (items) => ({
  type: "RECEIVE_ITEMS",
  items,
});

export const receiveCompanies = (companies) => ({
  type: "RECEIVE_COMPANIES",
  companies,
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
