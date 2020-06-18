import React from 'react';
import { Table } from 'reactstrap';

const ConcertCard = (props) => {
  return (
    <Table dark>
      <thead>
        <tr>
          <th>Date</th>
          <th>Tour Name</th>
          <th>Band</th>
          <th>Venue</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"></th>
          <td>{props.concert.date}</td>
          <td>{props.concert.tourName}</td>
          <td>Band</td>
          <td>Venue</td>
          <td>Location</td>
        </tr>
        {/* <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </Table>
  );
}

export default ConcertCard;