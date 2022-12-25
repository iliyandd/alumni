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
 

});
