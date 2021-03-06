const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/bands/${id}`).then((result) => result.json());
  },
  getConcertBand(id) {
    return fetch(`${remoteURL}/concertBands?concertId=${id}&_expand=band`).then((result) => result.json());
  },
  getConcertBands(id) {
    return fetch(`${remoteURL}/concertBands?concertId=${id}`).then((result) => result.json());
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
  delete(id) {
    return fetch(`${remoteURL}/concertBands/${id}`, {
      method: "DELETE"
    }).then(result => result.json())
  },
  update(editedConcertBand) {
    return fetch(`${remoteURL}/concertBands/${editedConcertBand.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedConcertBand)
    }).then(data => data.json());
  }
}