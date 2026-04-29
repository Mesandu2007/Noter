const Note = require("../models/Note");

/* CREATE */
exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* GET ALL NOTES */
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* UPDATE */
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // check if note exists
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // check ownership
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    // update fields
    Object.assign(note, req.body);

    const updatedNote = await note.save();

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* DELETE */
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // check if note exists
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // check ownership
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await note.deleteOne();

    res.json({ msg: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* PIN */
exports.togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* FAVORITE */
exports.toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    note.isFavorite = !note.isFavorite;
    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};