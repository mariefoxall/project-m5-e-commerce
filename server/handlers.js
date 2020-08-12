const items = require("./data/items.json");
const companies = require("./data/companies.json");
const { uuidv4 } = require("uuid");

const handleItems = (req, res) => {
  res.status(200).json({ items });
};

const handleItem = (req, res) => {
  const id = Number(req.params.id);

  const getItemById = (id) => {
    return items.find((item) => item.id === id);
  };

  const item = getItemById(id);

  if (item !== undefined) {
    res.status(200).json(item);
  } else {
    res.status(404).json("Item not found, 404");
  }
};

const handleCompanies = (req, res) => {
  res.status(200).json({ companies });
};

const handleCompany = (req, res) => {
  const id = Number(req.params.id);

  const getCompanyById = (id) => {
    return companies.find((company) => company.id === id);
  };

  const company = getCompanyById(id);

  if (company !== undefined) {
    res.status(200).json(company);
  } else {
    res.status(404).json("Company not found, 404");
  }
};

const handleItemUpdate = (req, res) => {
  const update = req.body;

  const updateArray = Object.values(update)[0];

  const applyUpdate = () => {
    const getItemIndexById = (id) => {
      return items.findIndex((item) => item.id === id);
    };
    const returnArray = [];

    updateArray.forEach((item) => {
      const itemId = item.id;
      const quantity = item.quantity;
      const itemIndex = getItemIndexById(itemId);
      const itemPurchased = items[itemIndex];
      returnArray.push(itemPurchased);
      const numInStockBefore = items[itemIndex].numInStock;
      return (items[itemIndex].numInStock = numInStockBefore - quantity);
    });
    return returnArray;
  };

  purchasedItems = applyUpdate();
  res.status(200).json(purchasedItems);
};

const handleOrder = (req, res) => {
  const orderInfo = req.body;
  const id = uuidv4();
  console.log(id);

  res.status(200).json(orderConfirmed);
};

module.exports = {
  handleItems,
  handleItem,
  handleCompanies,
  handleCompany,
  handleItemUpdate,
  handleOrder,
};
