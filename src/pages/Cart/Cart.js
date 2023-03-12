import { collection, addDoc, getFirestore, doc, updateDoc, writeBatch } from "firebase/firestore"
import { useState, useContext } from "react"
import { ThemeContext } from "../../Components/context/Context"
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
  const cart = listCart.map(({ nombre, quantity, precio }, index) => (
    <tr key={index}>
      <td>{nombre}</td>
      <td>{quantity}</td>
      <td>{precio}$</td>
      <td>{quantity * precio}$</td>
    </tr>
  ))
  const total = listCart.reduce((acc, pro) => acc + pro.precio * pro.quantity, 0)
  return (
    <table className="cart">
      <thead>
        <tr>
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
    </table>
  )
}

export default Cart