import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import style from "./../../../assets/css/style.css";
import 'react-toastify/dist/ReactToastify.css';
import Grid from "./Grid.js";
import { Link  } from "react-router-dom";

const FormProdutos = ({ getProducts, onEdit, setOnEdit }) =>{ 	

  const [products, setProducts] = useState([]);	  

  const ref = useRef();
    
  useEffect(() => {
    if(onEdit) {
	  const user = ref.current;
	  
	  user.nome.value = onEdit.nome;
	  user.quantidade.value = onEdit.quantidade;
	  user.preco.value = onEdit.preco;
	  user.categoria.value = onEdit.categoria;
	  user.descricao.value = onEdit.descricao;
	}
  }, [onEdit]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
	
	const user = ref.current;
	
	if(
	   !user.nome.value ||
	   !user.quantidade.value ||
	   !user.preco.value ||
	   !user.categoria.value ||
	   !user.descricao.value
	) {
		return toast.warn("Preencha todos os campos!");
	}
	if(onEdit) {
	  await axios
	    .put("http://localhost:8800/product/" + onEdit.id, {
		   nome: user.nome.value,
		   quantidade: user.quantidade.value,
		   preco: user.preco.value,
		   categoria: user.categoria.value,
		   descricao: user.descricao.value,
			  
    })
	  .then(({ data }) => toast.success(data))
	  .catch(({ data }) => toast.error(data));
	} else {
	  await axios
	    .post("http://localhost:8800/product", {
		  nome: user.nome.value,
		  quantidade: user.quantidade.value,
		  preco: user.preco.value,
		  categoria: user.categoria.value,
		  descricao: user.descricao.value,
	 })
	 .then(({ data }) => toast.success(data))
	 .catch(({ data }) => toast.error(data));
	}
	
	user.nome.value = "";
	user.quantidade.value = "";
	user.preco.value = "";
	user.categoria.value = "";
	user.descricao.value = "";
	
	setOnEdit(null);
	getProducts();
	
	window.setTimeout("location.href='/ListaProduto'",2000);
	
  };

  return(
    <>
	  <h2 className="text-center mt-4">Cadastro de Produtos</h2>
	  <div className="container d-flex justify-content-center">
	    <form className="form-fields" ref={ref} onSubmit={handleSubmit}>
	      <div className="input-group mb-3">
		    <span className="input-group-text" id="nome">Nome:</span>
		    <input type="text" className="form-fields" placeholder="" name="nome" />
		  </div>
		  <div className="input-group mb-3">
		    <span className="input-group-text" id="quantidade">Quantidade:</span>
		    <input type="text" className="form-fields" placeholder="" name="quantidade" />
		  </div>
		  <div className="input-group mb-3">
		    <span className="input-group-text" id="preco">Preço:</span>
		    <input type="text" className="form-fields" placeholder="" name="preco" />
		  </div>
		  <div className="input-group mb-3">
		    <span className="input-group-text" id="categoria">Categoria:</span>
		    <input type="text" className="form-fields" placeholder="" name="categoria" />
		  </div>
		  <div className="input-group mb-3">
		     <span className="input-group-text" id="categoria">Descrição:</span>
			<textarea className="form-fields" id="exampleFormControlTextarea1" name="descricao" rows="4"></textarea>
		  </div>
		  <button className="btn btn-primary" type="submit">Salvar</button>
	   </form>
	 </div>
	 <ToastContainer autoClose={3000} position={toast.POSITION.BUTTON_LEFT} />
	</>
  )
}

export default FormProdutos;