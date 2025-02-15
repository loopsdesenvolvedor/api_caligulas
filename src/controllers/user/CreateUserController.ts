import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    try {
      const createUserService = new CreateUserService();
      const user = await createUserService.execute({
        username,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: `Ocorreu um erro ao criar o usuário: ${error.message}`,
        });
      } else {
        return res.status(500).json({
          message: "Ocorreu um erro desconhecido ao criar o usuário.",
        });
      }
    }
  }
}

export { CreateUserController };
