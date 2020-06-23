import React, { useState, useEffect } from "react";
import ConcertManager from "../../modules/ConcertManager";
import BandManager from "../../modules/BandManager";
import { Table } from "reactstrap";
import VenueManager from "../../modules/VenueManager";
import VenueList from "../venues/VenueList";

const LocationList = (props) => {
  const [locations, setLocations] = useState([]);
  const [venuesArray, setVenuesArray] = useState([]);
  const [venueCounter, setVenueCounter] = useState("");
  const [totalVenues, setTotalVenues] = useState("");

  useEffect(() => {
    ConcertManager.get(sessionStorage.activeUser).then((concertsFromAPI) => {
        const locationsArray = concertsFromAPI.map((concert) => 
          VenueManager.get(concert.venueId).then((venueLocation) => {
            // console.log("venueLocation", venueLocation)
            concert.venue = venueLocation
            // console.log(concert)
            return concert;
          })
        )
        // console.log(locationsArray)
       setLocations(locationsArray)
    });
  }, []);


  // total venue counter
  useEffect(() => {
    // ConcertManager.get(sessionStorage.activeUser).then((concertsFromAPI) => {
    //     const venuesArray = concertsFromAPI.map((concert) => concert.venue.id);
    //     const distinctVenues = [...new Set(venuesArray)]
    //     const totalVenues = distinctVenues.length
    //     setVenueCounter(totalVenues);
    //   }
    // );
  }, []);

  return (
    <>
      <div className="location-list-header">
        <h3>You have seen concerts in {venueCounter} locations</h3>
      </div>
      <div className="location-list-table">
        <div>
          <Table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Concerts Seen</th>
              </tr>
            </thead>
            <tbody>
              {/* {venues.map((venue) => (
                <tr key={venue.id}>
                  <td>{venue}</td>
                  <td>blegh</td>
                  <td>?</td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default LocationList;