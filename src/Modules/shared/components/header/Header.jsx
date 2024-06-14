import { useContext } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { AuthContext } from "../../../../contexts/authContext";
import authService from "../../services/authService";

export const Header = () => {
  const { setAuthentication } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthentication(null);
    authService.logout();
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="bg-black text-white">
      <Container className="px-3 m-0 min-vw-100">
        <Navbar.Brand href="/">NoteHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown title="Options" menuVariant="dark" style={{ marginInline: "60px" }} id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/auth" onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
