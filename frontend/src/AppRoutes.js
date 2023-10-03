import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Login from "./components/Admin/Login/Login.js";
import Usuario from "./components/Admin/Login/Usuario.js";
import FormProdutos from "./components/Admin/Produtos/FormProdutos.js";
import Grid from "./components/Admin/Produtos/Grid.js";
import Clientes from "./components/Admin/Clientes/Clientes.js";
import Home from "./components/Admin/Home/Home.js";
import Menu from "./components/Admin/Menu/Menu.js";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import { RequireToken } from "./components/Admin/Login/Auth.js";


const AppRoutes = () => { 

  const [products, setProducts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProducts = async () => {
    try {
		const res = await axios.get("http://localhost:8800/product");
		setProducts(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
	} catch (error) {
		toast.error(error);
	}
  };
  
  useEffect(() => {
    getProducts();
  }, [setProducts]) 
	
  return (
    <Router>
	  <Routes>
	    <Route path="/login" element={<Login />} />
		<Route path="/cadusuario" element={<Usuario/>} />
		<Route path="/" element={
			<RequireToken>
				<Menu />
			</RequireToken>
		}>
			<Route path="" element={<Home />} />
			<Route path="/cadProduto" element={<FormProdutos onEdit={onEdit} setOnEdit={setOnEdit} getProducts={getProducts} />} />
			<Route path="/listaProduto" element={<Grid products={products} setProducts={setProducts} setOnEdit={setOnEdit} />} />
			<Route path="/clientes" element={<Clientes />} />
		</Route>
	  </Routes>
	</Router>
  )
}

export default AppRoutes;