import { getSession } from "../../GlobalScripts/session.js";
window.addEventListener("load", async () => {
  let sessionId = null;
  const sessionObj = await getSession();
  sessionId = sessionObj != null && sessionObj.id != null && sessionObj.id;

  if (!sessionId) {
    alert("Не сте влезли в профила си!");
    window.location.href = "../login/login.html";
    return;
  }
  if (!sessionObj.inAlumni) {
    alert("Не сте в Алумни клуба!");
    window.location.href = "../profile/profile.html";
    return;
  }

  const data = await getEvents();
  data.forEach((event) => {
    generateEvent(event, sessionId);
  });

  const events = document.querySelectorAll(".event");
  events.forEach((event) => {
    //on click event to go to event page
    event.addEventListener("click", () => {
      const id = event.querySelector(".event_id").innerText;
      window.location.href = `./event.html?id=${id}&edit=0"`;
    });
  });
});

const generateEvent = (data, userId) => {
  const parent = document.querySelector(".events_list");
  const event = document.createElement("div");
  event.classList.add("event");
  event.innerHTML = `
    <div class="event_headers">
        <h3>${data.title}</h3>
        <h4>${data.firstName} ${data.lastName}</h4>
        <h4>${data.date}</h4>
    </div>
    ${userId == data.creator
      ? `<div class="event_addition">
    <a href="./event.html?id=${data.id}&edit=1" class="event_addition_edit"></a>
    <a href="./events.html?id=${data.id}&delete=1" class="event_addition_delete"></a>
    </div>`
      : ""
    }
    <span class="event_id">${data.id}</span>`;
  parent.appendChild(event);
};

const getEvents = async () => {
  try {
    const response = await fetch("../../../../alumni/back-end/api/events.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.result;
    } else {
      throw new Error("Неуспешно зареждане на събитията!\n");
    }
  } catch (err) {
    alert(err.message + "Опитай отново по-късно.");
  }
};

