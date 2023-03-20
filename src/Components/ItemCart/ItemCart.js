import Counter from "../../Components/Counter/Counter"
import { useContext, useState, useEffect } from "react"
import { ThemeContext } from "../../Components/context/Context"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ItemCart = ({ product, subTotals, setSubTotals, i }) => {
    function findPosition(array) {
        const item = array.find(pro => pro.id === id)
        const position = array.indexOf(item)
        return (position)
    }
    function deleteItem() {
        toast.success('Producto eliminado correctamente', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
        setTimeout(() => {
            listCart.splice(findPosition(listCart), 1)
            productList[findPosition(productList)].disponibility = stock
            productList[findPosition(productList)].quantity = 0
            setListCart([...listCart])
        }, 1500);
    }
    const { precio, stock, id, descripcion, imgUrl, nombre, quantity } = product
    const subTotal = subTotals[i].subTotal
    const { listCart, setListCart, productList } = useContext(ThemeContext)
    const [count, setCount] = useState(quantity)
    useEffect(() => {
        productList[findPosition(productList)].quantity = count
        productList[findPosition(productList)].disponibility = stock - count
        listCart[findPosition(listCart)].quantity = count
        listCart[findPosition(listCart)].disponibility = stock - count
        setListCart([...listCart])
        subTotals[i].subTotal = count * precio
        setSubTotals([...subTotals])
    }, [count])
    return (
        <>
            <ToastContainer />
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
                <td><button className="removeItemButton" onClick={deleteItem}> <img alt="boton para eliminar producto" src={`/assets/quitar.png`} className="removeItemImg" title="Elimina el item del carrito" /> </button></td>
            </tr >
        </>
    )
}

export default ItemCart