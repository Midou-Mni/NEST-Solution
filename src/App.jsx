import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddProduct from './pages/AddProduct';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyProducts from './pages/MyProducts';
import EditProduct from './pages/EditProduct';
import Board from './pages/Board';
import ProductPreview from './pages/ProductPreview';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/board" element={<Board />} />
          <Route path="/product-preview/:id" element={<ProductPreview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
