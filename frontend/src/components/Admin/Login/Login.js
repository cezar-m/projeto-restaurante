import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "./Auth.js";

  const Login = () => {
	const [usuario, setUsuario] = useState("");
	const [senha, setSenha] = useState("");
	
	const [error, setError] = useState("");
	const navigate = useNavigate();
	
	const ref = useRef();
		
	const login = (e) => {
		e.preventDefault();
		axios.post("http://localhost:8800/login",{
			usuario: usuario,
			senha: senha,
		})
		.then(res => {
			console.log(res);
			if(!user.usuario.value) {
				return toast.warn("Digite o usuário!");
			} else if(!user.senha.value) {
				return toast.warn("Digite a senha!");
			} else if(res.data.Status === 'Success') {
				console.log(res.data.Token);
				setToken(res.data.Token)
					navigate('/');
			} else {
				setError(res.data.Error);
			}
		})
		.then(({ data }) => toast.success(data))
		.catch(({ data }) => toast.error(data));
	
		const user = ref.current;
  }
  
  return (
    <>
	  <div className="login template d-flex justify-content-center align-items-center vh-100 background">
	    <div className="form_container p-5 rounded bg-white">
		   <form ref={ref}>
		     <h3 className="text-center">Login</h3>
		     <div className="mb-2">
			 <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{error && error}</h1>
		       <label htmlFor="user">Usuário</label>
			    <input type="text" placeholder="Digite Usuário" onChange={(e) => {setUsuario(e.target.value)}} className="form-control" name="usuario" />
		     </div>
		      <div className="mb-2">
		        <label htmlFor="password">Senha</label>
			    <input type="password" placeholder="Digite a senha" onChange={(e) => {setSenha(e.target.value)}} className="form-control" name="senha" />
		      </div>
		      <div className="mb-2">
		        <input type="Checkbox" className="custom-control custom-Checkbox" id="check" />
			    <label htmlFor="check" className="cutom-input-label ms-2">
			      Lembre-se 
			    </label>
			  </div>
			  <div className="d-grid">
			    <button className="btn btn-primary" type="button" onClick={login}>Logar</button>
			  </div>
			  <p>
			     Esqueceu a senha <a href="">Senha ?</a><Link to="/cadusuario" className="ms-2">Cadastre-se</Link>
			  </p>
		   </form>
		</div>
	  </div>
	  <ToastContainer autoClose={3000} position={toast.POSITION.BUTTON_LEFT} />
	</>
  )
}

export default Login;