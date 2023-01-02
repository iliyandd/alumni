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

  //get id and edit params from url if exists
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const edit = urlParams.get("edit");

  if (id) {
    const event = await getEvent(id);
    if (event) {
      const title = document.querySelector(".event_title");
      const description = document.querySelector(".event_description_text");
      const date = document.querySelector(".event_date");
      const creator = document.querySelector(".event_creator");
      title.innerText = event.title;
      description.innerText = event.description;
      date.innerText = event.date;
      creator.innerText = `${event.firstName} ${event.lastName}`;
    }
  } else {
    alert("Няма такова събитие!");
    window.location.href = "../events/events.html";
    return;
  }
});

const getEvent = async (id) => {
  try {
    const response = await fetch(
      `../../../../alumni/back-end/api/events.php?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
