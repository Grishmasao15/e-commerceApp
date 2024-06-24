import { DataTypes, Model, ModelStatic, Optional, Sequelize } from "sequelize"
import { ReferenceContactInterface, WorkExperienceInterface } from "../models/tutorial.model";


export interface FormState {
  firstname: string,
  lastname: string,
  email: string,
  dob: Date,
  gender: string,
  contact_no: string,
  city: string,
  address: string,
  password: string,
  activation_token: string

}

export interface DB {
  [key: string]: ModelStatic<Model> | Sequelize;
}

export interface resultInterface {
  dataValues: dataValuesInterface;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  gender: string;
  contact_no: string;
  password: string;
  activation_token: string;
  is_active: boolean;
  is_deleted: boolean;
  token_createdAt: Date;
}


export interface dataValuesInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  gender: string;
  contact_no: string;
  password: string;
  activation_token: string;
  is_active: boolean;
  is_deleted: boolean;
  token_createdAt: Date;
  createdAt: Date;
  updatedAt: Date;
  token: string
}

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  gender: string;
  contact_no: string;
  password: string;
  activation_token: string;
  is_active: boolean;
  is_deleted: boolean;
  token_createdAt: Date;
};

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> { }


export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
  UserAttributes {
  define: (arg0: string, arg1: { firstname: { type: DataTypes.StringDataType; } | { type: DataTypes.StringDataType; }; lastname: { type: DataTypes.StringDataType; } | { type: DataTypes.StringDataType; }; email: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean; unique: boolean; validate: { isEmail: { msg: string; }; }; } | { type: DataTypes.StringDataTypeConstructor; allowNull: boolean; unique: boolean; validate: { isEmail: { msg: string; }; }; }; dob?: { type: DataTypes.DateOnlyDataTypeConstructor; allowNull: boolean; }; gender: { type: DataTypes.StringDataTypeConstructor; } | { type: DataTypes.StringDataTypeConstructor; }; contact_no: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean; validate: { notNull: { args: boolean; msg: string; }; len: { args: number[]; msg: string; }; isInt: { args: boolean; msg: string; }; }; } | { type: DataTypes.StringDataTypeConstructor; allowNull: boolean; validate: { notNull: { args: boolean; msg: string; }; len: { args: never[]; msg: string; }; isInt: { args: boolean; msg: string; }; }; }; password?: { type: DataTypes.StringDataTypeConstructor; }; activation_token?: { type: DataTypes.StringDataTypeConstructor; }; is_active?: { type: DataTypes.AbstractDataTypeConstructor; }; is_deleted?: { type: DataTypes.AbstractDataTypeConstructor; }; token_createdAt?: { type: DataTypes.DateDataTypeConstructor; }; city?: { type: DataTypes.StringDataTypeConstructor; }; }) => void;


}

export interface configInterface {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  dialect: string;
  pool: poolInterface
}

export interface poolInterface {
  max: number;
  min: number;
  acquire: number;
  idle: number;
}

export interface dataInterface {
  firstname: string,
  lastname: string,
  contact_no: string,
  email: string,
  gender: string,
  city: string
}

export interface valInterface {
  values: dataInterface
}

export interface valuesInterface {
  values: valuesDataInterface
}

export interface valuesDataInterface {
  fname: string,
  lname: string,
  email: string
  dob: string
  gender: string
  phone: string
  password: string
  confirmPassword: string
}

export interface payloadInterface {
  id: number,
  email: string
}

export interface newObjInterface {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  dob: Date,
  gender: string,
  contact_no: string,
}

export interface ObjectInterface {
  password: string,
  activation_token: string,
  is_active: boolean,
  is_deleted: boolean,
  token_createdAt: Date,
  createdAt: Date,
  updatedAt: Date,
  newObj: newObjInterface,
  token: string,
}

export interface BasicDetailInterface {
  firstname: string,
  lastname: string,
  designation: string,
  email: string,
  phonenumber: string,
  gender: string,
  dob: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  relationship_status: string
}

interface BasicDetailCreationAttributes
  extends Optional<BasicDetailInterface, 'firstname'> { }

export interface BasicDetailInstance
  extends Model<BasicDetailInterface, BasicDetailCreationAttributes>,
  BasicDetailInterface {
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface multistepDataInterface {
  firstname: string,
  lastname: string,
  designation: string,
  email: string,
  phonenumber: string,
  gender: string,
  dob: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  relationship_status: string,
  sscboard: string,
  sscpassingyear: number,
  sscpercentage: number,
  hscboard: string,
  hscpassingyear: number,
  hscpercentage: number,
  bachelorcourse: string,
  bachelorpassingyear: number,
  bachelorpercentage: number,
  mastercourse: string,
  masterpassingyear: number,
  masterpercentage: number,
  workexperience: WorkExperienceInterface[],
  lang: string[],
  tech: string[],
  referencecontact: ReferenceContactInterface[],
  preferredlocation: string,
  noticeperiod: string,
  expectedctc: string,
  currentctc: string,
  department: string
}

export interface EducationDetailsInterface {
  id?: number,
  employee_id: number | undefined,
  nameofboard_or_coursename: string
  passingyear: number,
  percentage: number,
}