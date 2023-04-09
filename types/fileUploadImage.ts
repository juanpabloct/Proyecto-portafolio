import fileUpload from "express-fileupload";

export interface KeyFile {
  file: fileUpload.UploadedFile;
  key: string;
}
