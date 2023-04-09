import { PutObjectRequest } from "aws-sdk/clients/s3";
import { s3 } from "../aws/connectAws";
import { BUCKET } from "../config";
import { keyUser } from "./keyUser";
import { KeyFile } from "../types/fileUploadImage";

export const awsS3FileUpload = async ({ key, file }: KeyFile) => {
  const params: PutObjectRequest = {
    Bucket: BUCKET,
    Key: keyUser({ file, key }),
    Body: file.data,
    ContentType: file.mimetype,
    ContentDisposition: "inline",
  };
  const data = await s3
    .upload(params, function (err, data) {
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
