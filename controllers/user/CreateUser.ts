import { Prisma, User } from "@prisma/client";
import { client } from "../../client";
import { EncryptPassword } from "../../utilities/encriptPassword";
import { awsS3FileUpload } from "../../utilities/awsS3FileUpload";

interface InformationParams {
  user: User;
  information: Prisma.UserInformationCreateWithoutUserInput;

  userAddres: Prisma.UserAddressCreateInput;
}
export const CreateUser = async (allInformation, image) => {
  let { information, user, userAddres } = allInformation;
  information = JSON.parse(information);
  user = JSON.parse(user);
  userAddres = JSON.parse(userAddres);
  const { email, password } = user;
  const psswdEncrypt = EncryptPassword(password);
  try {
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
        Photo: {
          create: {
            key: await awsS3FileUpload({ file: image, key: email }),
          },
        },
      },
    });
  } catch (error: any) {
    return new Error(error);
  }
};
