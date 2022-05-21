import express from "express";
import {
  findAll,
  findOne,
  create,
  update,
  destroy,
} from "../controllers/Post.js";

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", destroy);

export default router;
