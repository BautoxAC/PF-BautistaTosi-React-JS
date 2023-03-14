import { collection, addDoc, getFirestore, doc, updateDoc, writeBatch } from "firebase/firestore"
import { useState, useContext } from "react"
import { ThemeContext } from "../../Components/context/Context"
import "./Cart.css"
const Cart = () => {
  const { listCart } = useContext(ThemeContext)
  /* const db = getFirestore()
  const updateStocks = () => {
    products.forEach((pro) => {
      const querySnapshot = doc(db, "Products", pro.id)
      updateDoc(querySnapshot, {
        quantity: 0
      })
        .then(console.log("actualizacion de stock"))
        .catch(err => console.log(err))
    })
  } */
  const cart = listCart.map(({ nombre, quantity, precio, imgUrl, descripcion }, index) => (
    <tr key={index}>
      <td className="ImgContainer">
        <picture className="ImgContainer__picture">
          <img alt={`foto de ${descripcion}`} src={`/assets/productos/${imgUrl}`} className="imgCarrito" />
        </picture>
      </td>
      <td>{nombre}</td>
      <td>{quantity}</td>
      <td>{precio}$</td>
      <td>{quantity * precio}$</td>
    </tr>
  ))
  const total = listCart.reduce((acc, pro) => acc + pro.precio * pro.quantity, 0)
  return (
    <main>
      {listCart.length > 0 && <table className="cart">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>C/U</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>{cart}</tbody>
        <tfoot>
          <tr>
            <td>Total: {total}$</td>
          </tr>
        </tfoot>
      </table>}
      {listCart.length === 0 && <div>El carrito esta vacio</div>}
    </main>
  )
}

export default Cart