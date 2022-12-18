const email = "nikizhelqzkov@gmail.com";
const password = "dsafcsal2W@";
const confirmPassword = "dsafcsal2W@";
const firstName = "Nikolay";
const lastName = "Zhelqzkov";
const fn = "1284213";
const speciality = "Software Engineering";

const isEmpty = (value) =>
  value === "" || value === undefined || value === null;
const isValidEmail = (email) => {
  // regex for email validation, which check whether the email starts with letter, has @, after it has letters and . ends with letters
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return !isEmpty(email) && regex.test(email) && email.length <= 64;
};
const isValidPassword = (password) => {
  // regex for  password validation with digits, upper and lower case letters and special characters and length between 8 and 64
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/;
  return !isEmpty(password) && regex.test(password);
};
const isSamePassword = (password, confirmPassword) =>
  password === confirmPassword;
const isValidFn = (fn) => {
  return !isEmpty(fn) && fn.length >= 4 && fn.length <= 32;
};
const isValidSpeciality = (speciality) => {
  return (
    !isEmpty(speciality) && speciality.length >= 2 && speciality.length <= 64
  );
};
const isValidName = (name) => {
  return !isEmpty(name) && name.length >= 2 && name.length <= 64;
};

const validate = (email,password,confirmPassword,firstName,lastName,fn,speciality) => {
  const response = [];
  if (!isValidEmail(email)) {
    response.push({ type: "email", message: "Invalid email" });
  }
  if (!isValidPassword(password)) {
    response.push({ type: "password", message: "Invalid password" });
  }
  if (!isSamePassword(password, confirmPassword)) {
    response.push({ type: "password", message: "Passwords are not the same" });
  }
  if (!isValidFn(fn)) {
    response.push({ type: "fn", message: "Invalid fn" });
  }
  if (!isValidSpeciality(speciality)) {
    response.push({ type: "speciality", message: "Invalid speciality" });
  }
  if (!isValidName(firstName)) {
    response.push({ type: "firstName", message: "Invalid firstName name" });
  }
  if (!isValidName(lastName)) {
    response.push({ type: "lastName", message: "Invalid lastName name" });
  }
  if (response.length > 0) {
    response.push({ success: false });
  } else {
    response.push({ success: true });
  }
  return response;
};

// const response = validate(email,password,confirmPassword,firstName,lastName,fn,speciality);
// console.log(response);
