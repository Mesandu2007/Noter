const router = require("express").Router();
const noteController = require("../controllers/noteController");
const auth = require("../middleware/auth");

router.post("/", auth, noteController.createNote);
router.get("/", auth, noteController.getNotes);
router.put("/:id", auth, noteController.updateNote);
router.delete("/:id", auth, noteController.deleteNote);

router.patch("/:id/pin", auth, noteController.togglePin);
router.patch("/:id/favorite", auth, noteController.toggleFavorite);

module.exports = router;