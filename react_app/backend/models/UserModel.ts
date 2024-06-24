import { DataTypes } from "sequelize";
import { sequelize } from "./index";


const User = sequelize.define("users", {

  firstname: {

    type: DataTypes.STRING(100)


  },

  lastname: {

    type: DataTypes.STRING(100)

  },

  email: {

    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      }
    }

  },
  dob: {

    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  gender: {
    type: DataTypes.STRING
  },

  contact_no: {

    type: DataTypes.STRING,
    allowNull: false,

  },
  password: {
    type: DataTypes.STRING
  },

  activation_token: {
    type: DataTypes.STRING
  },
  is_active: {
    type: DataTypes.BOOLEAN
  },
  is_deleted: {
    type: DataTypes.BOOLEAN
  },
  token_createdAt: {
    type: DataTypes.DATE
  }

});

export default User;