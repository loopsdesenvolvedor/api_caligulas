import prisma from "../../lib/prisma";
import crypto from "crypto";
import EmailService from "../../lib/nodemailer";

type RecoverPasswordType = {
  email: string;
};

class RecoverUserPasswordService {
  async execute({ email }: RecoverPasswordType) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const resetToken = crypto.randomBytes(16).toString("hex");
      const resetTokenExpires = new Date(Date.now() + 3600000);

      await prisma.user.update({
        where: { email },
        data: { resetToken, resetTokenExpires },
      });

      console.log("Token gerado:", resetToken);
      console.log("Expiração do token:", resetTokenExpires);

      const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

      await EmailService.sendPasswordResetEmail(email, resetLink);

      return { message: "E-mail de recuperação enviado com sucesso." };
    } catch (error) {
      throw new Error("Erro ao processar a recuperação de senha: ");
    }
  }
}

export { RecoverUserPasswordService };
