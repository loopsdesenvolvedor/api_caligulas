import { Router } from "express";
import multer, { FileFilterCallback } from "multer";

import uploadConfig from "./lib/multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { DestroyUserController } from "./controllers/user/DestroyUserController";

import { isAuthenticate } from "./middlewares/isAuthenticate";

const routes = Router();

const upload = multer(uploadConfig.upload("./tmp"));

routes.post(
  "/users",
  upload.single("avatar"),
  new CreateUserController().handle
);

routes.post("/session", new AuthUserController().handle);
routes.get("/me", isAuthenticate, new DetailUserController().handle);
routes.delete("/delete", isAuthenticate, new DestroyUserController().handle);

export { routes };
