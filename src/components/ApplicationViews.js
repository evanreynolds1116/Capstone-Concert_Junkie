import React from 'react';
import LoginRegister from './auth/LoginRegister';
import { Route, Redirect } from 'react-router-dom';
import ConcertList from './concerts/ConcertList';
import ConcertForm from './concerts/ConcertForm';
import ConcertDetails from './concerts/ConcertDetails'
import ConcertEditForm from './concerts/ConcertEditForm'
import BandList from './bands/BandList';
import VenueList from './venues/VenueList'
import LocationList from './locations/LocationList';
import YearsList from './years/YearsList'


const ApplicationViews = (props) => {

const hasUser = props.hasUser;
const setUser = props.setUser;

  return (
    <React.Fragment>

      <Route exact path="/" /*component={LoginRegister}*/ render={props => {
        return <LoginRegister setUser={setUser} {...props} />
      }}/>

      <Route exact path="/concerts" render={(props) => {
        if (hasUser) {
          return <ConcertList {...props} />
        } else {
          return <Redirect to="/" />
        }
      }} />

      <Route path="/new-concert" render={(props) => {
        if (hasUser) {
         return <ConcertForm {...props} />
        } else {
          return <Redirect to="/" />
        }
      }} />

      <Route exact path="/concerts/:concertId(\d+)" render={(props) => {
        if (hasUser) {
          return <ConcertDetails concertId={parseInt(props.match.params.concertId)} {...props} />
        } else {
          return <Redirect to="/" />
        }
      }} />

      <Route path="/concerts/:concertId(\d+)/edit" render={(props) => {
        if (hasUser) {
          return <ConcertEditForm {...props} />
        } else {
          return <Redirect to="/" />
        }
      }} />

      <Route path="/bands" render={(props) => {
        if (hasUser) {
          return <BandList {...props}/>
        } else {
          return <Redirect to="/" />
        }
      }} />

      <Route path="/venues" render={(props) => {
        if (hasUser) {
          return <VenueList {...props}/>
        } else {
          return <Redirect to="/" />
        }
      }} />

      <Route path="/locations" render={(props) => {
        if (hasUser) {
          return <LocationList {...props} />
        } else {
          return <Redirect to="/" />
        }
      }} />

      <Route path="/years" render={(props) => {
        if (hasUser) {
          return <YearsList {...props} />
        } else {
          return <Redirect to="/" />
        } 
      }} />

    </React.Fragment>
  )
}

export default ApplicationViews