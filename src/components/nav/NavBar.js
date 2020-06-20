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
    props.history.push("/");
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
          {/* <div class="foo">
            <span class="letter" data-letter="C">
              C
            </span>
            <span class="letter" data-letter="O">
              O
            </span>
            <span class="letter" data-letter="N">
              N
            </span>
            <span class="letter" data-letter="C">
              C
            </span>
            <span class="letter" data-letter="E">
              E
            </span>
            <span class="letter" data-letter="R">
              R
            </span>
            <span class="letter" data-letter="T">
              T
            </span>
            <span></span>
            <span class="letter" data-letter="J">
              J
            </span>
            <span class="letter" data-letter="U">
              U
            </span>
            <span class="letter" data-letter="N">
              N
            </span>
            <span class="letter" data-letter="K">
              K
            </span>
            <span class="letter" data-letter="I">
              I
            </span>
            <span class="letter" data-letter="E">
              E
            </span>
          </div> */}
        </header>
      </div>
      <div className="navbar-div">
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
                <NavLink>Venues</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Locations</NavLink>
              </NavItem>
            </Nav>

            <NavLink href="/" onClick={handleLogout}>
              Log Out
            </NavLink>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default withRouter(NavBar);
