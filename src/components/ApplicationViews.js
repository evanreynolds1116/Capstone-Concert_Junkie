import React from 'react';
import LoginRegister from './auth/LoginRegister';
import { Route } from 'react-router-dom';
import ConcertList from './concerts/ConcertList';
import ConcertForm from './concerts/ConcertForm';
import ConcertDetails from './concerts/ConcertDetails'
import ConcertEditForm from './concerts/ConcertEditForm'
import BandList from './bands/BandList';
import VenueList from './venues/VenueList'
import LocationList from './locations/LocationList';
import YearsList from './years/YearsList'

const ApplicationViews = props => {
  return (
    <React.Fragment>

      <Route exact path="/" component={LoginRegister} {...props}/>

      <Route exact path="/concerts" render={(props) => {
        return <ConcertList {...props} />
      }} />

      <Route path="/new-concert" render={(props) => {
        return <ConcertForm {...props} />
      }} />

      <Route exact path="/concerts/:concertId(\d+)" render={(props) => {
        return <ConcertDetails concertId={parseInt(props.match.params.concertId)} {...props} />
      }} />

      <Route path="/concerts/:concertId(\d+)/edit" render={(props) => {
        return <ConcertEditForm {...props} />
      }} />

      <Route path="/bands" render={(props) => {
        return <BandList {...props}/>
      }} />

      <Route path="/venues" render={(props) => {
        return <VenueList {...props}/>
      }} />

      <Route path="/locations" render={(props) => {
        return <LocationList {...props} />
      }} />

      <Route path="/years" render={(props) => {
        return <YearsList {...props} />
      }} />

    </React.Fragment>
  )
}

export default ApplicationViews