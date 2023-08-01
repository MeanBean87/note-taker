const express = require("express");
const path = require("path");

const middlewares = express();

//middlewares in use
middlewares.use(express.urlencoded({ extended: true }));
middlewares.use(express.json());
middlewares.use(express.static(path.join(__dirname, "../public")));
middlewares.use("/assets", express.static(path.join(__dirname, "../assets")));

module.exports = middlewares;
