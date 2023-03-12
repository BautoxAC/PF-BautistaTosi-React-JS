import { useState, useContext } from "react"
import "./ItemDetail.css"
import { Button } from "react-bootstrap"
import { ThemeContext } from "../context/Context"
import Counter from "../Counter/Counter"
const ItemDetail = ({ product }) => {
    const { listCart, setListCart } = useContext(ThemeContext)
    const [quantity, setQuantity] = useState(0)
    const addCart = () => {
        if (listCart.some(pro => pro.id === product.id)) {
            const productRepited = listCart.find(pro => pro.id === product.id)
            const positionRepited = listCart.indexOf(productRepited)
            if (productRepited.disponibility < quantity || quantity === 0) {
                alert("ingrese un numero entre 1 y " + productRepited.disponibility)
            } else {
                listCart[positionRepited].quantity += quantity
                listCart[positionRepited].disponibility -= quantity
            }
        } else {
            listCart.push({ ...product, quantity: quantity, disponibility: product.stock - quantity })
            setListCart([...listCart])
        }
    }
    return (
        <div className="contenedorProducto">
            <img alt={product.alt} src={`/assets/productos/${product.imgUrl}`} className="imgCard" />
            <div>
                <h1>{product.nombre}</h1>
                <p>{product.precio}$</p>
                <Counter count={quantity} setCount={setQuantity} max={product.stock} />
                <Button onClick={addCart}>Añadir al carrito</Button>
            </div>
        </div>
    )
}

export default ItemDetail