import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "login";
    };

    return (
        <>
           
            <Navbar expand="lg" id="navbar" className="bg-body-tertiary">

            <Container>
                    <Navbar.Brand className="font-w" style={{ fontWeight: "700", fontSize: "30px" }} href="/homepage">                <img className="logo" src="../../Screenshot_2024-03-13_150808-removebg-preview.png" alt="" />
</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link style={{ fontWeight: "800" }} href="/homepage">Home</Nav.Link>
                        <Nav.Link style={{ fontWeight: "800" }} href="/create-blog">Create Blog</Nav.Link>
                        <Nav.Link style={{ fontWeight: "800" }} href="/my-blogs">My Blogs</Nav.Link>
                        <Nav.Link style={{ fontWeight: "800" }} href="/users">Users</Nav.Link>
                        {token ? (
                            <>
                                <Nav.Link style={{ fontWeight: "800" }} href="#" onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                    <Nav.Link style={{ fontWeight: "800" }} href="/login">Login</Nav.Link>
                                    <Nav.Link style={{ fontWeight: "800" }} href="/">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            
        </>
    );
}

export default Header;