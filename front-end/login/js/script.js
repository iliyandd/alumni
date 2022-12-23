import { isValidEmail, isEmpty, addErrorMessages } from "../../GlobalScripts/validations.js";
const validate = (email, password) => {
  const response = [];
  if (!isValidEmail(email)) {
    response.push({ id: "email", message: "Имейла не е валиден" });
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
    fetch("../../../back-end/api/login/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          // Check the status code and throw an error if it's not in the 2xx range
          throw new Error(
            `Error with status code: ${response.status} and message: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        // Check the data object for any error messages or flags
        if (data.error) {
          throw new Error(data.error);
        }
        console.log("success");
        alert("You have successfully login!");
        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
        let user;
        if (sessionStorage.hasOwnProperty("user")) {
          user = JSON.parse(sessionStorage.getItem("user"));
        }
        // Redirect to the home page
        // window.location.href = "../../../front-end/profile/profile.html?user=" + user.id;
      })
      .catch((err) => {
        alert(err.message + "\nTry again to login later");
        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
      });
  } else {
    addErrorMessages(response);
  }
});
