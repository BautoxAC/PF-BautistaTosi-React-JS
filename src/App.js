import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { getFirestore, getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import { ThemeContext } from './Components/context/Context';
import UserName from "./Components/UserName/UserName";
import NotFound from "./Components/NotFound/NotFound";
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import ItemListDetailContainer from './pages/ItemListDetail/ItemListDetailContainer';
import Cart from "./pages/Cart/Cart";
function App() {
  const [productList, setListaDeProductos] = useState([])
  const [listCart, setListCart] = useState([])
  const [purchase, setPurchase] = useState(true)
  const db = getFirestore()
  const getProducts = () => {
    const querySnapshot = collection(db, "Products")
    console.log("cargo los productos")
    getDocs(querySnapshot)
      .then(response => {
        const productList = response.docs.map((doc) =>
          ({ id: doc.id, ...doc.data() }))
        setListaDeProductos(productList)
      })
      .catch(error => console.log(error))
    setPurchase(false)
  }
  useEffect(() => {
    purchase === true && getProducts()
  }, [purchase])
  const [logged, setLogged] = useState(false)
  const [formValue, setFormValue] = useState(
    {
      email: "",
      phone: "No ingresado",
      password: ""
    }
  )
  return (
    <ThemeContext.Provider value={{ productList, listCart, setListCart, setPurchase, formValue, setFormValue, logged, setLogged }} >
      <BrowserRouter>
        <NavBar />
        <UserName />
        <Routes>
          <Route path='/' element={<ItemListContainer />} />
          <Route path='/category/:categoryId' element={<ItemListContainer />} />
          <Route path='/Item/:Id' element={<ItemListDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/register" element={<Register />} />
          <Route path="/cart/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
