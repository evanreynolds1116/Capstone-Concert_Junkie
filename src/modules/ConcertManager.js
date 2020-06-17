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
  }
}