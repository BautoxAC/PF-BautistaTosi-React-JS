import { useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../context/Context"
import Counter from "../Counter/Counter"
import "./ItemDetail.css"
const ItemDetail = ({ product }) => {
    const navigate = useNavigate()
    const { listCart, setListCart } = useContext(ThemeContext)
    const [quantity, setQuantity] = useState(0)
    const addCart = () => {
        if (quantity > 0 && product.disponibility > 0) {
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
            }
            product.disponibility -= quantity
            setListCart([...listCart])
            setQuantity(0)
        } else {
            if (product.disponibility === 0) {
                alert("Todos los Items disponibles estan el carrito\nPuedes gestinarlos desde el carrito")
                navigate("/")
            } else {
                alert("ingrese un numero entre 1 y " + product.disponibility)
            }
        }
    }
    return (
        <div className="contenedorProducto">
            <img alt={product.alt} src={`/assets/productos/${product.imgUrl}`} className="imgCard" />
            <div>
                <h1>{product.nombre}</h1>
                <p>{product.precio}$</p>
                <p>Disponibles: {product.disponibility}</p>
                <Counter count={quantity} setCount={setQuantity} max={product.disponibility} min={0} />
                <Button onClick={addCart} className="addCartButton" variant="info">Añadir al carrito</Button>
            </div>
        </div >
    )
}

export default ItemDetail