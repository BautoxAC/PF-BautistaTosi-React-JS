import Counter from "../../Components/Counter/Counter"
import { useContext, useState, useEffect } from "react"
import { ThemeContext } from "../../Components/context/Context"
const ItemCart = ({ product, subTotals, setSubTotals, i }) => {
    function findPosition(array) {
        const item = array.find(pro => pro.id === id)
        const position = array.indexOf(item)
        return (position)
    }
    function deleteItem() {
        listCart.splice(findPosition(listCart), 1)
        listaDeProductos[findPosition(listaDeProductos)].disponibility = stock
        listaDeProductos[findPosition(listaDeProductos)].quantity = 0
        setListCart([...listCart])
    }
    const { precio, stock, id, descripcion, imgUrl, nombre, quantity } = product
    const subTotal = subTotals[i].subTotal
    const { listCart, setListCart, listaDeProductos } = useContext(ThemeContext)
    const [count, setCount] = useState(quantity)
    useEffect(() => {
        listaDeProductos[findPosition(listaDeProductos)].quantity = count
        listaDeProductos[findPosition(listaDeProductos)].disponibility = stock - count
        listCart[findPosition(listCart)].quantity = count
        listCart[findPosition(listCart)].disponibility = stock - count
        setListCart([...listCart])
        subTotals[i].subTotal = count * precio
        setSubTotals([...subTotals])
    }, [count])
    return (
        <tr>
            <td className="ImgContainer">
                <picture className="ImgContainer__picture">
                    <img alt={`foto de ${descripcion}`} src={`/assets/productos/${imgUrl}`} className="imgCarrito" />
                </picture>
            </td>
            <td>{nombre}</td>
            <td><Counter count={count} setCount={setCount} max={stock} min={1} /></td>
            <td>{precio}$</td>
            <td>{subTotal}$</td>
            <td><button className="removeItemButton" onClick={deleteItem}> <img alt="boton para eliminar producto" src={`/assets/quitar.png`} className="removeItemImg" /> </button></td>
        </tr >)
}

export default ItemCart