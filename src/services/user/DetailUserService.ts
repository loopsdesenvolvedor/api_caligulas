import prisma from "../../lib/prisma";

type DetailRequest = {
  userId: string;
};

class DetailUserService {
  async execute({ userId }: DetailRequest) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
      },
    });

    return user;
  }
}

export { DetailUserService };
