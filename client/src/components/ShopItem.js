import React from "react";

const ShopItem = (item) => {
  return (
    <div>
      <img src={item.imageSrc} alt={`${item.name} product`} />
      <h3>{item.name}</h3>
      {item.numInStock === 0 && <p>SOLD OUT</p>}
    </div>
  );
};

export default ShopItem;
