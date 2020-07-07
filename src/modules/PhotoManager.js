const remoteURL = 'http://localhost:5002'

export default {
  postPhoto(photo) {
    return fetch(`${remoteURL}/photos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    }).then((data) => data.json());
  },
  getPhoto(concertId) {
    return fetch(`${remoteURL}/photos?concertId=${concertId}`).then(result => result.json())
  },
  update(editedPhoto) {
    return fetch(`${remoteURL}/photos/${editedPhoto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedPhoto)
    }).then(data => data.json());
  }
}