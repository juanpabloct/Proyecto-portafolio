import { client } from "../client";
import { generateUrlAccess } from "./generateUrlAcces";

export const accessPhotoDb = async ({ id }: { id: number }) => {
  const photo = await client.photo.findUnique({
    where: { id },
  });
  const { key } = photo;
  return generateUrlAccess(`${key}`);
};
