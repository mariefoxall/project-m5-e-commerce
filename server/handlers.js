const items = require("./data/items.json");

const handleItems = (req, res) => {
  res.status(200).json({ items });
};

module.exports = { handleItems };
