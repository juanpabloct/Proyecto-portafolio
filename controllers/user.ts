import informationUser from "../models/informacionUser";
import modelUser from "../models/user";
import { INFORMATIONUSER, USER } from "../types";
const bcrypt = require("bcryptjs");
export interface ParamsBody {
  user: USER;
  informationOfUser: INFORMATIONUSER;
}
export const createUser = async (body: ParamsBody) => {
  const { user, informationOfUser } = body as any;
  if (user && informationOfUser) {
    const salt = bcrypt.genSaltSync(10);
    const pswd = await bcrypt.hash(body.user.password, salt);
    user.password = "" + pswd;
    const newUser = await modelUser.create(user);
    const newInfdoramtion = await informationUser.create(informationOfUser);
    return { status: 200, message: "Creado Correctamente", data: newUser };
  } else {
    return {
      status: 403,
      message: "Peticion Invalida por falta de entrada de datos",
    };
  }
};
