import React, { useState, useEffect } from 'react';
import ConcertManager from '../../modules/ConcertManager'
import './ConcertForm.css'
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
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import BandManager from "../../modules/BandManager";
import LocationManager from "../../modules/LocationManager";
import VenueManager from "../../modules/VenueManager";

const ConcertEditForm = props => {
  const [concert, setConcert] = useState({
    userId: parseInt(sessionStorage.activeUser),
    tourName: "",
    tourPoster: "",
    date: "",
    venueId: "",
    bands: []
    });
  
  const [isLoading, setIsLoading] = useState(false);

  const [updateBands, setUpdatedBands] = useState([])
  const [concertBands, setConcertBands] = useState([])
  const [onlyVenue, setOnlyVenue] = useState([])
  const [onlyLocation, setOnlyLocation] = useState([])

  // handles the band typeahead input
  const handleBandFieldChange = (selectedBandsArray) => {
    const bandsToAdd = {...concert}
    bandsToAdd.bands = selectedBandsArray
    setConcert(bandsToAdd)
    setConcertBands(selectedBandsArray)
  };

  // handles the venue typeahead input
  const handleVenueFieldChange = (selectedVenue) => {
    const concertToAdd = { ...concert};
    concertToAdd["venueId"] = selectedVenue[0].id;
    setConcert(concertToAdd);
  }

  const handleConcertFieldChange = (evt) => {
    const concertToAdd = { ...concert};
    concertToAdd[evt.target.id] = evt.target.value;
    setConcert(concertToAdd);
  }
    
  const updateExistingConcert = evt => {
    evt.preventDefault();
    setIsLoading(true);

    const editedConcert = {
      id: props.match.params.concertId,
      userId: parseInt(sessionStorage.activeUser),
      tourName: concert.tourName,
      tourPoster: concert.tourPoster,
      date: concert.date,
      venueId: concert.venueId
    }

    ConcertManager.getConcert(props.match.params.concertId).then((concert) => {
      BandManager.getConcertBands(concert.id).then((concertBandsFromAPI) => {
        concertBandsFromAPI.forEach((concertBand) => BandManager.delete(concertBand.id))
      })
    })

    ConcertManager.update(editedConcert).then((postedConcert) => {
      concertBands.forEach((band) => {
        const newConcertBand = {bandId: band.id, concertId: postedConcert.id }
        band = newConcertBand
        BandManager.postConcertBand(band)
      })
    }).then(() => props.history.push(`/concerts/${editedConcert.id}`))
  };

  useEffect(() => {
    ConcertManager.getConcert(props.match.params.concertId)
    .then(concert => {
      BandManager.getConcertBand(concert.id).then((concertBandsFromAPI) => {
        concert.bands = concertBandsFromAPI
        .map(
          (concertBand) => concertBand.band
          )
        const bandsFromAPI = concert.bands
        setConcertBands(bandsFromAPI)
        return concert;
      })
      .then((concertWithBands) => setConcert(concertWithBands))
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    ConcertManager.getConcert(props.match.params.concertId).then((concert) => {
      console.log(concert)
      const venueArray = []
      const venueObj = concert.venue
      venueArray.push(venueObj)
      setOnlyVenue(venueArray);
      VenueManager.get(concert.venueId).then((venueLocation) => {
        const locationArray = [];
        const locationObj = venueLocation.location;
        locationArray.push(locationObj)
        setOnlyLocation(locationArray)
      })
    })
  }, []);

  

 

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
    return VenueManager.getAll().then((venuesFromAPI) => {
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
  
  // add new band to database
  const handleAddBandFieldChange = (evt) => {
    const newBandToAdd = { ...newBand };
    newBandToAdd[evt.target.id] = evt.target.value;
    setNewBand(newBandToAdd);
  };
  
  const constructNewBand = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    BandManager.postNewBand(newBand);
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
    VenueManager.postNewVenue(newVenue);
    setIsLoading(true);
  };

  return(
    <>
      <Form className="concert-form">
        <div className="form-header">
          <h1>Update Concert</h1>
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
              selected={concert.bands}
              onChange={handleBandFieldChange}
              name="band"
              id="name"
              emptyLabel="If no matches found, click Add Band to add it to the database!"
              placeholder="e.g. My Chemical Romance"
            />
            <Button
              color="primary"
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
                    color="primary"
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
            value={concert.date}
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
            value={concert.tourName}
            onChange={handleConcertFieldChange}
            placeholder="e.g. Vans Warped Tour"
            className="concert-form-input"
          />
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
              // onChange={handleConcertFieldChange}
              selected={onlyLocation}
              placeholder="e.g. Nashville, TN"
              className="concert-form-input"
            />
            <Button
              color="primary"
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
                      color="primary"
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
            <Typeahead
              type="text"
              options={venues}
              labelKey={(venue) => venue.name}
              selected={onlyVenue}
              name="venue"
              id="venue"
              onChange={handleVenueFieldChange}
              className="concert-form-input"
            />
            <Button
              color="primary"
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
                      color="primary"
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
        <Button onClick={updateExistingConcert} disabled={isLoading} color="primary" id="update-concert-btn">Update Concert</Button>{" "}
      </Form>
    </>
  )



}

export default ConcertEditForm