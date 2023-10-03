import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa"; 
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Grid = ({ products, setProducts, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);  
  };
	
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/product/" + id)
	  .then(({ data }) => {
	    const newArray = products.filter((user) => user.id !== id);

        setProducts(newArray);
        toast.success(data);		
	  })
	  .catch(({ data }) => toast.error(data));
    
	setOnEdit(null);
  };  
  
  return (
	<>
	  <div style={{ marginLeft:"8%" }}>
	  <Link to="/cadProduto" className="btn btn-primary mt-4">Adicionar Produtos</Link>
	  </div>
	  <div className="container d-flex justify-content-center">
	     <table className="table table-light mt-4">
		   <thead>
		     <tr>
			   <th scope="col">Nome</th>
			   <th scope="col">Quantidade</th>
			   <th scope="col">Preço</th>
			   <th scope="col">Categoria</th>
			   <th scope="col">Descrição</th>
			   <th></th>
			   <th></th>
		     </tr>
		  </thead>
		  <tbody>	   
		  {products.map((item, i) => (
		    <tr key={i}>
			  <td width="20%">{item.nome}</td>
			  <td width="20%">{item.quantidade}</td>
			  <td width="20%">{item.preco}</td>
			  <td width="20%">{item.categoria}</td>
			  <td width="10%">{item.descricao}</td>
			  <td width="5%">
			    <Link to="/cadProduto"><FaEdit onClick={() => handleEdit(item)} /></Link>
			  </td>
			  <td width="5%">
			    <FaTrash onClick={() => handleDelete(item.id)} />
			  </td>
		    </tr>
		  ))}
		  </tbody>
	    </table>
	  </div>
	  <ToastContainer autoClose={3000} position={toast.POSITION.BUTTON_LEFT} />
	</>
  );
};

export default Grid;