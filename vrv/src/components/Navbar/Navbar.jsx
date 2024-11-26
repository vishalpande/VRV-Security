import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './AppNavbar.css'; // Import the external CSS file

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="app-navbar">
      <Navbar.Brand href="#home" className="brand-text">RBAC Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#users" className="nav-link">Users</Nav.Link>
          <Nav.Link href="#roles" className="nav-link">Roles</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
