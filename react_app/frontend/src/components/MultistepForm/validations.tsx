export const validateSelect = (value: string) => {
  if (value === "-select-") {
    return "please select any of following"
  }
  else {
    return true;
  }
}

export const validatePhone = (value: string) => {
  const phoneRegex = /^([6-9]{1})([0-9]{9})$/;
  if (phoneRegex.test(value)) {
    return true
  } else {
    return "enter valid phone number"
  }
}


export const validateEmail = (value: string) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "please enter valid email"
  }
  else {
    return true;
  }
}

export const validateDate = (value: string | number | Date) => {
  const currentDate = new Date();
  const userDate = new Date(value)

  if (userDate > currentDate) {
    return "enter valid date"
  }
  else {
    return true;
  }
}

export const validateHindiCheckbox = (value: string | undefined, formValues: { hindi: string | boolean[] | string[]; }) => {
  if (formValues.hindi.length > 0 && !value) {
    return "please select language";
  }
  else {
    return true;
  }

}

export const validateEnglishCheckbox = (value: string | undefined, formValues: { english: string | boolean[] | string[]; }) => {
  if (formValues.english.length > 0 && !value) {
    return "please select language";
  }
  else {
    return true;
  }

}

export const validateGujaratiCheckbox = (value: string | undefined, formValues: { gujarati: string | boolean[] | string[]; }) => {
  if (formValues.gujarati.length > 0 && !value) {
    return "please select language";
  }
  else {
    return true;
  }

}

export const validatePhpTech = (value: string, formValues: { php: string | null; }) => {

  if (formValues.php && !value) {
    return "please select technology"
  }
  else {
    return true;
  }
}

export const validateMysqlTech = (value: string, formValues: { mysql: string | null; }) => {

  if (formValues.mysql && !value) {
    return "please select technology"
  }
  else {
    return true;
  }
}

export const validateLaravelTech = (value: string, formValues: { laravel: string | null; }) => {

  if (formValues.laravel && !value) {
    return "please select technology"
  }
  else {
    return true;
  }
}

export const validateOracleTech = (value: string, formValues: { oracle: string | null; }) => {

  if (formValues.oracle && !value) {
    return "please select technology"
  }
  else {
    return true;
  }
}