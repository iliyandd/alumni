import { getSession } from "../../GlobalScripts/session.js";

window.addEventListener("load", async () => {
    let sessionId = null;
  const sessionObj = await getSession();
  sessionId = sessionObj != null && sessionObj.id != null && sessionObj.id;

  if (!sessionId) {
    const entry = document.querySelector('.main_nav_list li:last-child');
    entry.innerHTML = '<a class="main_nav_item_link" href="../login/login.html">Вход</a>';
  }
});