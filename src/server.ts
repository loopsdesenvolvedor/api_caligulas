import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";

const PORT = process.env.PORT;
import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
