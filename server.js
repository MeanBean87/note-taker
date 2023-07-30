// //imports
// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");

// //setting port and setting app to express
// const app = express();
// const PORT = process.env.PORT || 3000;

// //middleware for parsing json and urlencoded form data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/assets", express.static(path.join(__dirname, "assets")));

// //Reads the db.json file and returns all saved notes.
// const readNotes = () => {
//   try {
//     const data = fs.readFileSync("./db/db.json", "utf8");
//     return JSON.parse(data);
//   } catch (err) {
//     console.error("Error reading db.json", err);
//     return [];
//   }
// };

// //returns the index.html file
// app.get("/", (req, res) => {
//   console.log(req);
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// //returns the notes.html file
// app.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "notes.html"));
// });

// //reads the db file and returns the notes
// app.get("/api/notes", async (req, res) => {
//   const notes = await readNotes();
//   res.json(notes);
// });

// //adds a new note to the db file
// app.post("/api/notes", async (req, res) => {
//   try {
//     const newNote = req.body;
//     newNote.id = uuidv4();
//     const notes = await readNotes();
//     notes.push(newNote);
//     fs.writeFileSync("./db/db.json", JSON.stringify(notes));
//     res.json(notes);
//   } catch (err) {
//     console.error("Error writing db.json", err);
//     res.status(500).json({ error: "Failed to write note" });
//   }
// });

// //deletes a note from the db file
// app.delete("/api/notes/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const notes = await readNotes();
//     const updatedNotes = notes.filter((note) => note.id !== id);
//     fs.writeFileSync(
//       "./db/db.json",
//       JSON.stringify(updatedNotes, null, 2)
//     );
//     res.json(updatedNotes);
//   } catch (err) {
//     console.error("Error writing db.json", err);
//     res.status(500).json({ error: "Failed to write note" });
//   }
// });

// //wildcard route to return the index.html file
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// //listener
// app.listen(PORT, function () {
//   console.log(`Server started on port ${PORT}`);
// });


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