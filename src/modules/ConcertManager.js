const remoteURL = 'http://localhost:5002'

export default {
  postConcert(concert) {
    return fetch(`${remoteURL}/concerts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(concert),
    }).then((data) => data.json());
  },
  get(id) {
    return fetch(`${remoteURL}/concerts?userId=${id}&_expand=venue&_sort=date&_order=desc`).then(result => result.json())
  },
  getUserConcerts(id) {
    return fetch(`${remoteURL}/concerts?userId=${id}`).then(result => result.json())
  },
  getConcert(id, venueId) {
    return fetch(`${remoteURL}/concerts/${id}?venue=${venueId}&_expand=venue`).then(result => result.json())
  },
  getConcertOnly(id) {
    return fetch(`${remoteURL}/concerts/${id}`).then(result => result.json())
  },
  delete(id) {
    return fetch(`${remoteURL}/concerts/${id}`, {
      method: "DELETE"
    }).then(result => result.json())
  },
  update(editedConcert) {
    return fetch(`${remoteURL}/concerts/${editedConcert.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedConcert)
    }).then(data => data.json());
  }
}