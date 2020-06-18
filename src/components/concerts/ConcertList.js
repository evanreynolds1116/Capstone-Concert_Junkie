import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import ConcertManager from "../../modules/ConcertManager";
// import ConcertCard from "./ConcertCard";
import { Table } from "reactstrap";
import BandManager from "../../modules/BandManager";

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
      )).then((concertsWithBands) => setConcerts(concertsWithBands))
    });
  }, [sessionStorage.activeUser]);

  // console.log("concerts", concerts)

  return (
    <>
      <div>
        <Button
          variant="dark"
          onClick={() => {
            props.history.push("/new-concert");
          }}
        >
          Add New Concert
        </Button>{" "}
      </div>
      <div>
        <Table dark className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Concert</th>
              <th>Venue</th>
              <th>Location</th>
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
                <td>Location</td>
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
