import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

type Payload = {
  sub: string;
};

export function isAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }

    const { sub } = verify(token as string, jwtSecret) as Payload;

    req.userId = sub;

    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
}
