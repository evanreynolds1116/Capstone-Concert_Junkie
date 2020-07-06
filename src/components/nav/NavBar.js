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
        {/* <picture>
          <img
            src={require("/home/evanr95/workspace/capstone-concert_junkie/src/components/capstone-logo.png")}
            alt="logo"
          />
        </picture> */}
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
            {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/concerts">Concerts</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/bands">Bands</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/venues">Venues</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/locations">Locations</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/years">Years</NavLink>
                </NavItem>
              </Nav>

              <NavLink href="/" onClick={handleLogout}>
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
