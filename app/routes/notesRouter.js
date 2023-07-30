const express = require("express");
const router = express.Router();
const path = require("path");
const notesController = require("../controllers/notesController");

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("/api/notes", notesController.getNotes);

router.post("/api/notes", notesController.addNote);

router.delete("/api/notes/:id", notesController.deleteNote);

module.exports = router;
