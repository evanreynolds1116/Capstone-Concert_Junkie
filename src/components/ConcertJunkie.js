import React from "react";
// import logo from "./logo.svg";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
// import { Button } from 'reactstrap';
import "./App.css";

const ConcertJunkie = () => {
  return (
    <React.Fragment>
      <NavBar />
      <ApplicationViews />
    </React.Fragment>
  );
};

export default ConcertJunkie;
