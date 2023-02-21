import products from "./../../data/productos.json"
import "./ItemListDetailContainer.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Counter from "../../Components/Counter/Counter"
const ItemListDetailContainer = () => {
    const [counter, setCounter] = useState(0)
    const [product, setProduct] = useState({})
    const { Id } = useParams()
    const getProduct = new Promise(
        (res) => {
            res(products.find(product => product.id === Number(Id)))
        }
    )
    useEffect(() => {
        getProduct.then(res => { setProduct(res) })
    }, [Id])
    return (
        <div className="contenedorProducto">
            <img alt={product.alt} src={product.imgUrl} className="imgCard" />
            <div>
                <h1>{product.nombre}</h1>
                <p>{product.precio}$</p>
                <Counter count={counter} setCount={setCounter} max={product.stock} />
            </div>
        </div>
    )
}

export default ItemListDetailContainer