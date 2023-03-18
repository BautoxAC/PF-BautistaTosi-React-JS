import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore"
import { useContext } from "react"
import { ThemeContext } from "../../Components/context/Context"
import { Button } from "react-bootstrap"
import "./Cart.css"
import { v4 as uuidv4 } from 'uuid'
const Cart = () => {
  const { listCart, setListCart, setPurchase } = useContext(ThemeContext)
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
  function finishBuying() {
    const orderNumber = uuidv4()
    setPurchase(true)
    const db = getFirestore()
    const updateStocks = () => {
      listCart.forEach(({ id, stock, quantity }) => {
        const querySnapshot = doc(db, "Products", id)
        updateDoc(querySnapshot, {
          stock: stock - quantity,
          disponibility: stock - quantity
        })
          .then(console.log("actualizacion de stock"))
          .catch(err => console.log(err))
      })
      const querySnapshot = collection(db, "orders")
      addDoc(querySnapshot, {
        buyer: {
          email: "example@gmail.com",
          name: "Pedro",
          phone: "+2314132",
        },
        products: [
          ...listCart
        ],
        total: total
      })
    }
    updateStocks()
    setListCart([])
    alert("compra realizada \nNumero de orden:" + orderNumber)
  }

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
            <td><Button className="buyButton" onClick={finishBuying}>Terminar Compra</Button></td>
          </tr>
        </tfoot>
      </table>}
      {listCart.length === 0 && <picture className="emptyCartContainer">
        <img src="/assets/carritovacio.png"
          alt="Imagen de un carrito Vacio" className="emptyCart" />
      </picture>
      }
    </main>
  )
}

export default Cart