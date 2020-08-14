const items = require("./data/items.json");
const companies = require("./data/companies.json");
const orders = require("./data/orders.json");
const contact = require("./data/contact.json");
const { v4: uuidv4 } = require("uuid");

const delayRes = (res, data) => {
  const delay = Math.random() * 5000;

  setTimeout(() => {
    console.log("Waited" + " " + delay / 1000);
    res.status(200).json(data);
  }, delay);
};

const handleItems = (req, res) => {
  delayRes(res, { items });
  //res.status(200).json({ items });
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
  console.log(update);

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

const handleOrders = (req, res) => {
  res.status(200).json({ orders });
};

const handleNewOrder = (req, res) => {
  const orderInfo = req.body;

  const newOrder = {
    id: uuidv4(),
    firstName: orderInfo.firstName,
    lastName: orderInfo.lastName,
    email: orderInfo.email,
    order: orderInfo.cartItems,
    total: orderInfo.total,
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
};

const handleOrderById = (req, res) => {
  const id = req.params.id;

  const getOrderById = (id) => {
    return orders.find((order) => order.id === id);
  };

  const order = getOrderById(id);

  if (order !== undefined) {
    res.status(200).json(order);
  } else {
    return res.status(404).json("Order not found, 404");
  }
};

const handleContact = (req, res) => {
  res.status(200).json({ contact });
};

const handleNewContact = (req, res) => {
  const messageInfo = req.body;

  const newContact = {
    firstName: messageInfo.firstName,
    lastName: messageInfo.lastName,
    email: messageInfo.email,
    subject: messageInfo.subject,
    message: messageInfo.message,
  };

  contact.push(newContact);

  res.status(201).json(newContact);
};

module.exports = {
  handleItems,
  handleItem,
  handleCompanies,
  handleCompany,
  handleItemUpdate,
  handleOrders,
  handleNewOrder,
  handleContact,
  handleNewContact,
  handleOrderById,
};
