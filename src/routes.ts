import { Router } from "express";
import multer, { FileFilterCallback } from "multer";

import uploadConfig from "./lib/multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

const routes = Router();

const upload = multer(uploadConfig.upload("./tmp"));

routes.post(
  "/users",
  upload.single("avatar"),
  new CreateUserController().handle
);

routes.post("/session", new AuthUserController().handle);

export { routes };
