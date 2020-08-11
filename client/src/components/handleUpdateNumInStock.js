const handleUpdateNumInStock = (cartItemArray) => {
  console.log(cartItemArray);
  fetch(`/items`, {
    method: "PUT",
    body: JSON.stringify({ cartItemArray }),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  }).then((res) => console.log(res));
};
