import React, {useState, useEffect } from 'react';
import ConcertManager from '../../modules/ConcertManager'
import BandManager from '../../modules/BandManager'
import { Table } from "reactstrap";

const BandList = (props) => {
  const [bandsList, setBandsList] = useState([]);

  useEffect(() => {
    ConcertManager.get(sessionStorage.activeUser).then((concertsFromAPI) => {
      Promise.all(
        concertsFromAPI.map((concert) => {
          return BandManager.getConcertBand(concert.id).then((concertBandsFromAPI) => {
            concert.bands = concertBandsFromAPI
            // .map(
            //   (concertBand) => concertBand.band
            // )
            console.log("concert", concert)
        
            return concert.bands;
          })
        })
      ).then((concertsWithBands) => {
        console.log("concertsWithBands", concertsWithBands)
      })
    })
  })

  // console.log(concerts)

  return(
    <>
    <div className="bands-list-header">
      {/* <h3>You have been to {venueCounter} venues</h3> */}
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
            {/* {bands.map((band) => (
              <tr key={band.id}>
                <td>{band.name}</td>
                <td>?</td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      </div>
    </div>
  </>
  )

}

export default BandList

