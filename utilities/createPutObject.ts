import { Body, PutObjectRequest } from "aws-sdk/clients/s3";
import fileUpload from "express-fileupload";
import { s3 } from "../aws/connectAws";
import { BUCKET } from "../config";
import { KeyFile } from "../types/fileUploadImage";
import { keyUser } from "./keyUser";

export const createPutObject = async ({ file, key }: KeyFile) => {
  const params: PutObjectRequest = {
    Bucket: BUCKET,
    Key: keyUser({ file, key }),
    Body: file.data,
    ContentType: file.mimetype,
    ContentDisposition: "inline",
  };
  const data = await s3
    .putObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log("Carpeta creada exitosamente", data);
      }
    })
    .promise();
  console.log(data);

  return params.Key;
};
