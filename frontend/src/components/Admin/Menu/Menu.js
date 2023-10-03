import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Menu = () => {  
  const navigate = useNavigate();
  const signOut = () => {
	  localStorage.removeItem('Token');
	  navigate('/login');
  }
  
  return(
    <>
	  <nav className="navbar navbar-expand-lg navbar-light bg-light">
		<div className="container-fluid">
			<Link to="/" className="nav-link">Home</Link>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					<li className="nav-item">
						<Link to="/listaProduto" className="nav-link">Produtos</Link>
					</li>
					<li className="nav-item">
						<Link to="/clientes" className="nav-link">Clientes</Link>
					</li>
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Mais detalhes
						</a>
						<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
							<li><a className="dropdown-item" href="#">Novos Produtos</a></li>
							<li><a className="dropdown-item" href="#">Delivery</a></li>
							<li><a className="dropdown-item" href="#">Novidades</a></li>
						</ul>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link" onClick={signOut}>Desolgar</Link>
					</li>
				</ul>
			</div>
		  </div>
		</nav>
		<Outlet />
	</>
  )
}

export default Menu;