import "./ItemListContainer.css"
import { useParams } from "react-router-dom"
import { ThemeContext } from "../context/Context";
import { useEffect, useState, useContext } from "react";
import ItemList from "../ItemList/ItemList";
export default function ItemListContainer() {
    const { listaDeProductos } = useContext(ThemeContext)
    console.log(listaDeProductos)
    const { categoryId } = useParams()
    return (
        <div className="ItemListContainer">
            <ItemList list={listaDeProductos}></ItemList>
        </div>
    )
}