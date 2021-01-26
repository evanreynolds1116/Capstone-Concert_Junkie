import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import "./NavBar.css";

const NavBar = (props) => {
  const handleLogout = (e) => {
    e.preventDefault();

    sessionStorage.removeItem("activeUser");
    sessionStorage.removeItem("credentials");
    props.history.push("/login");
  };

  // stuff more reactstrap modal
  const [isOpen, setIsOpen] = useState(false);

  // stuff more reactstrap modal
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="header-div ">
        <header>
          <div className="container">
            <div className="neon">Concert</div>
            <div className="flux">Junkie</div>
          </div>
        </header>
      </div>
      <div className="navbar-div">
        {props.hasUser ? (
          <Navbar expand="md">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/concerts" id="nav-link">Concerts</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/bands" id="nav-link">Bands</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/venues" id="nav-link">Venues</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/locations" id="nav-link">Locations</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/years" id="nav-link">Years</NavLink>
                </NavItem>
              </Nav>

              <NavLink href="/" onClick={handleLogout} id="logout-btn">
                Log Out
              </NavLink>
            </Collapse>
          </Navbar>
        ) : null}
      </div>
    </>
  );
};

export default withRouter(NavBar);
