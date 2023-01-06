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

  const loadingSpinner = document.querySelector(".loading_spinner");
  loadingSpinner.style.display = "flex";

  const data = await getMembers();
  let membersBasicData = {};
  setTimeout(() => {
    loadingSpinner.style.display = "none";
    if (data.length <= 0) {
      document.querySelector(".members_title").innerText =
        "Няма членове в клуба!";
    } else {
      data.forEach((member) => {
        generateMember(member, sessionId);
        membersBasicData[member.id] = member.username;
      });

      const removeMemberBtn = document.querySelectorAll(
        ".list_members_item_btn_remove"
      );

      removeMemberBtn.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const isConfirmed = confirm(
            "Сигурни ли сте, че искате да премахнете члена от групата?"
          );
          if (isConfirmed) {
            const id =
              e.target.parentNode.parentNode.querySelector(
                ".member_id"
              ).innerText;
            try {
              const response = await fetch(
                "../../../../alumni/back-end/api/members.php",
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id, username: membersBasicData[id] }),
                }
              );

              if (response.ok) {
                alert("Членът е премахнат от групата!");
                window.location.reload();
              } else {
                throw new Error("Неуспешно изтриване на член!\n");
              }
            } catch (err) {
              alert(err.message + "Опитай отново по-късно.");
            }
          }
        });
      });
    }
  });
});

const getMembers = async () => {
  try {
    const response = await fetch(
      "../../../../alumni/back-end/api/members.php",
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
      throw new Error("Неуспешно зареждане на членовете!\n");
    }
  } catch (err) {
    alert(err.message + "Опитай отново по-късно.");
  }
};

const generateMember = (data, userId) => {
  if (data.id == userId) return;
  const parent = document.querySelector(".list_members");
  const event = document.createElement("li");
  event.classList.add("list_members_item");
  event.innerHTML = `
      <div class="list_members_item_info">
        <div class="list_members_item_info_name">
            <h4>Име: ${data.firstName} ${data.lastName}</h4>
        </div>
        <div class="list_members_item_info_email">
            <h4>Ел. поща: ${data.email}</h4>
        </div>
        <div class="list_members_item_info_username">
            <h4>Потребителско име: ${data.username}</h4>
        </div>
      </div>
      <div class="list_members_item_btn">
        <button class="list_members_item_btn_remove"></button>
      </div> 
      <span class="member_id">${data.id}</span>`;
  parent.appendChild(event);
};
