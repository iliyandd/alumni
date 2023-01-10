import { isValidEmail, isEmpty, addErrorMessages } from "../../GlobalScripts/validations.js";
import { getSession } from "../../GlobalScripts/session.js";

window.addEventListener("load", async () => {
  let sessionId = null;
  const sessionObj = await getSession();
  sessionId = sessionObj != null && sessionObj.id != null && sessionObj.id;

  if (sessionId) {
    alert("Не сте влезли в профила си!");
    window.location.href = "../../../../alumni/front-end/HomePage/homePage.html";
    return;
  }
});

const validate = (email, password) => {
  const response = [];
  if (!isValidEmail(email)) {
    response.push({ id: "email", message: "Имейлът не е валиден" });
  }
  if (isEmpty(password)) {
    response.push({ id: "password", message: "Паролата не е въведена" });
  }

  if (response.length > 0) {
    response.push({ success: false });
  } else {
    response.push({ success: true });
  }
  return response;
};

const form = document.querySelector("#login_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const response = validate(email.value, password.value);
  const success = response.find(
    (element) => element.success !== undefined
  )?.success;
  if (success) {
    const data = {
      email: email.value,
      password: password.value,
    };
    fetch("../../../../alumni/back-end/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok && response.status !== 404) {
          // Check the status code and throw an error if it's not in the 2xx range
          throw new Error(
            `Грешка с код: ${response.status} и съобщение: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        // Check the data object for any error messages or flags
        if (data.status === 'error') {
          throw new Error(data.message);
        }
        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
        // Redirect to the home page
        window.location.href = "../../../../alumni/front-end/HomePage/homePage.html";
      })
      .catch((err) => {
        alert(err + "\nОпитай да се впишеш отново по-късно.");
        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
      });
  } else {
    addErrorMessages(response);
  }
});
