import { sign } from "jsonwebtoken";
import prisma from "../../lib/prisma";
import { compare } from "bcryptjs";

type AuthRequest = {
  email: string;
  password: string;
};

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User/password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("User/password incorrect");
    }

    const token = sign(
      {
        name: user.username,
        email: user.email,
      },
      jwtSecret,

      {
        subject: user.id,
        expiresIn: "3d",
      }
    );

    return {
      id: user.id,
      name: user.username,
      email: user.email,
      token,
    };
  }
}

export { AuthUserService };
