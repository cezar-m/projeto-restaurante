import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Usuario = () =>{ 

  const ref = useRef();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
	
	const user = ref.current;
	
	if(
	   !user.usuario.value ||
	   !user.email.value ||
	   !user.senha.value
	) {
		return toast.warn("Preencha todos os campos!");
	} else {
	  await axios
	    .post("http://localhost:8800/cadusuario", {
		  usuario: user.usuario.value,
		  email: user.email.value,
		  senha: user.senha.value,
	 })
	 .then(({ data }) => toast.success(data))
	 .catch(({ data }) => toast.error(data));
	 
	 user.usuario.value = "";
	 user.email.value = "";
	 user.senha.value = "";
	}

	 
  };

  return(
    <>
	<div className="signup template d-flex justify-content-center align-items-center vh-100 background">
	    <div className="form_container p-5 rounded bg-white">
		   <form ref={ref} onSubmit={handleSubmit}>
		     <h3 className="text-center">Cadastre-se</h3>
			 <div className="mb-2">
		       <label htmlFor="nome">Nome de Usuário</label>
			    <input type="text" placeholder="Digite seu Nome de Usuário" className="form-control" name="usuario" />
		     </div>
		     <div className="mb-2">
		       <label htmlFor="nameuser">E-mail</label>
			    <input type="email" placeholder="Digite o Email" className="form-control" name="email" />
		     </div>
		      <div className="mb-2">
		        <label htmlFor="password">Senha</label>
			    <input type="password" placeholder="Digite a senha" className="form-control" name="senha" />
		      </div>
			  <div className="d-grid mt-2">
			    <button className="btn btn-primary" type="submit">Salvar</button>
			  </div>
			  <p className="text-end mt-2">
			     Rgistre-se <Link to="/login" className="ms-2">Voltar ao Login</Link>
			  </p>
		   </form>
		  </div>
		</div>
		<ToastContainer autoClose={3000} position={toast.POSITION.BUTTON_LEFT} />
	</>
  )
}

export default Usuario;