import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../../css/navbar.css";
import im1 from "../..//images/utils/astro_logo4.png";
import { ExitToApp, PermIdentity } from '@material-ui/icons'
import { Link } from 'react-router-dom'

export default function Navigbar() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwtToken") ? true : false
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let prevScrollpos = window.pageYOffset;

  const handleScroll = () => {
    if (
      document
        .getElementById("responsive-navbar-nav")
        ?.classList.contains("show")
    )
      return;

    const currentScrollPos = window.pageYOffset;

    if (document.getElementById("navbar")) {
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-100px";
      }
      prevScrollpos = currentScrollPos;
    }
  };

  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        variant="light"
        className="style top-bottom starbg"
        id="navbar"
      >
        <Navbar.Brand as={Link} to="/" className="title-nav">
          <img className="logoimg" src={im1} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title="Projects"
              id="basic-nav-dropdown"
              onMouseEnter={() => setShow4(true)}
              onMouseLeave={() => setShow4(false)}
              onTouchEnd={() => setShow4(!show4)}
              show={show4}
            >
              <NavDropdown.Item as={Link} to="/projects/featured">Flagship Projects</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/projects">Other Projects</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link eventKey="blogs" hresname="nav-items" as={Link} to="/blogs">
              Blogs
            </Nav.Link>
            <Nav.Link eventKey="astrophotography" as={Link} to="/astrophotography" className="nav-items">
              Astrophotography
            </Nav.Link>
            <NavDropdown
              title="Events"
              id="basic-nav-dropdown"
              onMouseEnter={() => setShow3(true)}
              onMouseLeave={() => setShow3(false)}
              onTouchEnd={() => setShow3(!show3)}
              show={show3}
            >
              <NavDropdown.Item as={Link} to="/avishkar">Avishkar</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/prosang">Prosang</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link eventKey="blogs" as={Link} to="/workshop" className="nav-items">
              Jigyasa
            </Nav.Link>
            <Nav.Link
              eventKey="sponsors"
              as={Link}
              to="/achievements"
              className="nav-items"
            >
              Achievements
            </Nav.Link>
            <NavDropdown
              title="Our Team"
              id="basic-nav-dropdown"
              onMouseEnter={() => setShow1(true)}
              onMouseLeave={() => setShow1(false)}
              onTouchEnd={() => setShow1(!show1)}
              show={show1}
            >
              <NavDropdown.Item as={Link} to="/faculty">
                Faculty Corner
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/coordinators">
                Coordinators
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/non-tech">
                Non-Tech Members
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/alumni">Our Alumni</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/webteam">
                Web Team
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link eventKey="collaborate" as={Link} to="/collaborate" className="nav-items">
              Collaborate
            </Nav.Link>
            <Nav.Link eventKey="sponsors" as={Link} to="/sponsors" className="nav-items">
              Sponsors
            </Nav.Link>
            <NavDropdown
              title="More"
              id="basic-nav-dropdown"
              onMouseEnter={() => setShow2(true)}
              onMouseLeave={() => setShow2(false)}
              onTouchEnd={() => setShow2(!show2)}
              show={show2}
            >
              {
                loggedIn ?
                  <NavDropdown.Item as={Link} to="/user/dashboard" eventKey="dasboard" active={false}>
                    <PermIdentity className='mr-1' /> Dashboard
                  </NavDropdown.Item>
                  :
                  <NavDropdown.Item as={Link} to="/user/login" eventKey="login" active={false}>
                    Login <ExitToApp className='ml-3' />
                  </NavDropdown.Item>
              }
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/spinoff" eventKey="spinoff" active={false}>
                Spinoff
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/news" eventKey="news" active={false}>
                Updates
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button className='mr-sm-2 my-2 right-btn btn-primary' target="_blank" href={process.env.REACT_APP_AEROCLUB}>Aero Club</Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
