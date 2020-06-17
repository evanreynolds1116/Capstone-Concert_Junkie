const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/bands/${id}`).then((result) => result.json());
  },
  postNewBand(band) {
    return fetch(`${remoteURL}/bands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(band),
    }).then((data) => data.json());
  },
  getAll() {
    return fetch(`${remoteURL}/bands`).then((result) => result.json());
  },
  postConcertBand(concertBand) {
    return fetch(`${remoteURL}/concertBands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(concertBand),
    }).then((data) => data.json());
  },
}