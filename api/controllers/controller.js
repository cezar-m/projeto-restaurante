import { db } from "../db.js";

export const getProducts = (_, res) => {
  const query = "SELECT * FROM produtos";
  
  db.query(query, (err, data) => {
    if(err) return res.json(err);
	
	return res.status(200).json(data);
  });
};

export const addProduct = (req, res) => {
  const query = "INSERT INTO produtos(`nome`,`quantidade`, `preco`,`categoria`,`descricao`) VALUES(?)";
  
  const values = [
    req.body.nome,
	req.body.quantidade,
	req.body.preco,
	req.body.categoria,
	req.body.descricao,
  ];
  
  db.query(query, [values], (err) => {
    if(err) return res.json(err);
	
	return res.status(200).json("Produto cadastrado com sucesso.");
  });
};

export const updateProduct = (req, res) => {
  const query = "UPDATE produtos SET `nome` = ?, `quantidade` = ?, `preco` = ?, `categoria` = ?, `descricao` = ? WHERE `id` = ?";
  
   const values = [
    req.body.nome,
	req.body.quantidade,
	req.body.preco,
	req.body.categoria,
	req.body.descricao,
  ];
  
  db.query(query, [...values, req.params.id], (err) => {
    if(err) return res.json(err);
	
	return res.status(200).json("Produto atualizado com sucesso.");
  });
};

export const deleteProduct = (req, res) => {
  const query = "DELETE FROM produtos WHERE `id` = ?";
  
  db.query(query, [req.params.id], (err) => {
    if(err) return res.json(err);
	
	  return res.status(200).json("Produto deletado com sucesso.");
  });
};