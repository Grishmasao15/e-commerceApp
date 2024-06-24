
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { BasicDetailInstance, BasicDetailInterface, EducationDetailsInterface, UserAttributes, dataValuesInterface, multistepDataInterface, payloadInterface, valInterface, valuesInterface } from "../Interfaces/interfaces";
import User from "../models/UserModel";
import { Student, BasicDetails, EducationDetails, WorkExperience, LanguageKnown, TechnologyKnown, ReferenceContact, Preferences, WorkExperienceInstance, WorkExperienceInterface, ReferenceContactInstance, ReferenceContactInterface, PreferencesInterface, PreferencesInstance, educationDetailInstance, LanguageKnownInterface, LanguageKnownInstance, TechnologyKnownInterface, TechnologyKnownInstance, StudentInstance, Products } from "../models/tutorial.model";

export const main = async (req: Request, res: Response) => {
  try {

    Student.findAll({})
      .then((data) => {
        res.json({ data });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  }
  catch (error) {
    res.json({ message: error })
  }
}

export const create = (req: Request, res: Response) => {

  const { values }: valInterface = req.body;

  if (
    !values.firstname ||
    !values.lastname ||
    !values.email ||
    !values.city ||
    !values.contact_no ||
    !values.gender
  ) {
    return res.status(400).json({
      success: false,
      body: req.body,
      message: "Please fill all the fields",
    });
  }

  // Create a Tutorial
  const student_details = {
    firstname: values.firstname,
    lastname: values.lastname,
    contact_no: values.contact_no,
    email: values.email,
    gender: values.gender,
    city: values.city

  };

  // Save Tutorial in the database
  Student.create(student_details)
    .then((data: StudentInstance) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};



export const createUser = async (req: Request, res: Response) => {

  try {
    const { values }: valuesInterface = req.body;

    // validate data
    if (
      !values.fname ||
      !values.lname ||
      !values.email ||
      !values.dob ||
      !values.gender ||
      !values.phone ||
      !values.password ||
      !values.confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        body: req.body,
        message: "Please fill all the fields",
      });
    }

    // Validate request
    if (!values.email) {
      res.status(400).send({
        message: "email can not be empty!"
      });
      return;
    }

    // check password and confirmPassword
    if (values.password !== values.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "confirm password doesn't match",
      });
    }

    let hashPassword: string;
    try {
      const bcryptsalt: string = bcrypt.genSaltSync(10);
      hashPassword = await bcrypt.hash(values.password, bcryptsalt);
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }

    // A string containing a randomly generated, 36 character long v4 UUID.
    const verification_token: string = crypto.randomUUID();


    const result: Array<{ dataValues: dataValuesInterface }> = await User.findAll({ where: { email: values.email, is_active: true } });

    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: "email already exist!",
      });
    }


    // Create a Tutorial
    const userData = {
      firstname: values.fname,
      lastname: values.lname,
      email: values.email,
      dob: values.dob,
      gender: values.gender,
      contact_no: values.phone,
      password: hashPassword,
      activation_token: verification_token,
      is_active: 0,
      is_deleted: 0,
      token_createdAt: Date.now()
    };


    // Save Tutorial in the database
    User.create(userData)
      .then((data: { dataValues: dataValuesInterface }) => {
        res.send(data);
      })
      .catch((err: Error) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred during registration."
        });
      });

  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const activationAccount = async (req: Request, res: Response) => {
  try {
    const token: string = req.params.token;
    const email: string = req.params.email;

    if (!email || !token) {
      return res.status(400).json({
        success: false,
        message: "email or token is empty",
      });
    }

    try {

      const result: Array<{ dataValues: dataValuesInterface }> = await User.findAll({ where: { email: email, activation_token: token } });

      const result2: Array<{ dataValues: dataValuesInterface }> = await User.findAll({ where: { email: email, activation_token: token, is_active: true } });
      if (result2.length >= 1) {
        return res.status(400).json({
          success: false,
          message: "link activated"
        });
      }

      const diff: number = Number(new Date(Date.now())) - Number(new Date(result[0].dataValues.token_createdAt));
      const mins: number = Math.floor((diff % 86400000) / 60000);

      if (mins > 1) {
        return res.status(400).json({
          success: false,
          message: "link expired",
        });
      }
      else {
        try {
          await User.update({ is_active: true }, { where: { email: email } })
          return res.status(200).json({
            success: true,
            message: "activated account"
          })
        } catch (error) {
          return res.status(500).json({
            success: "false",
            message: (error as Error).message,
          });
        }
      }


    } catch (error) {
      return res.status(500).json({
        success: "false",
        message: (error as Error).message,
      });
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

export const regenerateActivationCode = async (req: Request, res: Response) => {

  const email: string = req.params.email;
  const verification_token: string = crypto.randomUUID();
  await User.update({ activation_token: verification_token, token_createdAt: Date.now() }, { where: { email: email } })

  return res.status(200).json({ success: true, data: verification_token })
}

export const actToken = async (req: Request, res: Response) => {

  const email: string = req.params.email;
  const result = await User.findOne({ where: { email: email } });
  const new_token: string = result!.dataValues.activation_token;
  return res.status(200).json({ success: true, data: new_token })
}


//Login

export const login = async (req: Request, res: Response) => {

  try {
    // get data
    const { email, password }: UserAttributes = req.body.data;

    // validate data
    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    // execute the query to find user in DB by email
    let result: Array<{ dataValues: dataValuesInterface }>;//: Array<{ dataValues: dataValuesInterface }>
    try {
      result = await User.findAll({ where: { email: email, is_active: true } })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }


    // user not found then return res
    if (result.length <= 0) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    // user found the verify DB password with entered password
    const hashPassword: string = result[0].dataValues.password;
    if (await bcrypt.compare(password, hashPassword)) {
      // both are same
      //if db password and user's password matched then put the entry in login_attempts as accept

      // try {
      //   await conn.query(
      //     "insert into login_attempts (user_id, password, status) values (?)",
      //     [[result[0].id, password, true]]
      //   );
      // } catch (error) {
      //   return res.status(500).json({
      //     success: false,
      //     error: error.message,
      //     message: "Internal Server Error",
      //   });
      // }

      // generate token for the cookie
      const payload: payloadInterface = {
        id: result[0].dataValues.id,
        email: result[0].dataValues.email,
      };
      // remove password from the user obj
      const { password, createdAt, updatedAt, is_active, token_createdAt, is_deleted, activation_token, ...newObj } = result[0].dataValues;

      // generate token
      const token: string = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
      });
      // set token into userObj
      newObj.token = token;


      return res.cookie("token", token, {
        maxAge: 4 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
        .json({
          success: true,
          user: newObj,
        });
    } else {
      //if db password and user's password not matched then put the entry in login_attempts as fail
      // try {
      //   await conn.query(
      //     "insert into login_attempts (user_id, password, status) values (?)",
      //     [[result[0].id, password, false]]
      //   );
      // } catch (error) {
      //   return res.status(500).json({
      //     success: false,
      //     error: error.message,
      //     message: "Internal Server Error",
      //   });
      // }

      //return res for the not match the password with stored password
      return res.json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }
  } catch (error) {
    console.log(error, "errorrrrrrrrrrrrr");
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

// export const findAll = (req: Request, res: Response) => {
//   const firstname: string | ParsedQs | string[] | ParsedQs[] | undefined = req.query.firstname;

//   const condition = firstname ? { firstname: { [Op.like]: `%${firstname}%` } } : null

//   Student.findAll({ where: condition })
//     .then((data: any) => {
//       res.send(data);
//     })
//     .catch((err: Error) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };


export const findOne = (req: Request, res: Response) => {
  const id: string = req.params.id;

  Student.findByPk(id)
    .then((data: StudentInstance | null) => {
      return res.json({
        success: true,
        data: data?.dataValues,
      });
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

export const update = (req: Request, res: Response) => {
  const id: string = req.params.id;

  const { values }: valInterface = req.body;

  Student.update(values, { where: { id: id } })
    .then((value: [affectedCount: number]) => {
      if (value) {
        res.send({ message: "student details updated successfully" })
      }
      else {
        res.send({ message: "can not update details.May be not found" })
      }
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).send({
        message: `error updating Record with id ${id}`
      })
    })
}

export const deleteStudent = (req: Request, res: Response) => {
  const id: string = req.params.id;

  Student.destroy({ where: { id: id } })
    .then((num: number) => {
      if (num == 1) {
        res.send({ message: "Record deleted successfully" })
      }
      else {
        res.send({ message: "can not delete record.May be not found" })
      }
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).send({
        message: `error deleting Record with id ${id}`
      })
    })
}

export const logOut = (req: Request, res: Response) => {

  try {
    return res.clearCookie("token").json({
      success: true,
      message: "user Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

export const forgotPassLink = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.values.email;

    let result: Array<{ dataValues: dataValuesInterface }>;
    try {
      result = await User.findAll({ where: { email: email, is_active: true } })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }

    if (result.length == 0) {
      return res.json({
        success: false,
        message: "user not found :(",
      });
    }

    try {
      await User.update({ token_createdAt: Date.now() }, { where: { email: email } })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }

    return res.json({
      success: true,
      email: email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const updatePass = async (req: Request, res: Response) => {

  const email: string = req.params.email;
  const password: string = req.body.values.password;

  try {

    const bcryptsalt: string = bcrypt.genSaltSync(10);
    const hashPassword: string = await bcrypt.hash(password, bcryptsalt);
    const result: number[] = await User.update({ password: hashPassword }, { where: { email: email } })
    if (result[0]) {
      return res.status(200).json({ success: true, message: "password updated successfully" })
    }
    else {
      return res.status(400).json({ success: false, message: "error in update password" })
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }



}

export const storeMultistepForm = async (req: Request, res: Response) => {
  const { firstname, lastname, designation, email, phonenumber, gender, dob, address1, address2, city, state, relationship_status, sscboard, sscpassingyear, sscpercentage, hscboard, hscpassingyear, hscpercentage, bachelorcourse, bachelorpassingyear, bachelorpercentage, mastercourse, masterpassingyear, masterpercentage, workexperience, lang, tech, referencecontact, preferredlocation, noticeperiod, expectedctc, currentctc, department }: multistepDataInterface = req.body.data

  console.log("in storeeeeeeeeeee ddattttttttttttttttttt")
  console.log(req.body.data, "store multi step formmm");

  try {

    const basic_details: BasicDetailInterface = {
      firstname: firstname,
      lastname: lastname,
      designation: designation,
      email: email,
      phonenumber: phonenumber,
      gender: gender,
      dob: dob,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      relationship_status: relationship_status
    }

    const result = await BasicDetails.create(basic_details);
    let id: number | undefined;
    if (result.dataValues) {
      id = result.dataValues.id
    }


    const education_details1: EducationDetailsInterface = {
      employee_id: id,
      nameofboard_or_coursename: sscboard,
      passingyear: sscpassingyear,
      percentage: sscpercentage
    }

    const education_details2: EducationDetailsInterface = {
      employee_id: id,
      nameofboard_or_coursename: hscboard,
      passingyear: hscpassingyear,
      percentage: hscpercentage
    }

    const education_details3: EducationDetailsInterface = {
      employee_id: id,
      nameofboard_or_coursename: bachelorcourse,
      passingyear: bachelorpassingyear,
      percentage: bachelorpercentage
    }

    let education_details4: EducationDetailsInterface | undefined;
    if (mastercourse.length > 0) {

      education_details4 = {
        employee_id: id,
        nameofboard_or_coursename: mastercourse,
        passingyear: masterpassingyear,
        percentage: masterpercentage
      }
    }

    console.log(education_details4, "education_details4");


    const arr: (EducationDetailsInterface | undefined)[] = [education_details1, education_details2, education_details3, education_details4]

    arr.forEach(async (element: EducationDetailsInterface | undefined) => {
      if (element) {
        const result: educationDetailInstance = await EducationDetails.create(element);
        console.log(result, "education results");
      }
    })


    workexperience?.forEach(async (element: WorkExperienceInterface) => {
      if (element) {
        if (element.company_name) {

          const obj1: { employee_id: number | undefined } = { employee_id: id }
          const obj2: WorkExperienceInterface = {
            company_name: element.company_name,
            designation: element.designation,
            from_date: element.from_date,
            to_date: element.to_date
          }

          const mergedobj: WorkExperienceInterface = { ...obj1, ...obj2 };

          const result: WorkExperienceInstance = await WorkExperience.create(mergedobj);
          console.log(result, "work exp results");
        }
      }
    })


    if (lang?.length > 0) {

      lang?.forEach(async (element: string) => {
        if (element) {
          const result = await LanguageKnown.create({ employee_id: id, language_name: element, rws: (req.body.data[element]).toString() });
          console.log(result, "lang known resultt");
        }
      })

    }

    if (tech.length > 0) {

      tech.forEach(async (element: string) => {
        if (element) {
          const result = await TechnologyKnown.create({ employee_id: id, technology_name: element, level_of_expertise: req.body.data[element] });
          console.log(result, "technology known resultt");
        }
      })

    }


    referencecontact?.forEach(async (element: ReferenceContactInterface) => {
      if (element) {
        if (element.name) {
          const obj1: { employee_id: number | undefined } = { employee_id: id }
          const obj2: ReferenceContactInterface = {
            name: element.name,
            contactnumber: element.contactnumber,
            relation: element.relation
          }


          const mergedobj: ReferenceContactInterface = { ...obj1, ...obj2 };
          const result: ReferenceContactInstance = await ReferenceContact.create(mergedobj);
          console.log(result, "reference contact resultttttt");
        }
      }
    })


    if (preferredlocation?.length > 0 || noticeperiod || expectedctc || currentctc || department) {

      const preferences: PreferencesInterface = {
        employee_id: id,
        preferredlocation: preferredlocation.toString() || null,
        noticeperiod: noticeperiod || null,
        expectedctc: expectedctc || null,
        currentctc: currentctc || null,
        department: department || null

      }

      const pref_result: PreferencesInstance = await Preferences.create(preferences);
      console.log(pref_result, "pref_resultttt");
    }

    return res.json({
      success: true,
      message: "successfully inserted data",
    });

  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }


}

export const updateMultistepForm = async (req: Request, res: Response) => {
  const id: number | undefined = req.params.id as unknown as number;

  console.log(req.body.data, "update detailsssssssssssssssssssss")

  const { firstname, lastname, designation, email, phonenumber, gender, dob, address1, address2, city, state, relationship_status, sscboard, sscpassingyear, sscpercentage, hscboard, hscpassingyear, hscpercentage, bachelorcourse, bachelorpassingyear, bachelorpercentage, mastercourse, masterpassingyear, masterpercentage, workexperience, lang, tech, referencecontact, preferredlocation, noticeperiod, expectedctc, currentctc, department }: multistepDataInterface = req.body.data;

  console.log("in update multistep");
  console.log(id, "idd");

  try {

    const basic_details: BasicDetailInterface = {
      firstname: firstname,
      lastname: lastname,
      designation: designation,
      email: email,
      phonenumber: phonenumber,
      gender: gender,
      dob: dob,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      relationship_status: relationship_status
    }

    const result: [affectedCount: number] = await BasicDetails.update(basic_details, { where: { id: id } });
    console.log(result, "basic details update result");

    const education_details1: EducationDetailsInterface = {
      employee_id: id,
      nameofboard_or_coursename: sscboard,
      passingyear: sscpassingyear,
      percentage: sscpercentage
    }

    const education_details2: EducationDetailsInterface = {
      employee_id: id,
      nameofboard_or_coursename: hscboard,
      passingyear: hscpassingyear,
      percentage: hscpercentage
    }

    const education_details3: EducationDetailsInterface = {
      employee_id: id,
      nameofboard_or_coursename: bachelorcourse,
      passingyear: bachelorpassingyear,
      percentage: bachelorpercentage
    }

    const arr: Array<EducationDetailsInterface> = [education_details1, education_details2, education_details3]

    let education_details4: EducationDetailsInterface | undefined;
    if (mastercourse.length > 0) {

      education_details4 = {
        employee_id: id,
        nameofboard_or_coursename: mastercourse,
        passingyear: masterpassingyear,
        percentage: masterpercentage
      }
      arr.push(education_details4);
    }

    console.log(arr, "arrrrrrrr");


    const edu_idssss: educationDetailInstance[] = await EducationDetails.findAll({ attributes: ['id'], });
    const id_arr: number[] = [];
    edu_idssss.forEach(element => {
      id_arr.push(element.dataValues.id as number)
    })

    console.log(id_arr, "idd arrrr");

    await EducationDetails.update(arr[0], { where: { id: id_arr[0] } });
    await EducationDetails.update(arr[1], { where: { id: id_arr[1] } });
    await EducationDetails.update(arr[2], { where: { id: id_arr[2] } });

    if (arr[3]) {
      if (id_arr[3]) {
        await EducationDetails.update(arr[3], { where: { id: id_arr[3] } });
      }
      else {
        await EducationDetails.create(arr[3]);
      }
    }
    else {
      if (id_arr[3]) {
        await EducationDetails.destroy({ where: { id: id_arr[3] } })
      }
    }

    const work_idssss: WorkExperienceInstance[] = await WorkExperience.findAll({ attributes: ['id'] });
    const work_id_arr: number[] = [];

    work_idssss.forEach(element => {
      work_id_arr.push(element.dataValues.id as number)
    })

    await WorkExperience.destroy({ where: { employee_id: id } });

    workexperience?.forEach(async (element: WorkExperienceInterface) => {
      if (element) {
        if (element.company_name) {
          const obj1: { employee_id: number } = { employee_id: id }
          const obj2: WorkExperienceInterface = {
            company_name: element.company_name,
            designation: element.designation,
            from_date: element.from_date,
            to_date: element.to_date
          }

          const mergedobj: WorkExperienceInterface = { ...obj1, ...obj2 };
          const result: WorkExperienceInstance = await WorkExperience.create(mergedobj);
          console.log(result, "update work exp results");
        }
      }
    })

    await LanguageKnown.destroy({ where: { employee_id: id } });

    if (lang?.length > 0) {

      lang?.forEach(async (element: string) => {
        if (element) {
          const result = await LanguageKnown.create({ employee_id: id, language_name: element, rws: (req.body.data[element]).toString() });
          console.log(result, "update lang known resultt");
        }
      })

    }

    await TechnologyKnown.destroy({ where: { employee_id: id } });

    if (tech?.length > 0) {
      tech?.forEach(async (element: string) => {
        if (element) {
          const result = await TechnologyKnown.create({ employee_id: id, technology_name: element, level_of_expertise: req.body.data[element] });
          console.log(result, "update technology known resultt");
        }
      })

    }


    await ReferenceContact.destroy({ where: { employee_id: id } });

    referencecontact?.forEach(async (element: ReferenceContactInterface) => {
      if (element) {
        if (element.name) {
          const obj1: { employee_id: number } = { employee_id: id }
          const obj2: ReferenceContactInterface = {
            name: element.name,
            contactnumber: element.contactnumber,
            relation: element.relation
          }

          const mergedobj = { ...obj1, ...obj2 };
          const result: ReferenceContactInstance = await ReferenceContact.create(mergedobj);
          console.log(result, "update reference contact resultttttt");
        }
      }
    })

    if (preferredlocation?.length > 0 || noticeperiod || expectedctc || currentctc || department) {

      const preferences: PreferencesInterface = {
        preferredlocation: preferredlocation?.toString() || null,
        noticeperiod: noticeperiod || null,
        expectedctc: expectedctc || null,
        currentctc: currentctc || null,
        department: department || null

      }

      const pref_result: [affectedCount: number] = await Preferences.update(preferences, { where: { employee_id: id } });
      console.log(pref_result, "update pref_resultttt");
    }


    return res.json({
      success: true,
      message: "successfully updated data",
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }


}


export const deleteMultistepData = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {

    const delete_preferencesdetails: number = await Preferences.destroy({ where: { employee_id: id } })
    const delete_refcontactdetails: number = await ReferenceContact.destroy({ where: { employee_id: id } })
    const delete_techdetails: number = await TechnologyKnown.destroy({ where: { employee_id: id } })
    const delete_langdetails: number = await LanguageKnown.destroy({ where: { employee_id: id } })
    const delete_workexpdetails: number = await WorkExperience.destroy({ where: { employee_id: id } })
    const delete_educationdetails: number = await EducationDetails.destroy({ where: { employee_id: id } })
    const delete_basicdetails: number = await BasicDetails.destroy({ where: { id: id } })


    if (delete_basicdetails >= 0 && delete_educationdetails >= 0 && delete_workexpdetails >= 0 && delete_langdetails >= 0 && delete_techdetails >= 0 && delete_refcontactdetails >= 0 && delete_preferencesdetails >= 0) {
      return res.json({
        success: true,
        message: "record deleted successfully!"
      })
    }

  }
  catch (error) {
    console.log(error);
    res.json({ message: error })
  }

}

export const formDetails = (req: Request, res: Response) => {

  try {
    BasicDetails.findAll({})
      .then((data) => {
        res.json({ data });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  }
  catch (error) {
    res.json({ message: error })
  }
}

export const idDetails = async (req: Request, res: Response) => {

  const id: string = req.params.id

  if (id != "null" && id) {

    try {
      const basicdetail_result: BasicDetailInstance | null = await BasicDetails.findOne({ where: { id: id } });
      const educationdetail_result: educationDetailInstance[] = await EducationDetails.findAll({ where: { employee_id: id } });
      const workexp_result: WorkExperienceInstance[] = await WorkExperience.findAll({ where: { employee_id: id } });
      const languageknown_result = await LanguageKnown.findAll({ where: { employee_id: id } });
      const technologyknown_result = await TechnologyKnown.findAll({ where: { employee_id: id } });
      const referencecontact_result: ReferenceContactInstance[] = await ReferenceContact.findAll({ where: { employee_id: id } });
      const preferences_result: PreferencesInstance[] = await Preferences.findAll({ where: { employee_id: id } });

      console.log(basicdetail_result?.dataValues, "basic");

      const edu_arr: EducationDetailsInterface[] = [];
      educationdetail_result.map((element: educationDetailInstance) => {
        return edu_arr.push(element.dataValues);
      })
      console.log(edu_arr, "education arrrrrrrrrrr");

      const work_arr: WorkExperienceInterface[] = [];
      workexp_result.map((element: WorkExperienceInstance) => {
        return work_arr.push(element.dataValues)
      })
      console.log(work_arr, "workk arrrrrrrrrrr");

      const lang_arr: LanguageKnownInterface[] = [];
      languageknown_result.map((element: LanguageKnownInstance) => {
        return lang_arr.push(element.dataValues)
      })
      console.log(lang_arr, "langggg arrrrrrrrrrr");

      const tech_arr: TechnologyKnownInterface[] = [];
      technologyknown_result.map((element: TechnologyKnownInstance) => {
        return tech_arr.push(element.dataValues)
      })
      console.log(tech_arr, "techhhh arrrrrrrrrrr");

      const ref_arr: ReferenceContactInterface[] = [];
      referencecontact_result.map((element: ReferenceContactInstance) => {
        return ref_arr.push(element.dataValues)
      })
      console.log(ref_arr, "reference arrrrrrrrrrr");




      const result = {
        basicdetails: basicdetail_result?.dataValues,
        education_details: edu_arr,
        workexp_details: work_arr,
        langknown_details: lang_arr,
        techknown_details: tech_arr,
        refcontact_details: ref_arr,
        preferences_details: preferences_result[0].dataValues
      }

      console.log(result, "end resultttttttt");

      return res.json({
        success: true,
        data: result
      })


    }
    catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }

  }
  else {
    return res.status(500).json({
      success: false,
      message: "id not found",
    });
  }

}

export const storeProducts = async (req: Request, res: Response) => {
  console.log("in store products");
  console.log(req.body, "body of products");

  let products = req.body.products;
  console.log(products, "arrrr");
  console.log(products.length);

  try {
    await products.map((product: any) => {
      let ressult = Products.create({ title: product.title, description: product.description, price: product.price, initial_quantity: 1, image_url: product.image, rating: product.rating.rate, total_quantity: product.rating.count });
      console.log(ressult);
    })
  }
  catch (err) {
    console.log(err);
  }


}

export const getProducts = async (req: Request, res: Response) => {
  try {

    Products.findAll({})
      .then((data) => {
        res.json({ data });
      })
      .catch((err: Error) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });
  }
  catch (error) {
    res.json({ message: error })
  }
}
// export const deleteAll=(req,res)=>{

//   Tutorial.destroy({
//     where: {},
//     truncate:false
//   })
//   .then(nums=>{
//       res.send({message:` ${nums} tutorials deleted successfully`})
//   })
//   .catch(err=>{
//     res.status(500).send({
//       message:`error in deleting Tutorials`
//     })
//   })
// }