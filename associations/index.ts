import informationUser from "../models/informacionUser";
import modelUser from "../models/user";

const allInformation = modelUser.belongsTo(informationUser);
export default allInformation;
