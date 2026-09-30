import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import issueRouter from "./modules/Issues/issue.router";
import projectRouter from "./modules/projects/project.router";
import userRouter from "./modules/user/user.router";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: `http://localhost:5173`,
  }),
);
app.use(express.json());
app.use("/issue", issueRouter);
app.use("/project", projectRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running on port`, process.env.PORT);
});
