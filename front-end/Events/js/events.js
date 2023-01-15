import { getSession } from "../../GlobalScripts/session.js";
import { changeExitWithEntry } from "../../GlobalScripts/footer.js";
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
  if (!sessionObj.inAlumni) {
    alert("Не сте в Алумни клуба!");
    window.location.href = "../profile/profile.html";
    return;
  }

  const loadingSpinner = document.querySelector(".loading_spinner");
  loadingSpinner.style.display = "flex";

  const data = await getEvents();

  setTimeout(() => {
    loadingSpinner.style.display = "none";
    data.forEach((event) => {
      generateEvent(event, sessionId);
    });
    const events = document.querySelectorAll(".event");
    events.forEach((event) => {
      event.addEventListener("click", () => {
        const id = event.querySelector(".event_id").innerText;
        window.location.href = `./event.html?id=${id}&edit=0`;
      });
    });
    const deleteButtons = document.querySelectorAll(".event_addition_delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.stopPropagation();
        const isConfirmed =
          confirm("Сигурни ли сте, че искате да изтриете събитието?");
        if (isConfirmed) {
          const id =
            e.target.parentNode.parentNode.querySelector(".event_id").innerText;
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
              window.location.reload();
            } else {
              throw new Error("Неуспешно изтриване на събитието!\n");
            }
          } catch (err) {
            alert(err.message + "\nОпитай отново по-късно.");
          }
        }
      });
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
    <button class="event_addition_delete"></button>
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
      return data.result;
    } else {
      throw new Error("Неуспешно зареждане на събитията!\n");
    }
  } catch (err) {
    alert(err.message + "Опитай отново по-късно.");
  }
};
