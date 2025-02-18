import { Request, Response } from "express";
import { ResetPasswordUserService } from "../../services/user/ResetPasswordUserService";

class ResetPasswordUserController {
  async handle(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ error: "Token e nova senha são obrigatórios" });
      return;
    }

    try {
      const resetPasswordUserService = new ResetPasswordUserService();
      const response = resetPasswordUserService.execute({ token, newPassword });

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  }
}

export { ResetPasswordUserController };
