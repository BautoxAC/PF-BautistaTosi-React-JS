import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore"
import { useContext, useMemo, useState } from "react"
import { ThemeContext } from "../../Components/context/Context"
import { Button } from "react-bootstrap"
import "./Cart.css"
import ItemCart from "../../Components/ItemCart/ItemCart"
import { v4 as uuidv4 } from 'uuid'
const Cart = () => {
  const { listCart, setListCart, setPurchase, listaDeProductos } = useContext(ThemeContext)
  function eliminateCart() {
    for (const pro of listaDeProductos) {
      pro.quantity = 0
      pro.disponibility = pro.stock
    }
    setListCart([])
  }
  const [subTotals, setSubtotals] = useState(listCart.map((pro) => {
    return({id: pro.id, subTotal: pro.precio * pro.quantity})
  }))
  const cart = useMemo(
    () => {
      const total = subTotals.reduce((acc, pro) => acc + pro.subTotal, 0)
      const list = listCart.map((pro, index) => { return (<ItemCart product={pro} key={index} setSubTotals={setSubtotals} subTotals={subTotals} i={index} />) })
      return ({ list, total })
    }, [listCart, subTotals])
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
        total: cart.total
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
            <th><button className="removeCartButton" onClick={eliminateCart}> <img alt="boton para eliminar producto" src={`/assets/carritoEliminar.png`} className="removeCartImg" /> </button></th>
          </tr>
        </thead>
        <tbody>{cart.list}</tbody>
        <tfoot>
          <tr>
            <td>Total: {cart.total}$</td>
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