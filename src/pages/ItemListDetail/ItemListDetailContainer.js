import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../../Components/context/Context"
import ItemDetail from "../../Components/ItemDetail/ItemDetail"
import "./ItemListDetailContainer.css"
const ItemListDetailContainer = () => {
    const [product, setProduct] = useState({})
    const { Id } = useParams()
    const { productList: products } = useContext(ThemeContext)
    useEffect(() => {
        setProduct(products.find(product => product.id === Id))
    }, [Id, products])
    return (
        <div className="listDetailConatainer">
            {products.find(product => product.id === Id) ? <ItemDetail product={product} /> :
            <div className="notFoundContainer">Producto inexistente</div>}
        </div>
    )
}

export default ItemListDetailContainer