import "./ItemListContainer.css"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../context/Context";
import { useEffect, useState, useContext } from "react";
import ItemList from "../ItemList/ItemList";
export default function ItemListContainer() {
    const [listaDeProductos, setListaDeProductos] = useState([])
    const { listaDeProductos: products } = useContext(ThemeContext)
    const { categoryId } = useParams()
    useEffect(() => {
        const listaDeProductosFiltrados = categoryId ? products.filter(product => product.categoria === categoryId.toLowerCase()) : products
        setListaDeProductos(listaDeProductosFiltrados)
    }, [categoryId || products])
    return (
        <div className="ItemListContainer">
            <ItemList list={listaDeProductos}></ItemList>
        </div>
    )
}