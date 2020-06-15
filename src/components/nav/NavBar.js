import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import './NavBar.css'

const NavBar = (props) => {
  const handleLogout = (e) => {
    e.preventDefault();

    sessionStorage.removeItem("activeUser");
    sessionStorage.removeItem("credentials");
    props.history.push("/");
  };

  // stuff more reactstrap modal
  const [isOpen, setIsOpen] = useState(false);

  // stuff more reactstrap modal
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <header>
        <h1>Concert Junkie</h1>
      </header>
      <div>
        <Navbar color="light" light expand="md">
          {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/concerts">Concerts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/bands">
                  Bands
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Venues</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Locations</NavLink>
              </NavItem>
            </Nav>
            
              <NavLink href="/" onClick={handleLogout}>Log Out</NavLink>
            
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default withRouter(NavBar);
