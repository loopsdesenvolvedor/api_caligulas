import { Request, Response } from "express";
import { RecoverUserPasswordService } from "../../services/user/RecoverUserPasswordService";

class RecoverUserPasswordController {
  async handle(req: Request, res: Response) {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Método não permitido" });
      return;
    }

    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email é obrigatório" });
      return;
    }

    try {
      const recoverUserPasswordService = new RecoverUserPasswordService();
      const response = await recoverUserPasswordService.execute({ email });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao processar a recuperação de senha",
      });
    }
  }
}

export { RecoverUserPasswordController };
