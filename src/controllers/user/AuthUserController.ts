import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const authUserService = new AuthUserService();
      const auth = await authUserService.execute({ email, password });

      res.status(200).json(auth);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }
}

export { AuthUserController };
