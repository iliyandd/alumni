export const getSession = async () => {
    try {
        const response = await fetch("../../back-end/api/handlers/getSession.php", {
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