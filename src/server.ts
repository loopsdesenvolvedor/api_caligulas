import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3333;
import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof Error) {
    res.status(400).json({
      message: err.message || "Erro desconhecido",
    });
    return;
  }

  if (err.status && err.message) {
    res.status(err.status).json({
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
  return;
});

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
