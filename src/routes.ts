import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const routes = Router();

routes.post("/users", new CreateUserController().handle);

export { routes };
