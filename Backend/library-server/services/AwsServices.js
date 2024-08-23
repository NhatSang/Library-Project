// const multer = require("multer");
// const AWS = require("aws-sdk");
// require("dotenv").config();
// const path = require("path");

import multer from "multer";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
//cau hinh aws
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = "1";

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3(); //khai bao service S3

const bucketName = process.env.S3_BUCKET_NAME;

const storage = multer.memoryStorage({
  destination(req, file, callback) {
    callback(null, "");
  },
});

export const upload = multer({
  storage,
  //   limits: { fieldSize: 2000000 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const fileTypes = /pdf/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb("err upload!");
}

export const saveFile = async (file) => {
  try {
    const filePath = `${Date.now().toString()}_${file.originalname}`;

    const paramsS3 = {
      Bucket: bucketName,
      Key: filePath,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const data = await s3.upload(paramsS3).promise();

    return data.Location;
  } catch (err) {
    throw new Error("Upload file to AWS S3 failed");
  }
};
export const saveFileWithKey = async (file, key) => {
  try {
    const paramsS3 = {
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: "application/pdf",
    };

    const data = await s3.upload(paramsS3).promise();

    return data.Location;
  } catch (err) {
    throw new Error("Upload file to AWS S3 failed");
  }
};
