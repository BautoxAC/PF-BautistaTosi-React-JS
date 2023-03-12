import { useState, useContext } from "react"
import "./ItemDetail.css"
import { Button } from "react-bootstrap"
import { ThemeContext } from "../context/Context"
import Counter from "../Counter/Counter"
const ItemDetail = ({ product }) => {
    const [quantity, setQuantity] = useState(0)
    const { listCart, setListCart } = useContext(ThemeContext)
    const addCart = () => {
        setListCart([...listCart, { ...product, quantity: quantity }])
        console.log(listCart)
    }
    const { alt, imgUrl, precio, nombre, stock } = product
    return (
        <div className="contenedorProducto">
            <img alt={alt} src={`/assets/productos/${imgUrl}`} className="imgCard" />
            <div>
                <h1>{nombre}</h1>
                <p>{precio}$</p>
                <Counter count={quantity} setCount={setQuantity} max={stock} />
                <Button onClick={addCart}>Añadir al carrito</Button>
            </div>
        </div>
    )
}

export default ItemDetail