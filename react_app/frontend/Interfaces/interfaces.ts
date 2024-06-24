// address1: "sarkhej"

// address2: "jhvb"

// bachelorcourse: "CSE"

// bachelorpassingyear: 2024

// bachelorpercentage: 70

// basicdetails: Object { id: 2, firstname: "Harsh", lastname: "Solanki", … }

// city: "Ahmedabad"

// currentctc: "4 LPA"

// department: "development"

// designation: "software developer"

// dob: "2012-04-14"

// education_details: Array(3)[{… }, {… }, {… }]

// email: "frewfsdf@gmail.com"

// english: Array[]

// expectedctc: "5 LPA"

// firstname: "Harsh"

// gender: "male"

// gujarati: Array[]

// hindi: Array["read"]

// hscboard: "GSEB"

// hscpassingyear: 2020

// hscpercentage: 80

// lang: Array(3)["hindi", false, false]

// langknown_details: Array[{… }]

// laravel: null

// lastname: "Solanki"

// mastercourse: ""

// masterpassingyear: ""

// masterpercentage: ""

// mysql: "mideator"

// noticeperiod: "1 month"

// oracle: null

// phonenumber: "9316836458"

// php: null

// preferences_details: Object { id: 2, employee_id: 2, preferredlocation: "ahmedabad", … }

// preferredlocation: "ahmedabad"

// refcontact_details: Array[{… }]

// referencecontact: Array[{… }]

// relationship_status: "unmarried"

// sscboard: "GSEB"

// sscpassingyear: 2018

// sscpercentage: 99

// state: "Maharashtra"

// tech: Array(4)[false, "mysql", false, … ]

// techknown_details: Array[{… }]

// workexp_details: Array[{… }]

// workexperience: Array(3)[{… }, {… }, {… }]

export interface FormInterface {

  address1: string
  address2: string
  bachelorcourse: string
  bachelorpassingyear: number
  bachelorpercentage: number
  basicdetails: BasicdetailsInterface
  city: string
  currentctc: string
  department: string
  designation: string
  dob: Date
  education_details: Array<EducationdetailsInterface>
  email: string
  english: string[]
  expectedctc: string
  firstname: string
  gender: string
  gujarati: string[]
  hindi: string[]
  hscboard: string
  hscpassingyear: number
  hscpercentage: number
  lang: boolean[] | string[]
  langknown_details: Array<LanguageDetailsInterface>
  laravel: string | null
  lastname: string
  mastercourse: string
  masterpassingyear: number
  masterpercentage: number
  mysql: string | null
  noticeperiod: string
  oracle: string | null
  phonenumber: string
  php: string | null
  preferences_details: PreferencesDetailsInterface
  preferredlocation: string
  refcontact_details: Array<RefContactDetailsInterface>
  referencecontact: Array<RefContactDetailsInterface>
  relationship_status: string
  sscboard: string
  sscpassingyear: number
  sscpercentage: number
  state: string
  tech: string[] | boolean[]
  techknown_details: TechnologyDetailsInterface
  workexp_details: Array<WorkExperienceInterface>
  workexperience: Array<WorkExperienceInterface>
}

export interface BasicdetailsInterface {
  address1: string
  address2: string | null
  city: string
  createdAt: Date
  designation: string
  dob: string
  email: string
  firstname: string
  gender: string
  id: number
  lastname: string
  phonenumber: string
  relationship_status: string
  state: string
  updatedAt: Date
}

export interface EducationdetailsInterface {
  createdAt: Date
  employee_id: number
  id: number
  nameofboard_or_coursename: string
  passingyear: number
  percentage: number
  updatedAt: Date
}

export interface LanguageDetailsInterface {
  createdAt: Date
  employee_id: number
  id: number
  language_name: string
  rws: string
  updatedAt: Date
}

export interface TechnologyDetailsInterface {
  createdAt: Date
  employee_id: number
  id: number
  level_of_expertise: string
  technology_name: string
  updatedAt: Date
}

export interface PreferencesDetailsInterface {
  createdAt: Date
  currentctc: string
  department: string
  employee_id: number
  expectedctc: string
  id: number
  noticeperiod: string
  preferredlocation: string
  updatedAt: Date
}

export interface RefContactDetailsInterface {
  contactnumber: string
  createdAt: Date
  employee_id: number
  id: number
  name: string
  relation: string
  updatedAt: Date
}

export interface WorkExperienceInterface {
  company_name: string
  createdAt: Date
  designation: string
  employee_id?: number
  from_date: Date
  id?: number
  to_date: Date
  updatedAt: Date
}

export interface newValueInterface {
  contact_no: string
  dob: Date
  email: string
  firstname: string
  gender: string
  id: number
  lastname: string
  token: string
}

