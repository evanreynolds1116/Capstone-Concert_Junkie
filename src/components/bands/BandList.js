import React, {useState, useEffect } from 'react';
import ConcertManager from '../../modules/ConcertManager'
import BandManager from '../../modules/BandManager'

const BandList = (props) => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    ConcertManager.getUserConcerts(sessionStorage.activeUser).then((concertsFromAPI) => {
      concertsFromAPI.forEach((concert) => {
        BandManager.getConcertBand(concert.id).then((concertBandsFromAPI) => {
          concert.bands = concertBandsFromAPI
          console.log("concertBandsFromAPI", concertBandsFromAPI)
          concertBandsFromAPI.forEach((bands) => {
            console.log("bands", bands)
            setConcerts(bands)
          })
          // return concert;
          // console.log(concert.bands)
          // console.log("concert", concert)
        })
      })
      // setConcerts(concert)
    })
  }, [sessionStorage.activerUser]);

  return(
      <div>
        <p>under construction...</p>
        {/* {concerts.map((concert) => (
          <div>
           <p>{concert.band.name}</p>
          </div>
        ))} */}
      </div>
  )

}

export default BandList