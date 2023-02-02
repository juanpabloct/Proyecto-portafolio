const bcrypt = require("bcrypt");

export const EncryptPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const passwordEncrypt = bcrypt.hashSync(password, salt);
  return passwordEncrypt;
};
