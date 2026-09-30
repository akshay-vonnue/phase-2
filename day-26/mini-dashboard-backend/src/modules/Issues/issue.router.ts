import Router from "express";
import {
  createIssue,
  deleteIssue,
  getAll,
  updateIssue,
  getIssue
} from "./issue.controller";

const router = Router();

router.get("/all", getAll);
router.post("/create", createIssue);
router.delete("/delete/:id", deleteIssue);
router.put("/update/:id", updateIssue);

router.get("/:id",getIssue)

export default router;
