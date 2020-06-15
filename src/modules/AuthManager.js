const remoteURL = "http://localhost:5002";

export default {
  saveNewUser(createNewUser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createNewUser),
    })
      .then((response) => response.json())
      .then((user) => {
        sessionStorage.setItem("activeUser", user.id);
      });
  },
  getAllUsers() {
    return fetch(`${remoteURL}/users`).then((response) => response.json());
  },
  loginUser(credentials) {
    return fetch(
      `${remoteURL}/users?email=${credentials.email}&password=${credentials.password}`
    ).then((response) => response.json());
  },
};