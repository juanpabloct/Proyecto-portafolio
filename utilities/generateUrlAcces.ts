import { s3 } from "../aws/connectAws";
import { BUCKET } from "../config";
export const generateUrlAccess = (key: string) => {
  const urlPublic = s3.getSignedUrl("getObject", {
    Bucket: BUCKET,
    Key: key,
    Expires: 172800,
  });

  return urlPublic;
};
