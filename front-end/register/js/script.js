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
      message: "Потребителското име не покрива изискванията за регистрация",
    });
  }
  if (!isValidEmail(email)) {
    response.push({
      id: "email",
      message: "Имейла не покрива изискванията за регистрация",
    });
  }
  if (!isValidPassword(password)) {
    response.push({
      id: "password",
      message:
        "Паролата трябва да е между 8 и 64 символа и да има поне една малка, голяма буква, цифра и специален символ",
    });
  }
  if (!isSamePassword(password, confirmPassword)) {
    response.push({
      id: "confirm_password",
      message: "Паролите не съвпадат",
    });
  }
  if (!isValidFn(fn)) {
    response.push({ id: "fn", message: "Невалиден факултетен номер" });
  }
  if (!isValidSpeciality(speciality)) {
    response.push({ id: "speciality", message: "Невалидна специалност" });
  }
  if (!isValidName(firstName)) {
    response.push({ id: "first_name", message: "Невалидно име" });
  }
  if (!isValidName(lastName)) {
    response.push({ id: "last_name", message: "Невалидна фамилия" });
  }
  if (response.length > 0) {
    response.push({ success: false });
  } else {
    response.push({ success: true });
  }
  return response;
};

const addErrorMessages = (response) => {
  response.forEach((element) => {
    const input = document.querySelector(`#${element.id}`);
    if (input != null) {
      //clear the old messages if it has
      const oldError = input.parentNode.querySelector(".error");
      if (oldError !== null) {
        oldError.remove();
      }
      //create new error message
      const errorElement = document.createElement("span");
      errorElement.classList.add("error");
      errorElement.innerText = element.message;
      //add element after the current input
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
  });
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

  console.log(response);

  const success = response.find(
    (element) => element.success !== undefined
  )?.success;
  if (success) {
    const data = {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      fn: fn.value,
      speciality: speciality.value,
      in_alumni: false,
    };

    fetch("../../../back-end/api/register/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        if (data["status"] < 200 || data["status"] >= 300) {
          throw new Error(
            `Error with status code: ${data.status} and message: ${data.statusText}`
          );
        } else {
          console.log("success");
          alert("You have successfully registered!");
          [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
          window.location.href = "../../login/login.html";
        }
      })
      .catch((err) => {
        alert(err.message + "\nTry again to register later");
        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
      });
    //remove all error messages
  } else {
    addErrorMessages(response);
  }
});
