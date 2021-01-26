import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
  FormGroup,
  Label,
  Input, } from "reactstrap";
import ConcertManager from "../../modules/ConcertManager";
import BandManager from "../../modules/BandManager";
import "./ConcertDetails.css";
import VenueManager from "../../modules/VenueManager";
import Cloudinary from "./Cloudinary";
import CloudinaryVideo from "./CloudinaryVideo";
import CloudinaryPhoto from "./CloudinaryPhoto";
import VideoManager from "../../modules/VideoManager";
import PhotoManager from "../../modules/PhotoManager";

const ConcertDetails = (props) => {
  const [concert, setConcert] = useState({
    tourName: "",
    bands: [],
    date: "",
    venue: "",
    location: "",
    tourPoster: "",
    video: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ConcertManager.getConcert(props.concertId, props.venueId).then(
      (concertFromAPI) => {
        BandManager.getConcertBand(concertFromAPI.id)
          .then((concertBandsFromAPI) => {
            concertFromAPI.bands = concertBandsFromAPI.map(
              (concertBand) => concertBand.band
            );
            const concertBands = concertFromAPI.bands;
            const justBands = concertBands.map((band) => {
              return band.name;
            });
            return concertFromAPI;
          })
          .then((concertWithBands) => {
            VenueManager.get(concertWithBands.venueId).then((venueLocation) => {
              concertWithBands.location = venueLocation.location;
              setConcert({
                id: props.match.params.concertId,
                tourName: concertWithBands.tourName,
                tourPoster: concertWithBands.tourPoster,
                bands: concertWithBands.bands,
                date: concertWithBands.date,
                venue: concertWithBands.venue.name,
                location: concertWithBands.location.cityState,
                image: concert.image,
                video: concert.video,
              });
              return concertWithBands;
            });
          });
        setIsLoading(false);
      }
    );
  }, [props.concertId]);

  const [concertOnly, setConcertOnly] = useState({
    tourName: "",
    date: "",
    tourPoster: "",
    photo: "",
    video: ""
  });

  useEffect(() => {
    ConcertManager.getConcertOnly(props.concertId).then(
      (concertOnlyFromAPI) => {
        setConcertOnly({
          id: props.match.params.concertId,
          userId: sessionStorage.activeUser,
          tourName: concertOnlyFromAPI.tourName,
          tourPoster: concertOnlyFromAPI.tourPoster,
          date: concertOnlyFromAPI.date,
          venueId: concertOnlyFromAPI.venueId
        });
      }
    );
  }, [props.concertId]);


  const handleImage = (url) => {
    const stateToChange = { ...concert };
    stateToChange["tourPoster"] = url;
    setConcert(stateToChange);
    const concertToChange = { ...concertOnly };
    concertToChange["tourPoster"] = url;
    setConcertOnly(concertToChange);
    // ConcertManager.update(props.concertId);
  };

  const saveImage = () => {
    ConcertManager.update(concertOnly);
  };

  const [concertPhoto, setConcertPhoto] = useState({
    concertId: props.concertId,
    url: ""
  })

  const [concertPhotos, setConcertPhotos] = useState([])

  const handlePhoto = (url) => {
    const stateToChange = { ...concertPhoto};
    stateToChange["url"] = url;
    setConcertPhoto(stateToChange)
  }

  const getPhoto = () => {
    return PhotoManager.getPhoto(props.concertId).then((photosFromAPI) => setConcertPhotos(photosFromAPI))
  }

  const savePhoto = () => {
    PhotoManager.postPhoto(concertPhoto).then(() => getPhoto())
  }

  useEffect(() => {
    getPhoto();
  }, [])

  const [concertVideo, setConcertVideo] = useState({
    concertId: props.concertId,
    url: ""
  })

  const [concertVideos, setConcertVideos] = useState([])

  const handleVideo = (url) => {
    const stateToChange = { ...concertVideo};
    stateToChange["url"] = url;
    setConcertVideo(stateToChange)
  }

  const getVideo = () => {
    return VideoManager.getVideo(props.concertId).then((videosFromAPI) => setConcertVideos(videosFromAPI))
  }

  const saveVideo = () => {
    VideoManager.postVideo(concertVideo).then(() => getVideo())
  }

  useEffect(() => {
    getVideo();
  }, [])

  const { buttonLabel, className } = props;

  const [modalTourPoster, setModalTourPoster] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);
  const [modalVideo, setModalVideo] = useState(false);

  const toggleTourPoster = () => setModalTourPoster(!modalTourPoster);
  const togglePhoto = () => setModalPhoto(!modalPhoto);
  const toggleVideo = () => setModalVideo(!modalVideo)

  const handleDelete = () => {
    setIsLoading(true);
    ConcertManager.delete(props.concertId).then(() =>
      props.history.push("/concerts")
    );
  };

  return (
    <div className=" concert-detail" id="card-details">
      <div className="card-content" id="card-details">
        <div className="concert-details tour-details" id="concert-name-poster">
          <div>
            <h1>
              <span className="card-petname">
                <strong>{concert.tourName}</strong>
              </span>
            </h1>
          </div>
          <div>
            <picture className="tour-poster-img">
              <img
                src={concert.tourPoster}
                alt="Tour Poster"
                id="tour-poster"
              />
            </picture>
          </div>
          <Button
            color="primary"
            size="sm"
            onClick={toggleTourPoster}
            className="tour-poster-btn"
          >
            {buttonLabel}+ Upload Tour Poster
          </Button>
        </div>
        <Modal isOpen={modalTourPoster} toggle={toggleTourPoster} className={className}>
          <ModalHeader toggle={toggleTourPoster}>Tour Poster</ModalHeader>
          <ModalBody>
            <Cloudinary id="tourPoster" handleImage={handleImage} />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                saveImage();
                toggleTourPoster();
              }}
            >
              Save
            </Button>{" "}
            <Button color="secondary" onClick={toggleTourPoster}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <div id="concert-bands-details-container">
          <div /*className="concert-details"*/ id="concert-details">
            <h2>
              <strong>Concert Details</strong>
            </h2>
            <p>
              <strong>Date:</strong> {concert.date}
            </p>
            <p>
              <strong>Venue:</strong> {concert.venue}
            </p>
            <p>
              <strong>Location:</strong> {concert.location}
            </p>
          </div>
          <div className="concert-details bands-heading" id="concert-bands">
            <h2>
              <strong>Bands</strong>
            </h2>
            {concert.bands.map((band) => (
              <p key={band.id}>{band.name} </p>
            ))}
          </div>
        </div>
        <div className="concert-details" id="concert-photos">
          <h2>
            <strong>Photos</strong>
          </h2>
          <Button
            color="primary"
            size="sm"
            onClick={togglePhoto}
            className="photo-btn"
          >
            {buttonLabel}+ Upload Photo
          </Button>
          <Modal isOpen={modalPhoto} toggle={togglePhoto} className={className}>
            <ModalHeader toggle={togglePhoto}>Photos</ModalHeader>
            <ModalBody>
              <CloudinaryPhoto handlePhoto={handlePhoto} />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={savePhoto}
              >
                Save 
              </Button>{" "}
              <Button color="secondary" onClick={togglePhoto}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <div id="photo-container">
            {concertPhotos.map((photo) => (
              <picture>
                <img src={photo.url} id="concert-photo"/>
              </picture>
            ))}
          </div>
        </div>
        <div className="concert-details" id="concert-videos">
          <h2>
            <strong>Videos</strong>
          </h2>
          <Button
            color="primary"
            size="sm"
            onClick={toggleVideo}
            className="video-btn"
          >
            {buttonLabel}+ Upload Video
          </Button>
          <Modal isOpen={modalVideo} toggle={toggleVideo} className={className}>
            <ModalHeader toggle={toggleVideo}>Videos</ModalHeader>
            <ModalBody>
              <CloudinaryVideo handleVideo={handleVideo} />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={saveVideo}
              >
                Save 
              </Button>{" "}
              <Button color="secondary" onClick={toggleVideo}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <div id="video-container">
            {concertVideos.map((video) => (
              <div>
                <video src={video.url} controls></video>
              </div>
            ))}
          </div>
        </div>
        <div className="edit-delete-btns">
          <Button
            color="primary"
            size="sm"
            onClick={() =>
              props.history.push(`/concerts/${props.concertId}/edit`)
            }
          >
            Edit Concert
          </Button>{" "}
          <Button
            color="danger"
            size="sm"
            disabled={isLoading}
            onClick={handleDelete}
          >
            Delete Concert
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ConcertDetails;

