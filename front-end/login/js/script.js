const isEmpty = (value) =>
  value === "" || value === undefined || value === null;
const isValidEmail = (email) => {
  // regex for email validation, which check whether the email starts with letter, has @, after it has letters and . ends with letters
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return !isEmpty(email) && regex.test(email) && email.length <= 64;
};
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

const addErrorMessages = (response) => {
  response.forEach((element) => {
    debugger;
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

const form = document.querySelector("#login_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  debugger;
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
        return response;
      })
      .then((data) => {
        if (data["status"] !== 200 && data["status"] !== 201) {
          throw new Error(
            `Error with status code: ${data.status} and message: ${data.statusText}`
          );
        } else {
          console.log("success");
          alert("You have successfully login!");
          [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
          sessionStorage.setItem("email", email.value);
          window.location.href = "../../login/login.html";
        }
    })
    .catch((err) => {
        alert(err.message + "\nTry again to register later");
        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
      });
  } else {
    addErrorMessages(response);
  }
});
