import React, { useState } from "react";
import "./LoginRegister.css";
import AuthManager from "../../modules/AuthManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const LoginRegister = (props) => {
  const { buttonLabel, className } = props;

  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  const toggleLogin = () => setModalLogin(!modalLogin);
  const toggleRegister = () => setModalRegister(!modalRegister);

  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });

  // Update state whenever an input field is edited
  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    AuthManager.loginUser(credentials).then((result) => {
      if (result.length > 0) {
        sessionStorage.setItem("activeUser", result[0].id);
        sessionStorage.setItem("credentials", result[0].username);
        props.history.push("/concerts");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    sessionStorage.setItem("credentials", credentials.username);
    AuthManager.saveNewUser(credentials).then(() =>
      props.history.push("/concerts")
    );
  };

  return (
    <>
      <div className="LoginRegisterDiv">
        <div>
          <Button className="login-btn" onClick={toggleLogin}>
            {buttonLabel}Sign In
          </Button>
          <Modal
            isOpen={modalLogin}
            toggle={toggleLogin}
            className={className}
          >
            <ModalHeader toggle={toggleLogin}>Sign In</ModalHeader>
            <ModalBody>
              <form onSubmit={handleLogin}>
                <div className="container">
                  <fieldset>
                    {/* <h1>Please sign in</h1> */}
                    <div className="container">
                      <label htmlFor="inputEmail">
                        <b>Email address</b>
                      </label>
                      <input
                        onChange={handleFieldChange}
                        type="text"
                        id="email"
                        placeholder="Email address"
                        required=""
                        autoFocus=""
                        className="inputEmail"
                      />

                      <label htmlFor="inputPassword">
                        <b>Password</b>
                      </label>
                      <input
                        onChange={handleFieldChange}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required=""
                        className="inputPassword"
                      />

                      <button type="submit" onClick={toggleLogin}>
                        Sign in
                      </button>
                    </div>
                  </fieldset>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary" type="submit">Sign In</Button>{' '} */}
              <Button onClick={toggleLogin}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <div>
          <Button
            className="register-btn"
            onClick={toggleRegister}
          >
            {buttonLabel}Register
          </Button>
          <Modal
            isOpen={modalRegister}
            toggleregister={toggleRegister}
            className={className}
          >
            <ModalHeader toggleregister={toggleRegister}>Register</ModalHeader>
            <ModalBody>
              <form onSubmit={handleRegister}>
                <div className="container">
                  <p>Please fill in this form to create an account.</p>

                  <label htmlFor="email">
                    <b>Email</b>
                  </label>
                  <input
                    onChange={handleFieldChange}
                    type="text"
                    className=""
                    id="email"
                    placeholder="Enter Email"
                    required
                  />

                  <label htmlFor="username">
                    <b>Username</b>
                  </label>
                  <input
                    onChange={handleFieldChange}
                    type="text"
                    className=""
                    id="username"
                    placeholder="Enter Username"
                  />

                  <label htmlFor="password">
                    <b>Password</b>
                  </label>
                  <input
                    onChange={handleFieldChange}
                    type="password"
                    className=""
                    id="password"
                    placeholder="Enter Password"
                    required
                  />

                  <label htmlFor="passwordConfrim">
                    <b>Repeat Password</b>
                  </label>
                  <input
                    onChange={handleFieldChange}
                    type="password"
                    className=""
                    id="passwordConfirm"
                    placeholder="Repeat Password"
                    required
                  />

                  <button
                    type="submit"
                    className="registerBtn"
                    id="saveRegister"
                    onClick={toggleRegister}
                  >
                    Register
                  </button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary" type="submit">
              Register
            </Button>{" "} */}
              <Button onClick={toggleRegister}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;

