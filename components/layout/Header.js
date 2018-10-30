import Link from 'next/link';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const Header = () => (
    <Navbar
      inverse
      collapseOnSelect
      fluid >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">
              Owl-Verify
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/">
              Home
            </NavItem>

            <NavItem eventKey={2} href="/lists">
              Lists
            </NavItem>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;

/*
            <Link href="/create">
                <a style={linkStyle}>Create a new list</a>
            </Link>
            */
