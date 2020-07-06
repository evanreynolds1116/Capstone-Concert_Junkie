import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ConcertManager from "../../modules/ConcertManager";
import BandManager from "../../modules/BandManager";
import "./ConcertDetails.css";
import VenueManager from "../../modules/VenueManager";
import Cloudinary from "./Cloudinary";
import CloudinaryVideo from "./CloudinaryVideo";
import VideoManager from "../../modules/VideoManager";

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
            console.log(concertFromAPI);
            const concertBands = concertFromAPI.bands
            console.log(concertBands)
            const justBands = concertBands.map((band) => {
              return band.name
            })
            console.log(justBands)
            console.log(justBands.join(' | '))
            return concertFromAPI;
          })
          .then((concertWithBands) => {
            VenueManager.get(concertWithBands.venueId).then((venueLocation) => {
              concertWithBands.location = venueLocation.location;
              console.log(concertWithBands);
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
          venueId: concertOnlyFromAPI.venueId,
        });
      }
    );
  }, [props.concertId]);

  const handleDelete = () => {
    setIsLoading(true);
    ConcertManager.delete(props.concertId).then(() =>
      props.history.push("/concerts")
    );
  };

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

  const [videos, setVideos] = useState({
    concertId: concertOnly.id,
    url: "",
    description: "",
  });

  useEffect(() => {
    ConcertManager.getConcertOnly(props.concertId).then(
      (concertOnlyFromAPI) => {
        setVideos({
          concertId: props.match.params.concertId,
          url: "",
          description: "",
        });
      }
    );
  }, [props.concertId]);

  const handleVideo = (url) => {
    const stateToChange = { ...videos };
    stateToChange["url"] = url;
    setVideos(stateToChange);
    // const concertToChange = { ...concertOnly}
    // concertToChange["tourPoster"] = url;
    // setConcertOnly(concertToChange)
    // ConcertManager.update(props.concertId);
  };

  const saveVideo = () => {
    VideoManager.postVideo(videos);
  }
  const [concertVideos, setConcertVideos] = useState([]);

  useEffect(() => {
    VideoManager.getVideo(props.concertId).then(
      (videosFromAPI) => {
        setConcertVideos(videosFromAPI)
      }
    )
  }) 

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className=" concert-detail" id="card-details">
      <div className="card-content" id="card-details">
        <div className="concert-details tour-details">
          <h3>
            <span className="card-petname">
              <strong>{concert.tourName}</strong>
            </span>
          </h3>
          <picture className="tour-poster-img">
            <img src={concert.tourPoster} alt="Tour Poster" id="tour-poster" />
          </picture>
        </div>
        <Button color="primary" size="sm" onClick={toggle} className="tour-poster-btn">
          {buttonLabel}+ Upload Tour Poster
        </Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Upload Tour Poster</ModalHeader>
          <ModalBody>
            <Cloudinary id="tourPoster" handleImage={handleImage} />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                saveImage();
                toggle();
              }}
            >
              Save Image
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <div className="concert-details bands-heading">
          <h3>
            <strong>Bands</strong>
          </h3>
        </div>
        <div className="concert-details">
          {concert.bands.map((band) => (
            <p key={band.id}>{band.name} </p>
          ))}
        </div>
        <div className="concert-details">
          <h3>
            <strong>Concert Details</strong>
          </h3>
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
        <div className="concert-details">
          <h3>
            <strong>Photos</strong>
          </h3>
          <Button color="primary" size="sm">
            {" "}
            + Upload Photo
          </Button>{" "}
        </div>
        <div className="concert-details">
          <h3>
            <strong>Videos</strong>
          </h3>
          {/* <CloudinaryVideo handleVideo={handleVideo} /> */}
          <Button color="primary" size="sm" onClick={toggle} className="video-btn">
          {buttonLabel}+ Upload Video
          </Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Upload Video</ModalHeader>
          <ModalBody>
            <CloudinaryVideo handleVideo={handleVideo} />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                saveVideo();
                toggle();
              }}
            >
              Save Video
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
          <div>
            {concertVideos.map((video) => (
              <video src={video.url} controls/>
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

// BandManager.getConcertBand(concertDetails.id)
//         .then(concertBandDetails => {
//           console.log("concertBandDetails", concertBandDetails)
