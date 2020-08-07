"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = 4000;

const { handleItems } = require("./handlers");

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
  .get("/", (req, res) => res.status(200).send("Try /bacon or /items"))

  //ITEMS
  .get("/items", handleItems)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
