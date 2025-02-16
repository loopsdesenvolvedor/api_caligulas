import { NextFunction, Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const file = req.file;
    if (file) {
      req.body.avatar = file.filename;
    } else {
      console.log("Nenhum arquivo enviado");
    }

    const { username, email, password, avatar } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "Todos os campos são obrigatórios" });
      return;
    }

    try {
      const createUserService = new CreateUserService();
      const user = await createUserService.execute({
        username,
        email,
        password,
        avatar,
      });

      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({
          message: `Ocorreu um erro ao criar o usuário: ${error.message}`,
        });
      } else {
        res.status(500).json({
          message: "Ocorreu um erro desconhecido ao criar o usuário.",
        });
      }
    }
  }
}

export { CreateUserController };
