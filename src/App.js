import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import ItemListDetailContainer from './pages/ItemListDetail/ItemListDetailContainer';
function App() {
  return ( 
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ItemListContainer/>}/>
        <Route path='/categoty/:categoryId' element={<ItemListContainer/>}/>
        <Route path='/Item/:Id' element={<ItemListDetailContainer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
