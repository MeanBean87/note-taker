const express = require("express");
const router = express.Router();
const path = require("path");
const notesController = require("../controllers/notesController");

//get route for /notes
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//get route for /api/notes
router.get("/api/notes", notesController.getNotes);

//post route for /api/notes
router.post("/api/notes", notesController.addNote);

//delete route for /api/notes/:id
router.delete("/api/notes/:id", notesController.deleteNote);

module.exports = router;
