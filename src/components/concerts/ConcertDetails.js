import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import ConcertManager from "../../modules/ConcertManager";
import BandManager from "../../modules/BandManager";
import "./ConcertDetails.css";
import VenueManager from "../../modules/VenueManager";
import Cloudinary from "./Cloudinary";

const ConcertDetails = (props) => {
  const [concert, setConcert] = useState({
    tourName: "",
    bands: [],
    date: "",
    venue: "",
    location: "",
    tourPoster: "",
    video: ""
  });
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ConcertManager.getConcert(props.concertId, props.venueId).then(
      (concertFromAPI) => {
        BandManager.getConcertBand(concertFromAPI.id)
          .then((concertBandsFromAPI) => {
            concertFromAPI.bands = concertBandsFromAPI.map(
              (concertBand) => concertBand.band
            );
            console.log(concertFromAPI)
            return concertFromAPI;
          })
          .then((concertWithBands) => {
            VenueManager.get(concertWithBands.venueId).then((venueLocation) => {
              concertWithBands.location = venueLocation.location
              console.log(concertWithBands)
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
              })
              return concertWithBands
            })
          })
            setIsLoading(false)
            
      });
  }, [props.concertId]);

  const [concertOnly, setConcertOnly] = useState({
    tourName: "",
    date: "", 
    tourPoster: ""
  })

  useEffect(() => {
    ConcertManager.getConcertOnly(props.concertId).then((concertOnlyFromAPI) => {
      setConcertOnly({
        id: props.match.params.concertId,
        userId: sessionStorage.activeUser,
        tourName: concertOnlyFromAPI.tourName,
        tourPoster: concertOnlyFromAPI.tourPoster,
        date: concertOnlyFromAPI.date,
        venueId: concertOnlyFromAPI.venueId
      })
    })
  }, [props.concertId])

  const handleDelete = () => {
    setIsLoading(true);
    ConcertManager.delete(props.concertId).then(() => 
      props.history.push("/concerts")
    );
  };

  const handleImage = url => {
    const stateToChange = { ...concert };
    stateToChange["tourPoster"] = url;
    setConcert(stateToChange);
    const concertToChange = { ...concertOnly}
    concertToChange["tourPoster"] = url;
    setConcertOnly(concertToChange)
    // ConcertManager.update(props.concertId);
  }

  const saveImage = () => {
    ConcertManager.update(concertOnly)
  }



  return (
    <div className="card">
      <div className="card-content">
        <div className="concert-details tour-details">
          <h3>
            <span className="card-petname">
              <strong>{concert.tourName}</strong>
            </span>
          </h3>
          <picture className="tour-poster-img">
            <img src={concert.tourPoster} alt="Tour Poster" />
          </picture>
        </div>
          {/* <Button color="primary" size="sm" className="add-tour-poster-btn">+ Upload Tour Poster</Button>{' '} */}
          <Cloudinary id="tourPoster" handleImage={handleImage} />
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
          <Button color="primary" size="sm">
            {" "}
            + Upload Video
          </Button>{" "}
        </div>
        <div className="edit-delete-btns">
          <Button 
            color="primary" 
            size="sm" 
            onClick={() => props.history.push(`/concerts/${props.concertId}/edit`)}
          >
            Edit Concert
          </Button>{" "}
          <Button 
            color="primary" 
            size="sm" 
            onClick={saveImage}
          >
            Save Tour Poster
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
