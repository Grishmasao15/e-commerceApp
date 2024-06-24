// import { DataTypes } from "sequelize";
import { DataTypes } from "sequelize";
import { Model, Optional } from 'sequelize';
import { sequelize } from ".";

export interface Studentinterface {
  id?: number,
  firstname: string
  lastname: string
  email: string
  gender: string
  contact_no: string
  city: string
}

interface StudentcreationAttribute extends Optional<Studentinterface, "id"> {
}
export interface StudentInstance extends Model<Studentinterface, StudentcreationAttribute>,
  Studentinterface {
  createdAt: Date;
  updatedAt: Date;
}

export const Student = sequelize.define<StudentInstance>("student", {

  firstname: {

    type: new DataTypes.STRING

  },

  lastname: {

    type: new DataTypes.STRING

  },

  contact_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      isEmail: {
        msg: "please enter valid email"
      }
    }
  },
  gender: {

    type: DataTypes.STRING

  },
  city: {

    type: DataTypes.STRING

  }

});

interface basicdetailinterface {
  id?: number,
  firstname: string
  lastname: string
  designation: string
  email: string
  dob: string
  gender: string
  phonenumber: string
  address1: string
  address2: string
  city: string
  state: string
  relationship_status: string,
  createdAt?: Date,
  updatedAt?: Date
}

interface basucdetailcreationAttribute extends Optional<basicdetailinterface, "id"> {
}
interface basicDetailInstance extends Model<basicdetailinterface, basucdetailcreationAttribute>,
  basicdetailinterface {
  createdAt: Date;
  updatedAt: Date;
}



export const BasicDetails = sequelize.define<basicDetailInstance>("basic_details", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  firstname: {
    type: DataTypes.STRING(100)
  },

  lastname: {

    type: DataTypes.STRING(100)

  },

  designation: {

    type: DataTypes.STRING(100)

  },

  email: {

    type: DataTypes.STRING,
    allowNull: false,
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
    type: DataTypes.STRING,
    allowNull: false,
  },

  phonenumber: {

    type: DataTypes.STRING,
    allowNull: false,

  },
  address1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  address2: {
    type: DataTypes.TEXT
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  relationship_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  }

});

export interface EducationDetailsInterface {
  id?: number
  employee_id: number | undefined,
  nameofboard_or_coursename: string
  passingyear: number,
  percentage: number,
}
interface creationAttribute extends Optional<EducationDetailsInterface, "id"> {
}
export interface educationDetailInstance extends Model<EducationDetailsInterface, creationAttribute>,
  EducationDetailsInterface {
  createdAt: Date;
  updatedAt: Date;
}



export const EducationDetails = sequelize.define<educationDetailInstance>("education_details", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  employee_id: {
    type: DataTypes.INTEGER
  },
  nameofboard_or_coursename: {
    type: DataTypes.STRING(100)
  },
  passingyear: {
    type: DataTypes.INTEGER
  },
  percentage: {
    type: DataTypes.INTEGER
  }

})

export interface WorkExperienceInterface {
  id?: number
  employee_id?: number | undefined,
  company_name: string,
  designation: string,
  from_date: Date,
  to_date: Date,
}

interface WorkExperiencecreationAttribute extends Optional<WorkExperienceInterface, "id"> {
}
export interface WorkExperienceInstance extends Model<WorkExperienceInterface, WorkExperiencecreationAttribute>,
  WorkExperienceInterface {
  createdAt: Date;
  updatedAt: Date;
}

export const WorkExperience = sequelize.define<WorkExperienceInstance>("work_experience", {

  employee_id: {
    type: DataTypes.INTEGER
  },
  company_name: {
    type: DataTypes.STRING
  },
  designation: {
    type: DataTypes.STRING
  },
  from_date: {
    type: DataTypes.DATEONLY
  },
  to_date: {
    type: DataTypes.DATEONLY
  }

})

export interface LanguageKnownInterface {
  id?: number
  employee_id?: number | undefined,
  language_name: string,
  rws: string,
}

interface LanguageKnowncreationAttribute extends Optional<LanguageKnownInterface, "id"> {
}
export interface LanguageKnownInstance extends Model<LanguageKnownInterface, LanguageKnowncreationAttribute>,
  LanguageKnownInterface {
  createdAt: Date;
  updatedAt: Date;
}


export const LanguageKnown = sequelize.define<LanguageKnownInstance>("languageknown", {

  employee_id: {
    type: DataTypes.INTEGER
  },
  language_name: {
    type: DataTypes.STRING(100)
  },
  rws: {
    type: DataTypes.STRING(100)
  },


})

export interface TechnologyKnownInterface {
  id?: number
  employee_id?: number | undefined,
  technology_name: string,
  level_of_expertise: string,
}

interface TechnologyKnowncreationAttribute extends Optional<TechnologyKnownInterface, "id"> {
}
export interface TechnologyKnownInstance extends Model<TechnologyKnownInterface, TechnologyKnowncreationAttribute>,
  TechnologyKnownInterface {
  createdAt: Date;
  updatedAt: Date;
}

export const TechnologyKnown = sequelize.define<TechnologyKnownInstance>("technologyknown", {

  employee_id: {
    type: DataTypes.INTEGER
  },
  technology_name: {
    type: DataTypes.STRING(100)
  },
  level_of_expertise: {
    type: DataTypes.STRING(100)
  },


})

export interface ReferenceContactInterface {
  id?: number
  employee_id?: number | undefined,
  name: string,
  contactnumber: string,
  relation: string
}

interface ReferenceContactcreationAttribute extends Optional<ReferenceContactInterface, "id"> {
}
export interface ReferenceContactInstance extends Model<ReferenceContactInterface, ReferenceContactcreationAttribute>,
  ReferenceContactInterface {
  createdAt: Date;
  updatedAt: Date;
}

export const ReferenceContact = sequelize.define<ReferenceContactInstance>("reference_contact", {

  employee_id: {
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING(100)
  },
  contactnumber: {
    type: DataTypes.STRING(100)
  },
  relation: {
    type: DataTypes.STRING(100)
  }


})

export interface PreferencesInterface {
  id?: number
  employee_id?: number | undefined,
  preferredlocation: string | null,
  noticeperiod: string | null,
  expectedctc: string | null,
  currentctc: string | null,
  department: string | null

}

interface PreferencescreationAttribute extends Optional<PreferencesInterface, "id"> {
}
export interface PreferencesInstance extends Model<PreferencesInterface, PreferencescreationAttribute>,
  PreferencesInterface {
  createdAt: Date;
  updatedAt: Date;
}

export const Preferences = sequelize.define<PreferencesInstance>("preferences", {

  employee_id: {
    type: DataTypes.INTEGER,
  },
  preferredlocation: {
    type: DataTypes.STRING(100)
  },
  noticeperiod: {
    type: DataTypes.STRING(100)
  },
  expectedctc: {
    type: DataTypes.STRING(100)
  },
  currentctc: {
    type: DataTypes.STRING(100)
  },
  department: {
    type: DataTypes.STRING(100)
  }


})

export const Products = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.FLOAT
  },
  initial_quantity: {
    type: DataTypes.INTEGER
  },
  image_url: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.FLOAT
  },
  total_quantity: {
    type: DataTypes.INTEGER
  }
})

Preferences.belongsTo(BasicDetails, { foreignKey: "employee_id" });
EducationDetails.belongsTo(BasicDetails, { foreignKey: "employee_id" });
WorkExperience.belongsTo(BasicDetails, { foreignKey: "employee_id" });
LanguageKnown.belongsTo(BasicDetails, { foreignKey: "employee_id" });
TechnologyKnown.belongsTo(BasicDetails, { foreignKey: "employee_id" });
ReferenceContact.belongsTo(BasicDetails, { foreignKey: "employee_id" });

// BasicDetails.hasMany(Preferences, { foreignKey: "id" })
