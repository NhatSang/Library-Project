import nodemailer from "nodemailer";
import { env } from "../../helper";

export class EmailProccessor {
  static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.USER_MAIL,
      pass: env.PASS_MAIL,
    },
  });

  static sendEmail = async (
    email: string,
    subject: string,
    content: string
  ) => {
    const mailOptions = {
      from: env.USER_MAIL,
      to: email,
      subject: subject,
      text: content,
    };

    await this.transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  };
}
