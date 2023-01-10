export const isEmpty = (value) =>
  value === "" || value === undefined || value === null;
export const isValidEmail = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return !isEmpty(email) && regex.test(email) && email.length <= 64;
};
export const isValidPassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/;
  return !isEmpty(password) && regex.test(password);
};
export const isSamePassword = (password, confirmPassword) =>
  password === confirmPassword;
export const isValidFn = (fn) => {
  return !isEmpty(fn) && fn.length >= 4 && fn.length <= 32;
};
export const isValidSpeciality = (speciality) => {
  return (
    !isEmpty(speciality) && speciality.length >= 2 && speciality.length <= 64
  );
};
export const isValidName = (name) => {
  return !isEmpty(name) && name.length >= 2 && name.length <= 64;
};
export const addErrorMessages = (response) => {
    response.forEach((element) => {
      const input = document.querySelector(`#${element.id}`);
      if (input != null) {
        const oldError = input.parentNode.querySelector(".error");
        if (oldError !== null) {
          oldError.remove();
        }
        const errorElement = document.createElement("span");
        errorElement.classList.add("error");
        errorElement.innerText = element.message;
        input.parentNode.insertBefore(errorElement, input.nextSibling);
      }
    });
  };