import dotenv from "dotenv";
const jwtStrategy = require("passport-jwt").Strategy;
dotenv.config();
import { PassportStatic } from "passport";
import User from "../models/UserModel";
import { Model } from "sequelize";
import { UserInstance } from "../Interfaces/interfaces";

// getToken function for passport
const getToken = (req: { cookies: { token: string; }; body: { token: string; }; header: (arg0: string) => string; }) => {
  return (
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    null
  );
};

const opts = {
  jwtFromRequest: getToken,
  secretOrKey: process.env.JWT_SECRET,
};

export const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new jwtStrategy(opts, async (payload: { id: number; }, next: (arg0: null | unknown, arg1: boolean | object) => void) => {
      let result: Model<any, any> | null;
      const id: number = payload.id;
      try {
        result = await User.findOne({ where: { id: id } })
      } catch (error) {
        // if any error during query execution
        console.log(error);
        return next(error, false);
      }

      // if user present then call next with payload
      if (result) {
        return next(null, result.dataValues);
      } else {
        // if user not present then call next with empty data
        return next(null, false);
      }
    })
  );
};