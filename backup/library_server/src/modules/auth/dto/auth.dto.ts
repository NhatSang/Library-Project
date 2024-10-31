import { IsEmail, IsString, Matches } from "class-validator";

export class AuthVerifyEmailDTO {
  @Matches(
    /^[a-zA-Z0-9._%+-]+@student\.iuh\.edu\.vn$|^[a-zA-Z0-9._%+-]+@iuh\.edu\.vn$/,
    {
      message: "Email phải có định dạng @student.iuh.edu.vn hoặc @iuh.edu.vn",
    }
  )
  email: string;
  @IsString()
  verificationCode: string;
}
