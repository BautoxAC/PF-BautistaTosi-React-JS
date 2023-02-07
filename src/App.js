import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar/NavBar';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
function App() {
  return ( 
    <section>
      <NavBar/>
      <ItemListContainer greeting="Bienvenido a mi pagina"/>
    </section>
  );
}

export default App;
