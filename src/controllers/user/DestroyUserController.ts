import { Request, Response } from "express";
import { DestroyUserService } from "../../services/user/DestroyUserService";

class DestroyUserController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.userId;

      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      const destroyUserService = new DestroyUserService();
      const user = await destroyUserService.execute({ userId });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
      console.error("Error deleting user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user" });
      return;
    }
  }
}

export { DestroyUserController };
