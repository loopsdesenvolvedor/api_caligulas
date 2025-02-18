import { hash } from "bcryptjs";
import prisma from "../../lib/prisma";

type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

class ResetPasswordUserService {
  async execute({ token, newPassword }: ResetPasswordRequest) {
    try {
      const user = await prisma.user.findFirst({
        where: { resetToken: token },
      });

      if (
        !user ||
        !user.resetTokenExpires ||
        new Date() > user.resetTokenExpires
      ) {
        throw new Error("Token inválido ou expirado");
      }

      const hashePassword = await hash(newPassword, 8);

      await prisma.user.update({
        where: { email: user.email },
        data: {
          password: hashePassword,
          resetToken: null,
          resetTokenExpires: null,
        },
      });

      return { message: "Senha redefinida com sucesso." };
    } catch (error) {
      throw new Error("Failed to reset password");
    }
  }
}

export { ResetPasswordUserService };
