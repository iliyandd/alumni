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

      const dateBg = new Date(event.date);
      const dateBgString = dateBg.toLocaleDateString("bg-BG");
      date.innerText = dateBgString;
      creator.innerText = `${event.firstName} ${event.lastName}`;

      loadForm(event);

      if (sessionId != event.creator) {
        document.querySelector(".event_more").classList.add("hidden");
      } else {
        if (edit && edit == 1) {
          editMode();
        }

        document
          .querySelector(".event_addition_edit")
          .addEventListener("click", () => {
            editMode();
          });

        document
          .querySelector(".event_addition_view")
          .addEventListener("click", () => {
            readMode();
          });

        document.querySelectorAll(".event_addition_delete").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const isConfirmed = confirm(
              "Сигурни ли сте, че искате да изтриете събитието?"
            );
            if (isConfirmed) {
              const id = event.id;
              try {
                const response = await fetch(
                  "../../../../alumni/back-end/api/events.php",
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                  }
                );

                if (response.ok) {
                  window.location.href = "../events/events.html";
                } else {
                  throw new Error("Неуспешно изтриване на събитието!\n");
                }
              } catch (err) {
                alert(err.message + "\nОпитай отново по-късно.");
              }
            }
          });
        });

        const editForm = document.querySelector(".edit_event_form");
        editForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const title = document.querySelector("#title");
          const description = document.querySelector("#description");
          const date = document.querySelector("#date");
          const id = event.id;
          const response = validate(title.value, date.value);

          const success = response.find(
            (element) => element.success !== undefined
          )?.success;
          if (success) {
            const data = {
              title: title.value,
              description: description.value,
              date: date.value,
              id,
            };
            try {
              const response = await fetch(
                "../../../../alumni/back-end/api/events.php",
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                }
              );

              if (response.ok) {
                const data = await response.json();
                if (data.status === "error") {
                  throw new Error(data.error);
                }
                [...e.target.querySelectorAll(".error")].forEach((el) =>
                  el.remove()
                );
                window.location.href = `./event.html?id=${id}`;
              } else {
                throw new Error("Неуспешно редактиране на събитието!\n");
              }
            } catch (err) {
              alert(err.message + "\nОпитай отново по-късно.");
            }
          } else {
            addErrorMessages(response);
          }
        });
      }
    }
  } else {
    alert("Няма такова събитие!");
    window.location.href = "../events/events.html";
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

const loadForm = (data) => {
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const date = document.querySelector("#date");
  title.value = data.title;
  description.value = data.description;
  date.value = data.date;
};

const editMode = () => {
  document.querySelector(".no_edit").classList.add("hidden");
  document.querySelector(".edit").classList.remove("hidden");
};
const readMode = () => {
  document.querySelector(".no_edit").classList.remove("hidden");
  document.querySelector(".edit").classList.add("hidden");
};
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
      return data.result;
    } else {
      throw new Error("Неуспешно зареждане на събитията!\n");
    }
  } catch (err) {
    alert(err.message + "Опитай отново по-късно.");
  }
};
