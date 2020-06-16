import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "./ConcertForm.css";
import BandManager from "../../modules/BandManager";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import LocationManager from "../../modules/LocationManager";
import VenueManager from "../../modules/VenueManager";

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

  // form stuff
  // const [band, setBand] = useState({ name: ""});
  // const [concert, setConcert] = useState({ date: "", tourName: "", userId: sessionStorage.activeUser })
  // const [location, setLocation] = useState({ cityState: ""})
  // const [venue, setVenue] = useState({ name: "", locationId: location.id})
  // const [concertBand, setConcertBand] = useState({ bandId: band.id, concertId: concert.id})

  // typeahead stuff
  const [bands, setBands] = useState([]);
  const [loc, setLocations] = useState([]);
  const [multiple, setMultiple] = useState(false);
  const [selected, setSelected] = useState([]);
  const getBands = () => {
    return BandManager.getAll().then((bandsFromAPI) => {
      setBands(bandsFromAPI);
      console.log("bands", bands);
    });
  };
  const getLocations = () => {
    return LocationManager.getAll().then((locationsFromAPI) => {
      console.log("loc", loc)
      console.log(locationsFromAPI)
      setLocations(locationsFromAPI);
    });
  };
  useEffect(() => {
    getBands();
    getLocations();
  }, []);
  //

  // add new band, venue, location
  const [newBand, setNewBand] = useState({ name: "" });
  const [newLocation, setNewLocation] = useState({ cityState: "" });
  const [newVenue, setNewVenue] = useState({
    name: "",
    locationId: loc.id,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddBandFieldChange = (evt) => {
    const bandToAdd = { ...newBand };
    bandToAdd[evt.target.id] = evt.target.value;
    setNewBand(bandToAdd);
  };

  const handleAddLocationFieldChange = (evt) => {
    const locationToAdd = { ...newLocation };
    locationToAdd[evt.target.id] = evt.target.value;
    setNewLocation(locationToAdd)
    setIsLoading(true);
  };

  const handleAddVenueLocationFieldChange = (evt) => {
    const venueLocationToAdd = { ...loc };
    venueLocationToAdd[evt.target.id] = evt.target.value;
    setLocations(venueLocationToAdd);
  }

  const handleAddVenueFieldChange = (evt) => {
    const venueToAdd = { ...newVenue };
    venueToAdd[evt.target.id] = evt.target.value;
    setNewVenue(venueToAdd);
  };

  const constructNewBand = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    BandManager.postNewBand(newBand);
  };

  const constructNewLocation = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    LocationManager.postNewLocation(newLocation);
  };

  const constructNewVenue = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    VenueManager.postNewVenue(newVenue);
  };

  return (
    <>
      <Form className="concert-form">
        <div className="form-header">
          <h1>Add New Concert</h1>
        </div>
        <FormGroup>
          <Label for="band">Band</Label>
          <div className="band-input">
            <Typeahead
              options={bands}
              /*mulitple={multiple}
            selected={selected} */
              labelKey={(band) => band.name}
              id="typeahead"
              placeholder="e.g. My Chemical Romance"
            />
            <Button
              color="secondary"
              onClick={toggleBand}
              className="add-band-btn"
            >
              Add Band
            </Button>{" "}
          </div>
          <Modal isOpen={modalBand} toggle={toggleBand} className={className}>
            <ModalHeader toggle={toggleBand}>Add Band</ModalHeader>
            <ModalBody>
              <Form onSubmit={constructNewBand}>
                <FormGroup>
                  <Label for="band">Band</Label>
                  <Input
                    type="text"
                    name="newBand"
                    id="name"
                    onChange={handleAddBandFieldChange}
                    placeholder="e.g. Taking Back Sunday"
                  />
                  <Button
                    type="submit"
                    color="secondary"
                    className="add-band-database"
                    onClick={toggleBand}
                  >
                    Add
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
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
                <Form onSubmit={constructNewLocation}>
                  <FormGroup>
                    <Label for="newLocation">Location</Label>
                    <Input
                      type="text"
                      name="newLocation"
                      id="cityState"
                      placeholder="e.g. Los Angeles, CA"
                      onChange={handleAddLocationFieldChange}
                    />
                    <Button
                      type="submit"
                      color="secondary"
                      className="add-location-database"
                      onClick={toggleLocation}
                    >
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
                <Form onSubmit={constructNewVenue}>
                  <FormGroup>
                    <Label for="newVenue">Venue</Label>
                    <Input
                      type="text"
                      name="newVenue"
                      id="name"
                      onChange={handleAddVenueFieldChange}
                      placeholder="e.g. Ryman Auditorium"
                    />
                    <Label>Location</Label>
                    <Typeahead
                      type="text"
                      options={loc}
                      labelKey={(loc) => loc.cityState}
                      onInputChange={handleAddVenueLocationFieldChange}
                      id={loc.id}
                    />
                    <Button
                      type="submit"
                      onClick={toggleVenue}
                      color="secondary"
                      className="add-venue-database"
                    >
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

/*<FormGroup>
          <Label for="band">Band</Label>
          <div className="band-input">
            <select
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
                <Form onSubmit={constructNewBand}>
                  <FormGroup>
                    <Label for="band">Band</Label>
                    <Input
                      type="text"
                      name="band"
                      id="name"
                      onChange={handleAddBandFieldChange}
                      placeholder="e.g. Taking Back Sunday"
                    />
                    <Button
                      type="submit"
                      color="secondary"
                      className="add-band-database"
                      onClick={toggleBand}
                    >
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
        </FormGroup>*/
