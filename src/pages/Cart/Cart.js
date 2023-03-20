import { collection, addDoc, getFirestore, doc, updateDoc, Timestamp } from "firebase/firestore"
import { useContext, useMemo, useState } from "react"
import AuthLogin from "../../Components/AuthLogin/AuthLogin"
import { ThemeContext } from "../../Components/context/Context"
import { Button } from "react-bootstrap"
import "./Cart.css"
import ItemCart from "../../Components/ItemCart/ItemCart"
import Swal from 'sweetalert2'
const Cart = () => {
  const { listCart, setListCart, setPurchase, productList, formValue, logged } = useContext(ThemeContext)
  function eliminateCart() {
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'Borrar Carrito'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El carrito fue eliminado',
          'success'
        )
        for (const pro of productList) {
          pro.quantity = 0
          pro.disponibility = pro.stock
        }
        setListCart([])
      }
    })
  }
  const [subTotals, setSubtotals] = useState(listCart.map((pro) => {
    return ({ id: pro.id, subTotal: pro.precio * pro.quantity })
  }))
  const cart = useMemo(
    () => {
      const total = subTotals.reduce((acc, pro) => acc + pro.subTotal, 0)
      const list = listCart.map((pro, index) => { return (<ItemCart product={pro} key={index} setSubTotals={setSubtotals} subTotals={subTotals} i={index} />) })
      return ({ list, total })
    }, [listCart, subTotals])
  function finishBuying() {
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'Terminar Compra'
    }).then((result) => {
      if (result.isConfirmed) {
        setPurchase(true)
        const db = getFirestore()
        const updateStocks = () => {
          listCart.forEach(({ id, stock }) => {
            const querySnapshot = doc(db, "Products", id)
            updateDoc(querySnapshot, {
              stock: stock,
              disponibility: stock
            })
              .then(console.log("actualizacion de stock"))
              .catch(err => console.log(err))
          })
          const timestamp = Timestamp.now().toDate()
          const querySnapshot = collection(db, "orders")
          addDoc(querySnapshot, {
            buyer: {
              phone: formValue.phone,
              email: formValue.email,
              password: formValue.password
            },
            products: [
              ...listCart
            ],
            total: cart.total,
            time: timestamp
          })
            .then(res => {
              const orderId = res._key.path.segments[1]
              Swal.fire(
                'Compra Finalizada',
                "Numero de orden: " + orderId,
                'success'
              )
            })
            .catch(err => console.log(err))
        }
        updateStocks()
        setListCart([])
      }
    })
  }

  return (
    <>

      {logged === false &&
        <AuthLogin />
      }
      {logged === true && <main>
        {listCart.length > 0 && <table className="cart">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>C/U</th>
              <th>Subtotal</th>
              <th><button className="removeCartButton" onClick={eliminateCart}> <img alt="boton para eliminar producto" src={`/assets/carritoEliminar.png`} className="removeCartImg" title="Borra el carrito" /> </button></th>
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
      </main>}
    </>
  )
}

export default Cart