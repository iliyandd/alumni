const getSession = async () => {
  try {
    const response = await fetch(`../../back-end/api/handlers/getSession.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const session = await response.json();
    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const loadDataIntoPage = (profile) => {
  const headerName = document.querySelector("#header_profile_name");
  headerName.textContent = `${profile.firstName} ${profile.lastName}`;
  const firstName = document.querySelector("#first_name");
  const lastName = document.querySelector("#last_name");
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const fn = document.querySelector("#fn");
  const speciality = document.querySelector("#speciality");
  const inAlumni = document.querySelector("#in_alumni_text");

  firstName.value = profile.firstName != "" ? profile.firstName : "";
  lastName.value = profile.lastName != "" ? profile.lastName : "";
  username.value = profile.username != "" ? profile.username : "";
  email.value = profile.email != "" ? profile.email : "";
  fn.value = profile.fn != "" ? profile.fn : "";

  const options = [...speciality.children];
  if (profile.speciality != null) {
    const currentOption = options.find(
      (opt) => opt.value == profile.speciality
    );
    if (currentOption != null) {
      currentOption.selected = true;
    }
  }


  if (profile.inAlumni != null) {
    inAlumni.textContent = profile.inAlumni
      ? "Вие сте в алумни клуба на ФМИ"
      : "Вие НЕ сте в алумни клуба на ФМИ";
  }
};

window.addEventListener("load", async () => {
  let sessionId = null;
  const sessionObj = await getSession();
  sessionId = sessionObj != null && sessionObj.id != null && sessionObj.id;

  if (!sessionId) {
    alert("You are not logged in");
    window.location.href = "../login/login.html";
    return;
  }

  console.log(sessionObj);
  loadDataIntoPage(sessionObj);
});
