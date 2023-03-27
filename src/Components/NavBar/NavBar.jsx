import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css"
import CardWidget from '../CardWidget/CardWidget';
import { ThemeContext } from "../context/Context";
import { useEffect, useState, useContext } from "react";
function NavBar() {
    const { productList: products } = useContext(ThemeContext)
    const [categories, setCategories] = useState([])
    const getCategories = () => {
        const categoriasSinRepetir = [...new Set(products.map((product) => (
            product.categoria.slice(0, 1).toUpperCase() + product.categoria.slice(1))))]
            setCategories(categoriasSinRepetir.map((categoria, index) => (<NavLink to={`/category/${categoria}`} key={index} className="categorias">{categoria}</NavLink>)))
    }
    useEffect(() => {
        getCategories()
    }, [products])
    return (
        <header>
            <Navbar expand="lg" className='Nav'>
                <NavLink to="/" className="logo">Elaisa</NavLink>
                <div className='contenedorNav2'>
                    {categories}
                    <NavLink to="/cart">
                        <CardWidget />
                    </NavLink>
                </div>
            </Navbar>
        </header>
    );
}

export default NavBar