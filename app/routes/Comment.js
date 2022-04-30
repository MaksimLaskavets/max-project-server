const express = require("express");
const CommentController = require("../controllers/Comment");

const router = express.Router();

router.get("/", CommentController.findAll);
router.get("/:id", CommentController.findOne);
router.post("/", CommentController.create);
router.patch("/:id", CommentController.update);
router.delete("/:id", CommentController.destroy);

module.exports = router;
