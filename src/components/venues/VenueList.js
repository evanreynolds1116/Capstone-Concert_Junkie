import React, { useState, useEffect } from "react";
import ConcertManager from "../../modules/ConcertManager";
import { Table } from "reactstrap";
import "./Venue.css";
import VenueManager from "../../modules/VenueManager";

const VenueList = (props) => {
  const [venues, setVenues] = useState([]);
  const [venueCounter, setVenueCounter] = useState("");

  useEffect(() => {
    ConcertManager.get(sessionStorage.activeUser).then((concertsFromAPI) => {
      Promise.all(
        concertsFromAPI.map((concert) => {
          return VenueManager.get(concert.venueId).then((venueLocation) => {
            concert.venue = venueLocation;
            return concert.venue;
          });
        })
      ).then((venuesWithLocations) => {
        console.log(venuesWithLocations)
        const countResults = [
          ...venuesWithLocations
            .reduce((mp, o) => {
              const key = JSON.stringify([o.id]);
              if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
              mp.get(key).count++;
              return mp;
            }, new Map())
            .values(),
        ];

        console.log(countResults)

        const result = Array.from(new Set(countResults.map((s) => s.id))).map(
          (id) => {
            return {
              id: id,
              name: countResults.find((s) => s.id === id).name,
              location: countResults.find((s) => s.id === id).location
                .cityState,
              count: countResults.find((s) => s.id === id).count,
            };
          }
        );

        const sortedResult = result.sort((a, b) => b.count - a.count);

        setVenues(sortedResult);
      });
    });
  }, []);

  // total venue counter
  useEffect(() => {
    ConcertManager.get(sessionStorage.activeUser).then((concertsFromAPI) => {
      const venues = concertsFromAPI.map((concert) => concert.venue.id);
      const distinctVenues = [...new Set(venues)];
      const totalVenues = distinctVenues.length;
      setVenueCounter(totalVenues);
    });
  }, []);

  return (
    <>
      <div className="venue-list-header">
        <h3>You have been to {venueCounter} venues</h3>
      </div>
      <div className="venue-list-table">
        <div>
          <Table>
            <thead>
              <tr>
                <th>Venue</th>
                <th>Location</th>
                <th>Number of Concerts</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id}>
                  <td>{venue.name}</td>
                  <td>{venue.location}</td>
                  <td>{venue.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default VenueList;
