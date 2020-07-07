import React, { useState, useEffect } from "react";
import ConcertManager from "../../modules/ConcertManager";
import { Table } from "reactstrap";
import VenueManager from "../../modules/VenueManager";

const LocationList = (props) => {
  const [locations, setLocations] = useState([]);
  const [locationCounter, setLocationCounter] = useState("");

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
        const locationsList = venuesWithLocations.map(
          (locations) => locations.location
        );

        const countResults = [
          ...locationsList
            .reduce((mp, o) => {
              const key = JSON.stringify([o.id]);
              if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
              mp.get(key).count++;
              return mp;
            }, new Map())
            .values(),
        ];

        const result = Array.from(new Set(countResults.map((s) => s.id))).map(
          (id) => {
            return {
              id: id,
              cityState: countResults.find((s) => s.id === id).cityState,
              count: countResults.find((s) => s.id === id).count,
            };
          }
        );
        const sortedResult = result.sort((a, b) => b.count - a.count);
        setLocations(sortedResult);
      });
    });
  }, []);

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
        const allLocations = venuesWithLocations.map(
          (locations) => locations.location
        );
        const totalLocations = allLocations.map((location) => location.id);
        const distinctLocations = [...new Set(totalLocations)];
        const total = distinctLocations.length;
        setLocationCounter(total);
      });
    });
  }, []);

  return (
    <>
      <div className="location-list-header">
        <h2>You have seen concerts in {locationCounter} locations</h2>
      </div>
      <div className="location-list-table">
        <div>
          <Table id="locations-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Concerts Seen</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id}>
                  <td>{location.cityState}</td>
                  <td>{location.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default LocationList;
