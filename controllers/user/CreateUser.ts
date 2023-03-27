import { Prisma, User } from "@prisma/client";
import { client } from "../../client";
import { EncryptPassword } from "../../utilities/encriptPassword";
import { haveValues } from "../../utilities/haveValues";

interface InformationParams {
  user: User;
  information: Prisma.UserInformationCreateWithoutUserInput;

  userAddres: Prisma.UserAddressCreateInput;
}
export const CreateUser = async (allInformation: InformationParams) => {
  const { information, user, userAddres } = allInformation;
  const { email, password } = user;
  const haveValuesInformation = haveValues(information as {});
  const haveValuesUserAddres = haveValues(userAddres as {});
  const psswdEncrypt = EncryptPassword(password);
  try {
    if (haveValuesInformation && haveValuesUserAddres) {
      return await client.user.create({
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
      });
    } else if (!haveValuesInformation && haveValuesUserAddres) {
      return await await client.user.create({
        data: {
          email: email,
          password: psswdEncrypt,
          users_address: {
            create: {
              ...userAddres,
            },
          },
        },
      });
    } else if (haveValuesInformation && !haveValuesUserAddres) {
      return await client.user.create({
        data: {
          email: email,
          password: psswdEncrypt,
          information: {
            create: {
              ...information,
            },
          },
        },
      });
    } else {
      return await client.user.create({
        data: {
          email: email,
          password: psswdEncrypt,
        },
      });
    }
  } catch (error: any) {
    return new Error(error);
  }
};
