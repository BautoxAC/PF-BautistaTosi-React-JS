import "./ItemListDetailContainer.css"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../../Components/context/Context"
import Counter from "../../Components/Counter/Counter"
const ItemListDetailContainer = () => {
    const [counter, setCounter] = useState(0)
    const [product, setProduct] = useState({})
    const { Id } = useParams()
    const { listaDeProductos: products } = useContext(ThemeContext)
    useEffect(() => {
        setProduct(products.find(product => product.id === Id))
    }, [Id || products])
    const { alt, imgUrl, precio, nombre, stock } = product
    return (
        <div className="contenedorProducto">
            <img alt={alt} src={`/assets/productos/${imgUrl}`} className="imgCard" />
            <div>
                <h1>{nombre}</h1>
                <p>{precio}$</p>
                <Counter count={counter} setCount={setCounter} max={stock} />
            </div>
        </div>
    )
}

export default ItemListDetailContainer