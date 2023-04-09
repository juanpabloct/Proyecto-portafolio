import { User } from "@prisma/client";
import { FIRMA } from "../config";

const jwt = require("jsonwebtoken");
export const userGenerateToken = ({ user }: { user: User }) =>
  jwt.sign(
    {
      data: user,
    },
    FIRMA,
    { expiresIn: "1d" }
  );
