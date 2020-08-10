const items = require("./data/items.json");
const companies = require("./data/companies.json");

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

module.exports = { handleItems, handleItem, handleCompanies, handleCompany };
