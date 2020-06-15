import React from 'react';
import LoginRegister from './auth/LoginRegister';
import { Route } from 'react-router-dom';

const ApplicationViews = props => {
  return (
    <React.Fragment>

      <Route exact path="/" component={LoginRegister} {...props}/>

    </React.Fragment>
  )
}

export default ApplicationViews