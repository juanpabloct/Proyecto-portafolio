import { Prisma, User, UserAddress, UserInformation } from "@prisma/client";
import { client } from "../../client";

import { EncryptPassword } from "../../utilities/encriptPassword";
import { userGenerateToken } from "../../utilities/generateToken";
import { verifyPassword } from "../../utilities/verifyPaswordEncrypt";
interface ReturnLoginUser {
  user: {
    information: UserInformation;
    users_address: UserAddress;
    email: string;
  };
}
interface ErrorUser {
  token: string;
  error: string;
  status: number;
}
export const LoginUser = async (body: Prisma.UserCreateInput) => {
  const { email, password } = body;
  const user = await client.user.findUnique({
    where: { email: email },
    include: {
      information: true,
      users_address: true,
    },
  });
  try {
    if (user) {
      const passwordEncypt = user?.password;
      const verificacion = verifyPassword(password, passwordEncypt);
      if (!verificacion)
        throw { error: "Error la contraseña no es valida", status: 404 };
      return {
        token: userGenerateToken({ user }),
        user: {
          information: user?.information,
          users_address: user?.users_address,
          email: user?.email,
        },
      };
    } else {
      throw { error: "Usuario no Existe", status: 400 };
    }
  } catch (error: any) {
    return new Error(error);
  }
};
