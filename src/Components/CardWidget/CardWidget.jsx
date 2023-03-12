import "./CardWidget.css"
import { useContext, useEffect } from "react"
import { ThemeContext } from "../context/Context"
function CardWidget() {
    const { listCart } = useContext(ThemeContext)
    console.log(listCart)
    useEffect(() => {
        console.log(listCart.length)
    }, [listCart.length])
    return (
        <figure>
            <img src="/assets/carrito.png"
                alt="Imagen de un carrito" className="carritoImg" />
            <figcaption>{listCart.length}</figcaption>
        </figure>
    )
}
export default CardWidget