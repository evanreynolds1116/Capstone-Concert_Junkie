import React from "react";
import {Button} from 'reactstrap';

const ConcertList = (props) => {
  return (
    <>
      <Button variant="dark" onClick={() => {props.history.push('/new-concert')}}>Add New Concert</Button>{" "}
    </>
  );
};

export default ConcertList