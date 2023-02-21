import Card from 'react-bootstrap/Card';
import "./ItemList.css"
import { Link } from "react-router-dom";
const ItemList = ({ list }) => {
    const productos = list.map((product, index) => (
        <Link key={index} to={`/Item/${product.id}`}>
            <Card border="primary">
                <Card.Header className="contendorImg"><img alt={product.alt} src={product.imgUrl} className="imgCard" /></Card.Header>
                <Card.Body className="texto">
                    <Card.Title>{product.nombre}</Card.Title>
                    <Card.Text>
                        {product.precio}$
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    ))
    return (
        <div className="ContenedorProductos">{productos}</div>
    )
}

export default ItemList