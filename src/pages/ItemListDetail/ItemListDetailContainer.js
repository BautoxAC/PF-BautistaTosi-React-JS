import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../../Components/context/Context"
import ItemDetail from "../../Components/ItemDetail/ItemDetail"
import "./ItemListDetailContainer.css"
const ItemListDetailContainer = () => {
    const [product, setProduct] = useState({})
    const { Id } = useParams()
    const { listaDeProductos: products } = useContext(ThemeContext)
    useEffect(() => {
        setProduct(products.find(product => product.id === Id))
    }, [Id || products])
    return (
        <div className="listDetailConatainer">
            <ItemDetail product={product} />
        </div>
    )
}

export default ItemListDetailContainer