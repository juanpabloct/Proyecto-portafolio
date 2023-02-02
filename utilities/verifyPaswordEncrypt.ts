const bcrypt = require("bcrypt");

export const verifyPassword = (
  password: string,
  verifyPassword: string
): boolean => {
  const isEqual = bcrypt.compareSync(password, verifyPassword);
  return isEqual;
};
