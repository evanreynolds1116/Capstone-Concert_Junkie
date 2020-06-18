const remoteURL = "http://localhost:5002";

export default {
  postNewVenue(venue) {
    return fetch(`${remoteURL}/venues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venue),
    }).then((data) => data.json());
  },
  getAll() {
    return fetch(`${remoteURL}/venues`).then((result) => result.json());
  },
  get(id) {
    return fetch(`${remoteURL}/venues/${id}?_expand=location`).then(result => result.json())
  },
}