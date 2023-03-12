import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../../Components/context/Context"
import ItemDetail from "../../Components/ItemDetail/ItemDetail"
const ItemListDetailContainer = () => {
    const [product, setProduct] = useState({})
    const { Id } = useParams()
    const { listaDeProductos: products } = useContext(ThemeContext)
    useEffect(() => {
        setProduct(products.find(product => product.id === Id))
    }, [Id || products])
    return (
        <div>
            <ItemDetail product={product} />
        </div>
    )
}

export default ItemListDetailContainer