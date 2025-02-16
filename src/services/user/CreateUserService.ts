import prisma from "../../lib/prisma";
import { hash } from "bcryptjs";

type UserRequest = {
  username: string;
  email: string;
  avatar?: string;
  password: string;
};

class CreateUserService {
  async execute({ username, email, avatar, password }: UserRequest) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error("Email em uso");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        avatar,
      },
    });

    return user;
  }
}

export { CreateUserService };
