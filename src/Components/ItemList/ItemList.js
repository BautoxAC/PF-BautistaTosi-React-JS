import Card from 'react-bootstrap/Card';
import "./ItemList.css"
import { Link } from "react-router-dom";
const ItemList = ({ list }) => {
    const productos = list.map(({ id, alt, imgUrl, precio, nombre, stock }, index) => {
        const handleClick = (e) => {
            if (stock === 0) {
                e.preventDefault()
                alert("No hay stock disponible del producto en este momento")
            }
        }
        return <Link key={index} to={`/Item/${id}`} onClick={handleClick}>
            <Card border="primary">
                <Card.Header className="contendorImg"><img alt={alt} src={`/assets/productos/${imgUrl}`} className="imgCard" /></Card.Header>
                <Card.Body className="texto">
                    <Card.Title>{nombre}</Card.Title>
                    <Card.Text>
                        {precio}$
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    }
    )
    return (
        <div className="ContenedorProductos">{productos}</div>
    )
}

export default ItemList