"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = 4000;

const {
  handleItems,
  handleItem,
  handleCompanies,
  handleCompany,
  handleItemUpdate,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?

  //TEST
  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  //GENERIC
  .get("/", (req, res) =>
    res.status(200).json("Try /bacon or /items or /companies")
  )

  //ITEMS
  .get("/items", handleItems)
  .get("/items/:id", handleItem)
  .put("/items", handleItemUpdate) // <----- THIS ONE YOU CALL WITH {"quantityPurchased": 1}

  //COMPANIES
  .get("/companies", handleCompanies)
  .get("/companies/:id", handleCompany)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
