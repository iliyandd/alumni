import { getSession } from "../../GlobalScripts/session.js";
import { isValidName, addErrorMessages } from "../../GlobalScripts/validations.js";

window.addEventListener("load", async () => {
  let sessionId = null;
  const sessionObj = await getSession();
  sessionId = sessionObj != null && sessionObj.id != null && sessionObj.id;

  if (!sessionId) {
    alert("You are not logged in");
    window.location.href = "../login/login.html";
    return;
  }
  if (!sessionObj.inAlumni) {
    alert("You are not in alumni club");
    window.location.href = "../profile/profile.html";
    return;
  }
});

const validate = (title, date) => {
  const response = [];
  if (!isValidName(title)) {
    response.push({
      id: "title",
      message: "*Въведете заглавие между 3 и 64 символа",
    });
  }
  if (date == "") {
    response.push({ id: "date", message: "*Въведете дата" });
  } else {
    const today = new Date();
    const eventDate = new Date(date);
    if (eventDate < today) {
      response.push({ id: "date", message: "*Въведете бъдеща дата" });
    }
  }
  if (response.length > 0) {
    response.push({ success: false });
  } else {
    response.push({ success: true });
  }
  return response;
};

const form = document.querySelector(".create_event_form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const date = document.querySelector("#date");
  const response = validate(title.value, date.value);

  const success = response.find(
    (element) => element.success !== undefined
  )?.success;
  if (success) {
    const data = {
      title: title.value,
      description: description.value,
      date: date.value,
    };

    try {
      const response = await fetch(
        "../../../../alumni/back-end/api/events.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const addedEvent = await response.json();
        if (addedEvent.error) {
          throw new Error(data.error);
        }
        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
        alert("Събитието е създадено успешно!");

        window.location.href = "./events.html";
      } else {
        throw new Error("Неуспешно добавяне на събитие!\n");
      }
    } catch (err) {
      [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
      alert(err.message + "Опитай да добавиш събитие отново по-късно.");
    }
  } else {
    addErrorMessages(response);
  }
});
