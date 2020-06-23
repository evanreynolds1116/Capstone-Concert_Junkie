import React, { useState, useEffect } from "react";
import ConcertManager from "../../modules/ConcertManager";
import BandManager from "../../modules/BandManager";
import { Table } from "reactstrap";

const BandList = (props) => {
  const [bandsList, setBandsList] = useState([]);
  const [totalBands, setTotalBands] = useState([]);

  useEffect(() => {
    ConcertManager.get(sessionStorage.activeUser).then((concertsFromAPI) => {
      Promise.all(
        concertsFromAPI.map((concert) => {
          return BandManager.getConcertBand(concert.id).then(
            (concertBandsFromAPI) => {
              concert.bands = concertBandsFromAPI.map(
                (concertBand) => concertBand.band
              );
              // console.log("concert", concert);
              return concert;
            }
          );
        })
      ).then((concertsWithBands) => {
        console.log(concertsWithBands)
        const bandsArray = concertsWithBands.map((concerts) => concerts.bands)
        const bandsObj = []
        const anotherBandsArray = bandsArray.map((bands) => {
          bands.forEach((band) => bandsObj.push(band))
        })
        console.log("bandsObj", bandsObj)
        
        const countResults = [
          ...bandsObj
            .reduce((mp, o) => {
              const key = JSON.stringify([o.id]);
              if (!mp.has(key)) mp.set(key, { ...o, count: 0});
              mp.get(key).count++;
              return mp;
            }, new Map())
            .values(),
        ];
        console.log("countResults", countResults)

        const total = countResults.length
        console.log("total", total)
        setTotalBands(total)

        const result = Array.from(new Set(countResults.map((s) => s.id))).map(
          (id) => {
            return {
              id: id,
              name: countResults.find((s) => s.id === id).name,
              count: countResults.find((s) => s.id === id).count
            }
          }
        );

        const sortedResult = result.sort((a, b) => b.count - a.count);
        
        setBandsList(sortedResult)
      })
    });
  }, []);

  // console.log(concerts)

  return (
    <>
      <div className="bands-list-header">
        <h3>You have seen {totalBands} bands</h3>
      </div>
      <div className="bands-list-table">
        <div>
          <Table>
            <thead>
              <tr>
                <th>Band</th>
                <th>Times Seen</th>
              </tr>
            </thead>
            <tbody>
              {bandsList.map((band) => (
              <tr key={band.id}>
                <td>{band.name}</td>
                <td>{band.count}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default BandList;
