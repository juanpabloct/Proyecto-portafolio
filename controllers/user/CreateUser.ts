import { Prisma, User } from "@prisma/client";
import { client } from "../../client";
import { EncryptPassword } from "../../utilities/encriptPassword";

interface InformationParams {
  user: User;
  information: Prisma.UserInformationCreateWithoutUserInput;

  userAddres: Prisma.UserAddressCreateInput;
}
export const CreateUser = async (allInformation: InformationParams) => {
  const { information, user, userAddres } = allInformation;
  const { email, password } = user;
  const psswdEncrypt = EncryptPassword(password);
  return new Promise(async (resolved, rejected) => {
    try {
      return await resolved(
        await client.user.create({
          data: {
            email: email,
            password: psswdEncrypt,
            information: {
              create: {
                ...information,
              },
            },

            users_address: {
              create: {
                ...userAddres,
              },
            },
          },
        })
      );
    } catch (error) {
      return rejected(error);
    }
  });
};
