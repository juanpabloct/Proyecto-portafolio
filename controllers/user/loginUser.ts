import { Prisma, UserAddress, UserInformation } from "@prisma/client";
import { client } from "../../client";
import { accessPhotoDb } from "../../utilities/accesPhotoDb";

import { userGenerateToken } from "../../utilities/generateToken";
import { verifyPassword } from "../../utilities/verifyPaswordEncrypt";
interface ReturnLoginUser {
  user: {
    information: UserInformation;
    users_address: UserAddress;
    email: string;
  };
}
interface ErrorAcces {
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
      Photo: true,
    },
  });
  return new Promise(async (resolved, rejected) => {
    try {
      if (user) {
        const passwordEncypt = user?.password;
        const verificacion = verifyPassword(password, passwordEncypt);
        if (!verificacion)
          throw { error: "Error la contraseña no es valida", status: 404 };
        const data = {
          token: userGenerateToken({ user }),
          user: {
            information: user?.information,
            users_address: user?.users_address,
            email: user?.email,
            photo: "",
          },
        };
        let { photo } = data.user;

        photo = await accessPhotoDb({ id: user.photoId });
        return resolved(data);
      } else {
        throw { error: "Usuario no Existe", status: 400 };
      }
    } catch (error: unknown) {
      const failUser = error as ErrorAcces;
      return rejected(failUser);
    }
  });
};
