import { getSession } from "../../GlobalScripts/session.js";
import {
  isValidName,
  addErrorMessages,
} from "../../GlobalScripts/validations.js";
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

  document.cookie = `sessionId=${sessionId}`;
});

const validate = (title, description, date) => {
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
  debugger;
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const date = document.querySelector("#date");
  const response = validate(title.value, description.value, date.value);

  console.log(response);

  const success = response.find(
    (element) => element.success !== undefined
  )?.success;
  if (success) {
    //get the cookie with id session id and add it to the data
    const id = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sessionId"))
      .split("=")[1];

    const data = {
      title: title.value,
      description: description.value,
      creator: id,
      date: date.value,
    };
    console.log(data);

    try {
      const response = await fetch(
        "../../../../alumni/back-end/api/events.php",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const addedEvent = await response.json();
        if (addedEvent.error) {
          throw new Error(data.error);
        }
        [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
        console.log(addedEvent);
        alert("Събитието е създадено успешно!");
        //locate to the events page
        window.location.href = "./events.html";
      } else {
        throw new Error("Неуспешно добавяне на събитие!\n");
      }
    } catch (err) {
      console.log(err);
      [...e.target.querySelectorAll(".error")].forEach((el) => el.remove());
      alert(err.message + "Опитай да добавиш събитие отново по-късно.");
    }
  } else {
    addErrorMessages(response);
  }
});
