import { client } from "../../client";

export const allUsers = async () => {
  const datosUsuario = await client.user.findMany({
    select: {
      email: true,
      createdAt: true,
      id: true,
      password: false,
      updatedAt: true,
      information: true,
      users_address: true,
    },
  });
  return datosUsuario;
};
