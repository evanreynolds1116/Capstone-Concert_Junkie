import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormText,
} from "reactstrap";
import "./ConcertForm.css";

const ConcertForm = (props) => {
  // for modal stuff
  const { buttonLabel, className } = props;

  // for modal stuff
  const [modalBand, setModalBand] = useState(false);
  const [modalVenue, setModalVenue] = useState(false);
  const [modalLocation, setModalLocation] = useState(false);

  // for modal stuff
  const toggleBand = () => setModalBand(!modalBand);
  const toggleVenue = () => setModalVenue(!modalVenue);
  const toggleLocation = () => setModalLocation(!modalLocation);

  return (
    <>
      <Form className="concert-form">
        <div className="form-header">
          <h1>Add New Concert</h1>
        </div>
        <FormGroup>
          <Label for="band">Band</Label>
          <div className="band-input">
            <Input
              type="text"
              name="band"
              id="band"
              placeholder="e.g. My Chemical Romance"
              className="concert-form-input"
            />
            <Button
              color="secondary"
              onClick={toggleBand}
              className="add-band-btn"
            >
              Add Band
            </Button>{" "}
            <Modal isOpen={modalBand} toggle={toggleBand} className={className}>
              <ModalHeader toggle={toggleBand}>Add Band</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="newBand">Band</Label>
                    <Input
                      type="text"
                      name="newBand"
                      id="newBand"
                      placeholder="e.g. Taking Back Sunday"
                    />
                    <Button color="secondary" className="add-band-database">
                      Add
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>
          <a className="add-another-band-btn" href="">
            + Add Another Band
          </a>{" "}
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            type="date"
            name="date"
            id="date"
            placeholder="date placeholder"
            className="concert-form-input"
          />
        </FormGroup>
        <FormGroup>
          <Label for="tour">Tour/Concert Title</Label>
          <Input
            type="text"
            name="tour"
            id="tour"
            placeholder="e.g. Vans Warped Tour"
            className="concert-form-input"
          />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <div className="location-input">
            <Input
              type="text"
              name="location"
              id="location"
              placeholder="e.g. Nashville, TN"
              className="concert-form-input"
            />
            <Button
              color="secondary"
              onClick={toggleLocation}
              className="add-location-btn"
            >
              Add Location
            </Button>{" "}
            <Modal
              isOpen={modalLocation}
              toggle={toggleLocation}
              className={className}
            >
              <ModalHeader toggle={toggleLocation}>Add Location</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="newLocation">Location</Label>
                    <Input
                      type="text"
                      name="newLocation"
                      id="newLocation"
                      placeholder="e.g. Los Angeles, CA"
                    />
                    <Button color="secondary" className="add-location-database">
                      Add
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="venue">Venue</Label>
          <div className="venue-input">
            <Input
              type="text"
              name="venue"
              id="venue"
              placeholder="e.g. Exit/In"
              className="concert-form-input"
            />
            <Button
              color="secondary"
              onClick={toggleVenue}
              className="add-venue-btn"
            >
              Add Venue
            </Button>{" "}
            <Modal
              isOpen={modalVenue}
              toggle={toggleVenue}
              className={className}
            >
              <ModalHeader toggle={toggleVenue}>Add Venue</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="newVenue">Venue</Label>
                    <Input
                      type="text"
                      name="newVenue"
                      id="newVenue"
                      placeholder="e.g. Ryman Auditorium"
                    />
                    <Label>Location</Label>
                    <Input type="text" id="location-venue" />
                    <Button color="secondary" className="add-venue-database">
                      Add
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </FormGroup>
        <Button color="secondary">Add Concert</Button>{" "}
      </Form>
    </>
  );
};

export default ConcertForm;
