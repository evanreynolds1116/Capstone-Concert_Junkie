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
import ConcertManager from "../../modules/ConcertManager";

const ConcertForm = (props) => {
  // for modal stuff
  const { /*buttonLabel,*/ className } = props;

  // for modal stuff
  const [modalBand, setModalBand] = useState(false);
  const [modalVenue, setModalVenue] = useState(false);
  const [modalLocation, setModalLocation] = useState(false);

  // for modal stuff
  const toggleBand = () => setModalBand(!modalBand);
  const toggleVenue = () => setModalVenue(!modalVenue);
  const toggleLocation = () => setModalLocation(!modalLocation);

  
  // typeahead stuff
  const [bands, setBands] = useState([]);
  const [loc, setLocations] = useState([]);
  const [venues, setVenues] = useState([]);
  /*const [multiple, setMultiple] = useState(false);
  const [selected, setSelected] = useState([]);*/
  const getBands = () => {
    return BandManager.getAll().then((bandsFromAPI) => {
      setBands(bandsFromAPI);
    });
  };
  const getLocations = () => {
    return LocationManager.getAll().then((locationsFromAPI) => {
      setLocations(locationsFromAPI);
    });
  };
  const getVenues = () => {
    return VenueManager.getAllVenueLocations().then((venuesFromAPI) => {
      console.log("venuesFromAPI", venuesFromAPI)
      setVenues(venuesFromAPI)
    })
  }
  useEffect(() => {
    getBands();
    getLocations();
    getVenues();
  }, []);
  //

  // add new band, venue, location
  const [newBand, setNewBand] = useState({ name: "" });
  const [newLocation, setNewLocation] = useState({ cityState: "" });
  const [newVenue, setNewVenue] = useState({
    name: "",
    locationId: newLocation.id,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // add new band to database
  const handleAddBandFieldChange = (evt) => {
    const newBandToAdd = { ...newBand };
    newBandToAdd[evt.target.id] = evt.target.value;
    setNewBand(newBandToAdd);
    getBands();
  };
  
  const constructNewBand = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    BandManager.postNewBand(newBand).then(getBands())
  };
  
  // add new location to database
  const handleAddLocationFieldChange = (evt) => {
    const newLocationToAdd = { ...newLocation };
    newLocationToAdd[evt.target.id] = evt.target.value;
    setNewLocation(newLocationToAdd)
  };
  
  const constructNewLocation = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    LocationManager.postNewLocation(newLocation);
  };
  
  // add location id to new venue to database
  const handleAddVenueLocationFieldChange = (selectedVenueLocation) => {
    const newVenueLocationToAdd = { ...newVenue };
    newVenueLocationToAdd["locationId"] = selectedVenueLocation[0].id;
    setNewVenue(newVenueLocationToAdd);
  }
  
  // add new venue to database
  const handleAddVenueFieldChange = (evt) => {
    const newVenueToAdd = { ...newVenue };
    newVenueToAdd[evt.target.id] = evt.target.value;
    setNewVenue(newVenueToAdd);
  };
  
  const constructNewVenue = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    VenueManager.postNewVenue(newVenue)
    getVenues();
  };

  
  // form stuff
  const [loca, setLocation] = useState({ cityState: ""})
  const [venue, setVenue] = useState({ name: "", locationId: loca.id})
  const [concert, setConcert] = useState({ userId: parseInt(sessionStorage.activeUser), tourName: "", tourPoster: "", date: "", venueId: venue.id })
  const [concertBand, setConcertBand] = useState([])
  const [multiple, setMultiple] = useState(false)

  // handles the band typeahead input
  const handleBandFieldChange = (selectedBandsArray) => {
    console.log("selectedBandsArray", selectedBandsArray)
      // console.log("band", band)
      setConcertBand(selectedBandsArray) 
      console.log("concertBand", concertBand)
  };

  // handles the venue typeahead input
  const handleVenueFieldChange = (selectedVenue) => {
    const concertToAdd = { ...concert};
    concertToAdd["venueId"] = selectedVenue[0].id;
    setConcert(concertToAdd);
  }
  

  const handleConcertFieldChange = (evt) => {
    const concertToAdd = { ...concert};
    console.log("concertToAdd", concertToAdd)
    concertToAdd[evt.target.id] = evt.target.value;
    setConcert(concertToAdd);
  }

  const constructNewConcert = evt => {
    evt.preventDefault();
    setIsLoading(true);
    ConcertManager.postConcert(concert).then(postedConcert => {
      concertBand.forEach((band) => {
        const newConcertBand = {bandId: band.id, concertId: postedConcert.id}
        band = newConcertBand
        BandManager.postConcertBand(band);
      })
    }).then(() => props.history.push("/concerts"))
  }

  return (
    <>
      <Form className="concert-form">
        <div className="form-header">
          <h1>Add New Concert</h1>
          <div>
            <p>Enter concert info</p>
          </div>
        </div>
        <FormGroup>
          <Label for="band">Band</Label>
          <div className="band-input">
            <Typeahead
              options={bands}
              labelKey={(band) => band.name}
              multiple
              onChange={handleBandFieldChange}
              name="band"
              id="name"
              minLength="2"
              emptyLabel="If no matches found, click Add Band to add it to the database!"
              placeholder="e.g. My Chemical Romance"
              className="band-typeahead"
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
                  <Label htmlFor="band">Band</Label>
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
            onChange={handleConcertFieldChange}
            placeholder="date placeholder"
            className="concert-form-input"
          />
        </FormGroup>
        <FormGroup>
          <Label for="tour">Tour/Concert Title</Label>
          <Input
            type="text"
            name="tour"
            id="tourName"
            onChange={handleConcertFieldChange}
            placeholder="e.g. Vans Warped Tour"
            className="concert-form-input"
          />
        </FormGroup>
        <FormGroup>
          <Label for="venue">Venue</Label>
          <div className="venue-input">
            <Typeahead
              type="text"
              options={venues}
              labelKey={(venue) => `${venue.name} @ ${venue.location.cityState}`}
              name="venue"
              id="venue"
              onChange={handleVenueFieldChange}
              minLength="2"
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
                      onChange={handleAddVenueLocationFieldChange}
                      name="locationId"
                      id="loc"
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
        <FormGroup>
          <Label for="location">Location</Label>
          <div className="location-input">
            <Typeahead
              options={loc}
              labelKey={(loc) => loc.cityState}
              type="text"
              name="location"
              id="loc"
              value={concert}
              // onChange={handleConcertFieldChange}

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
        <Button onClick={constructNewConcert} disabled={isLoading} color="secondary">Add Concert</Button>{" "}
      </Form>
    </>
  );
};

export default ConcertForm;

