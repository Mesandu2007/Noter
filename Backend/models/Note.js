const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    content: String,
    tags: [String],

    isPinned: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);