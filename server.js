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

//returns the index.html file
app.get("/", (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//reads the db file and returns the notes
app.get("/api/notes", async (req, res) => {
  const notes = await readNotes();
  res.json(notes);
});

//adds a new note to the db file
app.post("/api/notes", async (req, res) => {
  try {
    const newNote = req.body;
    const notes = await readNotes();
    notes.push(newNote);
    await fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
  } catch (err) {
    console.error("Error writing db.json", err);
    res.status(500).json({ error: "Failed to write note" });
  }
});

//deletes a note from the db file
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await readNotes();
    const updatedNotes = notes.filter((note) => note.title !== id);
    await fs.writeFileSync(
      "./db/db.json",
      JSON.stringify(updatedNotes, null, 2)
    );
    res.json(updatedNotes);
  } catch (err) {
    console.error("Error writing db.json", err);
    res.status(500).json({ error: "Failed to write note" });
  }
});
