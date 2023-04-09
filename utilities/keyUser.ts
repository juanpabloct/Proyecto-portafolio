import { KeyFile } from "../types/fileUploadImage";

export const keyUser = ({ key, file }: KeyFile) => {
  return `${key.slice(0, key.indexOf("@"))}/${file.name}`;
};
