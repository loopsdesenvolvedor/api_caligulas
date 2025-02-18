import nodemailer from "nodemailer";

// Configuração do transporte usando as variáveis de ambiente
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Usando TLS
  auth: {
    user: process.env.EMAIL_USER, // Email do Gmail
    pass: process.env.EMAIL_PASS, // Senha de aplicativo gerada
  },
});

class EmailService {
  // Função para enviar o e-mail
  async sendMail(to: string, subject: string, htmlContent: string) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlContent,
      });
      console.log("E-mail enviado com sucesso para:", to);
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      throw new Error("Erro ao enviar e-mail");
    }
  }

  // Função para enviar o e-mail de recuperação de senha
  async sendPasswordResetEmail(to: string, resetLink: string) {
    const subject = "Recuperação de Senha";
    const htmlContent = `
      <div>
        <h1>Recuperação de Senha</h1>
        <p>Você solicitou a recuperação de senha para sua conta.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetLink}">Redefinir Senha</a>
        <p>Este link expira em 1 hora.</p>
      </div>
    `;
    await this.sendMail(to, subject, htmlContent);
  }
}

export default new EmailService();
