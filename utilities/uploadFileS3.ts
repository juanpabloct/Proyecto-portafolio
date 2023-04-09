import { BUCKET } from "../config";
import { createPutObject } from "./createPutObject";

export const uploadFileS3 = async (image, email) => {
  const params = {
    Bucket: BUCKET,
    Key: `${email}/${image.name}`,
    Body: image.data,
  };
  const upload = await createPutObject({ file: params.Body, key: params.Key });
  return params.Key;
};
