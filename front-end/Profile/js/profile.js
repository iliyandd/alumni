import {
  isValidName,
  isValidEmail,
  isValidPassword,
  addErrorMessages,
  isSamePassword,
  isValidFn,
  isValidSpeciality,
} from "../../GlobalScripts/validations.js";
import { getSession } from "../../GlobalScripts/session.js";
import { changeExitWithEntry } from "../../GlobalScripts/footer.js";

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

const loadDataIntoPage = (profile) => {
  const headerName = document.querySelector("#header_profile_name");
  headerName.textContent = `${profile.firstName} ${profile.lastName}`;
  const firstName = document.querySelector("#first_name");
  const lastName = document.querySelector("#last_name");
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const fn = document.querySelector("#fn");
  const speciality = document.querySelector("#speciality");
  const inAlumni = document.querySelector("#in_alumni_text");

  firstName.value = profile.firstName != "" ? profile.firstName : "";
  lastName.value = profile.lastName != "" ? profile.lastName : "";
  username.value = profile.username != "" ? profile.username : "";
  email.value = profile.email != "" ? profile.email : "";
  fn.value = profile.fn != "" ? profile.fn : "";

  const options = [...speciality.children];
  if (profile.speciality != null) {
    const currentOption = options.find(
      (opt) => opt.value == profile.speciality
    );
    if (currentOption != null) {
      currentOption.selected = true;
    }
  }

  if (profile.inAlumni != null) {
    inAlumni.textContent = profile.inAlumni
      ? "Вие сте в алумни клуба на ФМИ"
      : "Вие НЕ сте в алумни клуба на ФМИ";
  }
};

const form = document.querySelector(".edit_profile_form");
window.addEventListener("load", async () => {
  let sessionId = null;
  const sessionObj = await getSession();
  sessionId = sessionObj != null && sessionObj.id != null && sessionObj.id;

  if (!sessionId) {
    const entry = document.querySelector('.main_nav_list li:last-child');
    entry.innerHTML = '<a class="main_nav_item_link" href="../login/login.html">Вход</a>';
    changeExitWithEntry();
    alert("Не сте влезли в профила си!");
    window.location.href = "../login/login.html";
    return;
  }
  document.cookie = `sessionId=${sessionId}`;

  const loadingSpinner = document.querySelector(".loading_spinner");
  form.style.display = "none";
  loadingSpinner.style.display = "flex";
  setTimeout(() => {
    loadDataIntoPage(sessionObj);
    loadingSpinner.style.display = "none";
    form.style.display = "block";
  }, 200);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#comfirm_password");
  const firstName = document.querySelector("#first_name");
  const lastName = document.querySelector("#last_name");
  const fn = document.querySelector("#fn");
  const speciality = document.querySelector("#speciality");
  const inAlumni = document
    .querySelector("#in_alumni_text")
    .textContent.includes("НЕ")
    ? false
    : true;

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
    const id = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sessionId"))
      .split("=")[1];

    const data = {
      username: username.value,
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      fn: fn.value,
      speciality: speciality.value,
      inAlumni,
      id,
    };
    console.log(data);

    try {
      const response = await fetch(
        "../../../../alumni/back-end/api/updateProfile.php",
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const updatedProfile = await response.json();
        if (updatedProfile.error) {
          throw new Error(data.error);
        }
        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
        window.location.reload();
      } else if (response.status == 400) {
        throw new Error("Потребител с това потребителско име, имейл или факултетен номер вече съществува!\n");
      }
      else {
        throw new Error("Проблем със сървъра.\n");
      }
    } catch (err) {
      [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
      alert(err.message + "Опитай да редактираш профила си отново.");
    }
  } else {
    addErrorMessages(response);
  }
});
