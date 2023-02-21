import "./ItemListContainer.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import products from "./../../data/productos.json"
import ItemList from "../ItemList/ItemList";
export default function ItemListContainer() {
    const [listaDeProductos, setListaDeProductos] = useState([])
    const { categoryId } = useParams()
    useEffect(() => {
        const listaDeProductosFiltrados = categoryId ? products.filter(product => product.categoria === categoryId.toLowerCase()) : products
        setListaDeProductos(listaDeProductosFiltrados)
    }, [categoryId])
    return (
        <div className="ItemListContainer">
            <ItemList list={listaDeProductos}></ItemList>
        </div>
    )
}