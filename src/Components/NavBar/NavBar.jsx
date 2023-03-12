import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css"
import CardWidget from '../CardWidget/CardWidget';
import products from "./../../data/productos.json"
import { useState, useEffect } from 'react';
function NavBar() {
    const [categories, setCategories] = useState([])
    const getProducts = new Promise(res => {
        const categoriasSinRepetir = [...new Set(products.map((product) => (
            product.categoria.slice(0, 1).toUpperCase() + product.categoria.slice(1))))]
        res(categoriasSinRepetir.map((categoria, index) => (<NavLink to={`/category/${categoria}`} key={index} className="categorias">{categoria}</NavLink>)))
    }
    )
    useEffect(() => {
        getProducts
            .then(response => setCategories(response))
    },[products])
    return (
        <header>
            <Navbar expand="lg" className='Nav'>
                <NavLink to="/" className="logo">Elaisa</NavLink>
                <div className='contenedorNav2'>
                    {categories}
                    <CardWidget />
                </div>
            </Navbar>
        </header>
    );
}

export default NavBar