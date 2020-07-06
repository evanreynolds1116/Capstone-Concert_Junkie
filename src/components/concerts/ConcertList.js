import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import ConcertManager from "../../modules/ConcertManager";
// import ConcertCard from "./ConcertCard";
import { Table } from "reactstrap";
import BandManager from "../../modules/BandManager";
import VenueManager from '../../modules/VenueManager'

const ConcertList = (props) => {
  const [concerts, setConcerts] = useState([]);

  const [concertCounter, setConcertCounter] = useState("");

  useEffect(() => {
    ConcertManager.get(sessionStorage.activeUser).then((concertsFromAPI) => {
      Promise.all(
      concertsFromAPI.map((concert) => 
        BandManager.getConcertBand(concert.id).then((concertBandsFromAPI) => {
          concert.bands = concertBandsFromAPI
          .map(
            (concertBand) => concertBand.band.name
            );
          return concert;
        })
      )).then((concertsWithBands) => {
        // console.log(concertsWithBands)
        return Promise.all(
          concertsWithBands.map((concert) => 
            VenueManager.get(concert.venueId).then((venueLocation) => {
              concert.venue = venueLocation
              return concert;
            })
          )
        )
      }).then((concertsWithBandsVenues) => setConcerts(concertsWithBandsVenues))
    });
  }, [sessionStorage.activeUser]);

  const getNumberConcerts = () => {
    ConcertManager.get(sessionStorage.activeUser).then(concertsFromAPI => {
      const totalConcerts = concertsFromAPI.length
      setConcertCounter(totalConcerts);
    })
  }

  useEffect(() => {
    getNumberConcerts();
  }, []);

  console.log(concerts.bands)
  return (
    <>
      <div className="concert-list-body">
        <h3>You have been to {concertCounter} concerts</h3>
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            props.history.push("/new-concert");
          }}
        >
          Add New Concert
        </Button>{" "}
      </div>
      <div className="concert-list">
        <div>
        <Table className="concert-list-table" id="concert-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Concert</th>
              <th>Venue</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {concerts.map((concert) => (
              <tr key={concert.id}>
                <td className="concert-date">{concert.date}</td>
                <td className="concert-container">
                  <div>
                  <strong>
                    {concert.tourName}
                  </strong>
                  </div>
                  {/* <br></br> */}
                  {/* {concert.bands.map((band) => (
                    <span key={band.id}>| {band.name} |</span>
                  ))} */}
                  <span> {concert.bands.join(' | ')} </span>
                </td>
                <td className="concert-venue">{concert.venue.name}</td>
                <td className="concert-location">{concert.venue.location.cityState}</td>
                <td>
                <Button 
                  outline color="primary"
                  size="sm"
                  onClick={()=> props.history.push(`/concerts/${concert.id}`)}
                >
                  Details
                </Button>   
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    </>
  );
};

export default ConcertList;

/*{concerts.map(concert => 
  <ConcertCard key={concert.id} concert={concert} {...props} />
  )}*/
