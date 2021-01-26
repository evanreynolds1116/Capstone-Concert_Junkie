const remoteURL = 'http://localhost:5002'

export default {
  postVideo(video) {
    return fetch(`${remoteURL}/videos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    }).then((data) => data.json());
  },
  getVideo(concertId) {
    return fetch(`${remoteURL}/videos?concertId=${concertId}`).then(result => result.json())
  },
}