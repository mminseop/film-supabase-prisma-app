import express from "express";
import { createOne, getAll, deleteOne, updateOne } from "./controller.mjs";

const router = express.Router();
// router.get("/:commentId", getAll);
// router.post("/", createOne);
// router.delete("/comments/:commentId", deleteOne);
// router.put("/comments/:commentId", updateOne);

export const commentRouter = router;
export const commentGetRouter = getAll;
export const commentCreateRouter = createOne;
export const commentDeleteRouter = deleteOne;
export const commentUpdateRouter = updateOne;