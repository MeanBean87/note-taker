const fs = require("fs");
const path = require("path");

const dbUtils = {
  // Reads the db file and returns the notes
  readNotes: async () => {
    try {
      const data = await fs.promises.readFile(
        path.join(__dirname, "../db", "db.json"),
        "utf8"
      );
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading db.json", err);
      return [];
    }
  },

  // Adds a new note to the db file
  writeNotes: async (notes) => {
    try {
      await fs.promises.writeFile(
        path.join(__dirname, "../db", "db.json"),
        JSON.stringify(notes, null, 4)
      );
    } catch (err) {
      console.error("Error writing db.json", err);
      return [];
    }
  },
};

module.exports = dbUtils;
