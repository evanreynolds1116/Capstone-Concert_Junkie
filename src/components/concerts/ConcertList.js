import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import ConcertManager from "../../modules/ConcertManager";
// import ConcertCard from "./ConcertCard";
import { Table } from "reactstrap";
import BandManager from "../../modules/BandManager";
import LocationManager from "../../modules/LocationManager";
import VenueManager from '../../modules/VenueManager'

const ConcertList = (props) => {
  const [concerts, setConcerts] = useState([]);

  // const getConcerts = () => {
  //   ConcertManager.get(sessionStorage.activeUser).then((concertsFromAPI) => {
  //     concertsFromAPI.map((concert) =>
  //       BandManager.getConcertBand(concert.id).then((concertBandsFromAPI) => {
  //         concert.bands = concertBandsFromAPI;
  //         // .map(
  //         //   (concertBand) => concertBand.band
  //         //   );
  //         return concert;
  //       })
  //     );
  //     setConcerts(concertsFromAPI);
  //   });
  // };

  useEffect(() => {
    // getConcerts();
    ConcertManager.get(sessionStorage.activeUser).then((concertsFromAPI) => {
      Promise.all(
      concertsFromAPI.map((concert) => 
        BandManager.getConcertBand(concert.id).then((concertBandsFromAPI) => {
          concert.bands = concertBandsFromAPI
          .map(
            (concertBand) => concertBand.band
            );
          return concert;
        })
      )).then((concertsWithBands) => {
        return Promise.all(
          concertsWithBands.map((concert) => 
            VenueManager.get(concert.venueId).then((venueLocation) => {
              concert.venue = venueLocation
              return concert;
            })
          )
        )


        // setConcerts(concertsWithBands)
      }).then((concertsWithBandsVenues) => setConcerts(concertsWithBandsVenues))
    });
  }, [sessionStorage.activeUser]);

  // console.log("concerts", concerts)

  return (
    <>
      <div className="concert-list-body">
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
      <div>
        <Table className="concert-list-table">
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
                <td>{concert.date}</td>
                <td className="concert-container">
                  <p>
                    <strong>{concert.tourName}</strong>
                  </p>
                  {concert.bands.map((band) => (
                    <span key={band.id}>{band.name} / </span>
                  ))}
                </td>
                <td>{concert.venue.name}</td>
                <td>{concert.venue.location.cityState}</td>
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
    </>
  );
};

export default ConcertList;

/*{concerts.map(concert => 
  <ConcertCard key={concert.id} concert={concert} {...props} />
  )}*/
