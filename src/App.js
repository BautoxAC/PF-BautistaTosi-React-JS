import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore, getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import { ThemeContext } from './Components/context/Context';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import ItemListDetailContainer from './pages/ItemListDetail/ItemListDetailContainer';
function App() {
  const [listaDeProductos, setListaDeProductos] = useState([])
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
  }
  useEffect(() => {
    getProducts()
  }, [db])
  return (
    <>
      <ThemeContext.Provider value={{ listaDeProductos }} >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/category/:categoryId' element={<ItemListContainer />} />
            <Route path='/Item/:Id' element={<ItemListDetailContainer />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
