import { useState, useContext } from "react"
import { Button } from "react-bootstrap"
import { ThemeContext } from "../context/Context"
import Counter from "../Counter/Counter"
import "./ItemDetail.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ItemDetail = ({ product }) => {
    const { listCart, setListCart } = useContext(ThemeContext)
    const [quantity, setQuantity] = useState(0)
    const addCart = () => {
        if (quantity > 0 && product.disponibility > 0) {
            if (listCart.some(pro => pro.id === product.id)) {
                const productRepited = listCart.find(pro => pro.id === product.id)
                const positionRepited = listCart.indexOf(productRepited)
                if (productRepited.disponibility < quantity || quantity === 0) {
                    toast.warn("ingrese un numero entre 1 y " + productRepited.disponibility, {
                        position: "bottom-right",
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
                } else {
                    listCart[positionRepited].quantity += quantity
                    listCart[positionRepited].disponibility -= quantity
                }
            } else {
                listCart.push({ ...product, quantity: quantity, disponibility: product.stock - quantity })
            }
            product.disponibility -= quantity
            setListCart([...listCart])
            setQuantity(0)
            toast.success('Compra añadida correctamente', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } else {
            if (product.disponibility === 0) {
                toast.warn("Todos los Items disponibles estan el carrito", {
                    position: "bottom-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            } else {
                toast.error("Ingrese un numero entre 1 y " + product.disponibility, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    }
    return (
        <div className="contenedorProducto">
            <ToastContainer />
            <img alt={product.alt} src={`/assets/productos/${product.imgUrl}`} className="imgCard" />
            <div>
                <h1>{product.nombre}</h1>
                <p>{product.precio}$</p>
                <p>Disponibles: {product.disponibility}</p>
                <Counter count={quantity} setCount={setQuantity} max={product.disponibility} min={0} />
                <Button onClick={addCart} className="addCartButton" variant="info">Añadir al carrito</Button>
            </div>
        </div >
    )
}

export default ItemDetail