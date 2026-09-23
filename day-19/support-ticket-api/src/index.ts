import express, { Request, Response } from "express";
import ticketRouter from "./router/ticket.router.js";
import adminTicketRouter from "./router/adminTicket.router.js";
import userRouter from "./router/user.router.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from 'cors';
import { pinoHttp } from "pino-http";
import { logger } from "./lib/logger.js";
import { randomUUID } from "node:crypto";

export const app = express();

const limiter = rateLimit({
  windowMs: 16 * 60 * 1000,
  max: 50,
  message: "rate limit exceeded.Try again later.",
});

app.use(express.json({ limit: "20kb" }));
app.use(limiter);
app.use(helmet());
app.use(cors({}))

app.use(pinoHttp({
  logger,
  quietReqLogger: true,
  quietResLogger: true,
  genReqId(req) {
    return req.headers["x-request-id"] || randomUUID()
  }
}))

app.use("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "server running...",
  });
});

app.use("/api/ticket", ticketRouter);
app.use("/api/admin/ticket", adminTicketRouter);

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log(`server running on port : 3000`);
});
