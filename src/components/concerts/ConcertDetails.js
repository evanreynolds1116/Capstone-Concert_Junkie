import React, { useState, useEffect } from 'react';
import { Button } from "reactstrap";
import ConcertManager from '../../modules/ConcertManager';
import BandManager from '../../modules/BandManager';
import './ConcertDetails.css'

const ConcertDetails = props => {
  const [concert, setConcert] = useState({ tourName: "", bands: [], date: "", venue: "", tourPoster: "", video: ""});

  useEffect(() => {
    ConcertManager.getConcert(props.concertId, props.venueId).then(concertFromAPI => {
      BandManager.getConcertBand(concertFromAPI.id).then(concertBandsFromAPI => {
          concertFromAPI.bands = concertBandsFromAPI
          .map(
            (concertBand) => concertBand.band
          )
          console.log("concertFromAPI", concertFromAPI)
          return concertFromAPI
        })
        .then((concertWithBands) => 
        setConcert({
          tourName: concertWithBands.tourName,
          bands: concertWithBands.bands,
          date: concertWithBands.date,
          venue: concertWithBands.venue.name,
          location: concert.location,
          image: concert.image,
          video: concert.video
        })
        )
      })
  }, [props.concertId]);

  return (
    <div className="card">
      <div className="card-content">
        <div className="concert-details">
        <h3>
          <span className="card-petname">{concert.tourName}</span>
        </h3>
        <picture>
          <img src={concert.tourPoster} alt="Tour Poster" />
        </picture>
        </div>
        <div className="concert-details bands-heading">
        <h3><strong>Bands</strong></h3>
        </div>
        <div className="concert-details">
        {concert.bands.map((band) => (
          <p>{band.name} </p>
        ))}
        </div>
        <div className="concert-details">
        <h3><strong>Concert Details</strong></h3>
        <p><strong>Date:</strong> {concert.date}</p>
        <p><strong>Venue:</strong> {concert.venue}</p>
        <p><strong>Location:</strong> {concert.location}</p>
        </div>
        <div className="concert-details">
          <h3><strong>Photos</strong></h3>
        </div>
        <div className="concert-details">
          <h3><strong>Videos</strong></h3>
        </div>
        <div className="edit-delete-btns">
        <Button color="primary" size="sm">Edit Concert</Button>{' '}
        <Button color="danger" size="sm">Delete Concert</Button>{' '}
        </div>
      </div>
    </div>
  );
}

export default ConcertDetails;

// BandManager.getConcertBand(concertDetails.id)
//         .then(concertBandDetails => {
//           console.log("concertBandDetails", concertBandDetails)