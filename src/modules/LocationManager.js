const remoteURL = "http://localhost:5002";

export default {
  postNewLocation(location) {
    return fetch(`${remoteURL}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    }).then((data) => data.json());
  },
  getAll() {
    return fetch(`${remoteURL}/locations`).then((result) => result.json());
  },
  get(id) {
    return fetch(`${remoteURL}/locations/${id}`).then(result => result.json())
  },
}