import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css"
import CardWidget from '../CardWidget/CardWidget';
function NavBar() {
    return (
        <header>
            <Navbar bg="light" expand="lg" className='Nav'>
                <Navbar.Brand>Elaisa</Navbar.Brand>
                <div className='contenedorNav2'>
                    <Nav.Link href="#Productos">Productos</Nav.Link>
                    <Nav.Link href="#home">Casa</Nav.Link>
                    <Nav.Link href="#Nosotros">Nosotros</Nav.Link>
                    <CardWidget />
                </div>
            </Navbar>
        </header>
    );
}

export default NavBar;