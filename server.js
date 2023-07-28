//imports
const express = require("express");
const path = require("path");
const fs = require("fs");

//setting port and setting app to express
const app = express();
const PORT = 3000;

//Use for data parsing and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

//Reads the db.json file and returns all saved notes. 
const readNotes = () => {
  try {
    const data = fs.readFileSync("./db/db.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading db.json", err);
    return [];
  }
};
