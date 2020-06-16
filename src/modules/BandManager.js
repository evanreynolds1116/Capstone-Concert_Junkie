const remoteURL = "http://localhost:5002";

export default {
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
  }
}