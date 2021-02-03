import React, { useState } from "react";
// import logo from "./logo.svg";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
// import { Button } from 'reactstrap';
import "./App.css";

const ConcertJunkie = () => {

  const isAuthenticated = () => sessionStorage.getItem("activeUser") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUser = user => {
    sessionStorage.setItem("activeUser", JSON.stringify(user));
    setHasUser(isAuthenticated());
  };

  return (
    <React.Fragment>
      <NavBar hasUser={hasUser} />
      <ApplicationViews hasUser={hasUser} setUser={setUser} />
    </React.Fragment>
  );
};

export default ConcertJunkie;
