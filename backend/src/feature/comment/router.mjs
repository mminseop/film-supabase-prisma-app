import express from "express";
import { createOne, getAll, deleteOne } from "./controller.mjs";

const router = express.Router();
// router.get("/:commentId", getAll);
// router.post("/", createOne);
// router.delete("/comments/:commentId", deleteOne);

export const commentRouter = router;
export const commentGetRouter = getAll;
export const commentCreateRouter = createOne;
export const commentDeleteRouter = deleteOne;
