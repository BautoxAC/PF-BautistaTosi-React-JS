import "./ItemListContainer.css"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../context/Context";
import { useEffect, useState, useContext } from "react";
import ItemList from "../ItemList/ItemList";
export default function ItemListContainer() {
    const [productList, setProductList] = useState([])
    const { productList: products } = useContext(ThemeContext)
    const { categoryId } = useParams()
    useEffect(() => {
        const filteredProductList = categoryId ? products.filter(product => product.categoria === categoryId.toLowerCase()) : products
        setProductList(filteredProductList)
    }, [categoryId, products])
    console.log(products.find(product => product.categoria === "x"))
    return (
        <div className="ItemListContainer">
            {typeof (categoryId) === "undefined" && <ItemList list={productList}></ItemList>}
            {(typeof (categoryId) !== "undefined" && products.find(product => product.categoria === categoryId.toLowerCase())) && <ItemList list={productList}></ItemList>}
            {typeof (categoryId) !== "undefined" && typeof (products.find(product => product.categoria === categoryId.toLowerCase())) ==="undefined" && <div className="notFoundContainer">Categoria no encontrada</div>}
        </div>
    )
}