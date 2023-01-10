export const getSession = async () => {
  try {
    const response = await fetch("../../back-end/api/handlers/getSession.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const session = await response.json();
      return session;
    } else {
      throw new Error("Липсва сесия");
    }
  } catch (error) {
    return null;
  }
};
