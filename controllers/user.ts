import { Prisma, User } from "@prisma/client";
import { client } from "../client";

interface InformationParams {
  user: User;
  information: Prisma.UserInformationCreateWithoutIdUserInput;

  userAddres: Prisma.UserAddressCreateInput;
}
export const CreateUser = async (allInformation: InformationParams) => {
  const { information, user, userAddres } = allInformation;
  const { city, country, createdAt, department, directions } = userAddres;
  const { email, password } = user;
  const { lastName, name, dateOfBirth } = information;
  return await client.user.create({
    data: {
      email: email,
      password,
      information: {
        create: {
          lastName,
          name,
          dateOfBirth,
        },
      },

      users_address: {
        create: {
          city,
          country,
          department,
          directions,
        },
      },
    },
  });
};
