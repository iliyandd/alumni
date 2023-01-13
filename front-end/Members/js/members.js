import { getSession } from "../../GlobalScripts/session.js";
import { changeExitWithEntry } from "../../GlobalScripts/footer.js";

var membersBasicData = {};
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
  document.cookie = `sessionId=${sessionId}`;
  const loadingSpinner = document.querySelector(".loading_spinner");
  loadingSpinner.style.display = "flex";

  const data = await getMembers();
  document.querySelector(".members_title").innerText =
    "Всички членове:";
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
        btn.addEventListener("click", removeMember);
      });
    }
  });
  const searchMemberBtn = document.querySelector(".search_member_btn");
  const searchUsersBtn = document.querySelector(".add_member_btn");
  searchMemberBtn.addEventListener("click", searchMember);
  searchUsersBtn.addEventListener("click", searchNewMember);
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
      document.querySelector(".members_title").innerText =
        "Резултати от търсенето:";
      return data.result;
    } else {
      document.querySelector(".members_title").innerText =
        "Неуспешно зареждане на членовете!";
    }
  } catch (err) {
    alert(err.message + "Опитай отново по-късно.");
  }
};

const getUsers = async () => {
  try {
    const response = await fetch(
      "../../../../alumni/back-end/api/members.php?isMember=0",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      document.querySelector(".members_title").innerText =
        "Резултати от търсенето:";
      return data.result;
    } else {
      document.querySelector(".members_title").innerText =
        "Не съществува такъв потребител, който не е член на Алумни клуба!";
    }
  } catch (err) {
    alert(err.message + "Опитай отново по-късно.");
  }
};

const getMember = async (searchValue, inAlumni) => {
  try {
    const response = await fetch(
      `../../../../alumni/back-end/api/members.php?username=${searchValue}&isMember=${inAlumni}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      document.querySelector(".members_title").innerText =
        "Резултати от търсенето:";
      return data.result;
    } else {
      document.querySelector(".members_title").innerText =
        inAlumni === 1
          ? "Не съществува такъв член на Алумни клуба!"
          : "Не съществува такъв потребител, който не е член на Алумни клуба!";
    }
  } catch (err) {
    alert(err.message + "Опитай отново по-късно.");
  }
};

const searchNewMember = async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#member_value");
  const searchValue = searchInput.value;
  const loadingSpinner = document.querySelector(".loading_spinner");
  const parent = document.querySelector(".list_members");
  parent.innerHTML = "";
  loadingSpinner.style.display = "flex";
  let data = [];
  if (searchValue === "") {
    data = await getUsers();
  } else {
    data = await getMember(searchValue, 0);
  }
  setTimeout(() => {
    loadingSpinner.style.display = "none";
    if (!data) {
      return;
    }
    const userId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sessionId"))
      .split("=")[1];
    data.forEach((member) => {
      generateMember(member, userId, true);
      membersBasicData[member.id] = member.username;
    });
    const addMemberBtns = document.querySelectorAll(
      ".list_members_item_btn_add"
    );
    addMemberBtns.forEach((btn) => {
      btn.addEventListener("click", addMember);
    });
  });
};

const searchMember = async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#member_value");
  const searchValue = searchInput.value;
  const loadingSpinner = document.querySelector(".loading_spinner");
  const parent = document.querySelector(".list_members");
  parent.innerHTML = "";
  loadingSpinner.style.display = "flex";
  let data = [];
  if (searchValue === "") {
    data = await getMembers();
  } else {
    data = await getMember(searchValue, 1);
  }
  setTimeout(() => {
    loadingSpinner.style.display = "none";
    if (!data) {

      return;
    }
    const userId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sessionId"))
      .split("=")[1];
    data.forEach((member) => {
      generateMember(member, userId);
      membersBasicData[member.id] = member.username;
    });
    const removeMemberBtnUpdated = document.querySelectorAll(
      ".list_members_item_btn_remove"
    );

    removeMemberBtnUpdated.forEach((btn) => {
      btn.addEventListener("click", removeMember);
    });
  });
};

const generateMember = (data, userId = null, forAdding = false) => {
  const parent = document.querySelector(".list_members");
  const member = document.createElement("li");
  member.classList.add("list_members_item");
  member.innerHTML = `
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
      <span class="member_id">${data.id}</span>
      <span class="in_alumni">${data.inAlumni}</span>`;

  if (data.id != userId) {
    member.innerHTML += `
    <div class="list_members_item_btn">
      ${forAdding
        ? ` 
        <button class="list_members_item_btn_add"></button>`
        : `
        <button class="list_members_item_btn_remove"></button>
       `
      }
    </div>
    `
  }

  parent.appendChild(member);
};

const removeMember = async (e) => {
  const isConfirmed = confirm(
    "Сигурни ли сте, че искате да премахнете члена от групата?"
  );
  if (isConfirmed) {
    let inAlumni =
      e.target.parentNode.parentNode.querySelector(".in_alumni").innerText;
    inAlumni = inAlumni === "1" ? 0 : 1;
    const id =
      e.target.parentNode.parentNode.querySelector(".member_id").innerText;
    try {
      const response = await fetch(
        "../../../../alumni/back-end/api/members.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inAlumni, username: membersBasicData[id] }),
        }
      );

      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error("Неуспешно изтриване на член!\n");
      }
    } catch (err) {
      alert(err.message + "Опитай отново по-късно.");
    }
  }
};
const addMember = async (e) => {
  const isConfirmed = confirm(
    "Сигурни ли сте, че искате да добавите потребителя към групата?"
  );
  if (isConfirmed) {
    let inAlumni = e.target.parentNode.parentNode.querySelector(".in_alumni").innerText;
    inAlumni = inAlumni === "0" ? 1 : 0;
    const id = e.target.parentNode.parentNode.querySelector(".member_id").innerText;
    try {
      const response = await fetch(
        "../../../../alumni/back-end/api/members.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inAlumni, username: membersBasicData[id] }),
        }
      );

      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error("Неуспешно добавяне на потребител към групата!\n");
      }
    } catch (err) {
      alert(err.message + "Опитай отново по-късно.");
    }
  }
};
