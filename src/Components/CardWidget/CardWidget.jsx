import "./CardWidget.css"
import { useContext, useMemo } from "react"
import { ThemeContext } from "../context/Context"
function CardWidget() {
    const { listCart } = useContext(ThemeContext)
    const quantityCart = useMemo(() => (listCart.reduce((acc, { quantity }) => acc + quantity, 0)), [listCart])
    return (
        <figure>
            <img src="/assets/carrito.png"
                alt="Imagen de un carrito" className="carritoImg" />
            <figcaption>{quantityCart}</figcaption>
        </figure>
    )
}
export default CardWidget