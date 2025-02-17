import prisma from "../../lib/prisma";

type DestroyRequest = {
  userId: string;
};

class DestroyUserService {
  async execute({ userId }: DestroyRequest) {
    try {
      const userExists = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        return null;
      }

      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      return deletedUser;
    } catch (error) {
      console.error("Error in DestroyUserService:", error);
      throw new Error("Error deleting user");
    }
  }
}

export { DestroyUserService };
