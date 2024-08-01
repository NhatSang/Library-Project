const nodemailer = require("nodemailer");
const crypto = require("crypto");
const moment = require("moment");
const dotenv = require("dotenv");

dotenv.config();

let confirmationCodes = {};

// cáu hình nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL,
  },
});

const sendCode = (req, res) => {
  const email = req.body.email;

  //tạo mã xác nhận
  const code = crypto.randomBytes(3).toString("hex");
  console.log("code: ", code);
  const expirationTime = moment().add(1, "minutes");

  confirmationCodes[email] = { code, expirationTime };

  //tạo mail
  const mailOptions = {
    form: process.env.USER_MAIL,
    to: email,
    subject: "Verification code",
    text: "Mã xác nhận của bạn là: " + code + ". Mã này sẽ hết hạn sau 1 phút.",
  };

  // gữi eamil
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send("Lỗi khi gửi email");
    } else {
      console.log("Email đã được gửi: " + info.response);
      res.status(200).send("Mã xác nhận đã được gửi");
    }
  });
};

const verifyCode = (req, res) => {
  const { email, code } = req.body;
  const confirmation = confirmationCodes[email];
  if (!confirmation) {
    console.log("Not found code");
    return res.status(400).send("Không tìm thấy mã xác nhận");
  }
  const { code: storedCode, expirationTime } = confirmation;

  if (moment().isAfter(expirationTime)) {
    delete confirmationCodes[email];
    return res.status(400).send("Mã xác nhận đã hết hạn");
  }

  if (storedCode === code) {
    res.status(200).json({email:email});
    delete confirmationCodes[email];
  } else {
    res.status(400).send("Mã xác nhận không đúng");
  }
};

module.exports = {sendCode,verifyCode}