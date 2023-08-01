const express = require("express");
const middlewares = require("./app/middlewares/middleware");
const notesRouter = require("./app/routes/notesRouter");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(middlewares);

app.use("/", notesRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./app/public/index.html"));
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
