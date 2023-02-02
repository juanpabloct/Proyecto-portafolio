import { Prisma, User } from "@prisma/client";

const jwt = require("jsonwebtoken");
export const userGenerateToken = ({ user }: { user: User }) =>
  jwt.sign(
    {
      data: user,
    },
    process.env.FIRMA,
    { expiresIn: "1d" }
  );
