import { isValidName, isValidEmail, isValidPassword, addErrorMessages, isSamePassword, isValidFn, isValidSpeciality } from "../../GlobalScripts/validations.js";
const validate = (
  username,
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  fn,
  speciality
) => {
  const response = [];
  if (!isValidName(username)) {

    response.push({
      id: "username",
      message: "*Потребителското име не покрива изискванията за регистрация",
    });
  }
  if (!isValidEmail(email)) {
    response.push({
      id: "email",
      message: "*Имейла не покрива изискванията за регистрация",
    });
  }
  if (!isValidPassword(password)) {
    response.push({
      id: "password",
      message:
        "*Паролата трябва да е между 8 и 64 символа и да има поне една малка, голяма буква, цифра и специален символ",
    });
  }
  if (!isSamePassword(password, confirmPassword)) {
    response.push({
      id: "confirm_password",
      message: "*Паролите не съвпадат",
    });
  }
  if (!isValidFn(fn)) {
    response.push({ id: "fn", message: "*Невалиден факултетен номер" });
  }
  if (!isValidSpeciality(speciality)) {
    response.push({ id: "speciality", message: "*Невалидна специалност" });
  }
  if (!isValidName(firstName)) {
    response.push({ id: "first_name", message: "*Невалидно име" });
  }
  if (!isValidName(lastName)) {
    response.push({ id: "last_name", message: "*Невалидна фамилия" });
  }
  if (response.length > 0) {
    response.push({ success: false });
  } else {
    response.push({ success: true });
  }
  return response;
};



const form = document.querySelector("#register_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirm_password");
  const firstName = document.querySelector("#first_name");
  const lastName = document.querySelector("#last_name");
  const fn = document.querySelector("#fn");
  const speciality = document.querySelector("#speciality");

  const response = validate(
    username.value,
    email.value,
    password.value,
    confirmPassword.value,
    firstName.value,
    lastName.value,
    fn.value,
    speciality.value
  );


  const success = response.find(
    (element) => element.success !== undefined
  )?.success;
  if (success) {
    const data = {
      username: username.value,
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      fn: fn.value,
      speciality: speciality.value,
      inAlumni: false,
    };

    fetch("../../../../alumni/back-end/api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok && response.status !== 400) {
          throw new Error(
            `Грешка с код: ${response.status} и съобщение: ${response.statusText}`
          );
        }

        return response.json();
      })
      .then((data) => {
        if (data.status === 'error') {
          throw new Error(data.message);
        }

        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
        window.location.href = "../login/login.html";
      })
      .catch((err) => {
        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
        alert(err + "\nОпитай да се регистрираш отново по-късно.");
      });
    //remove all error messages
  } else {
    addErrorMessages(response);
  }
});
