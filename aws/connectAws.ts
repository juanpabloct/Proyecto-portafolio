require("dotenv").config();
import { S3, AWSError, config } from "aws-sdk";
import { ACCES_AWS, ACCES_SECRET_AWS } from "../config";
config.update({ region: "us-east-1" });
config.update({
  accessKeyId: ACCES_AWS,
  secretAccessKey: ACCES_SECRET_AWS,
});

export const s3 = new S3();
