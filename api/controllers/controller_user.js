import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = (_, res) => {
	const query = "SELECT * FROM login";
	
	db.query(query, (err, data) => {
		if(err) return res.json(err);
		
		return res.status(200).json(data);
	});
};

export const hash = (req, res) => {
	bcrypt.hash("123456", 10, (err, hash) => {
		if(err) return res.json({Erro: "Erro de hashing na senha"});
			const values = [
				hash
			]
			return res.json({result: hash});
	})
}

export const login = (req, res) => {
	const query = "SELECT * FROM login Where usuario = ?";
	db.query(query, [req.body.usuario], (err, result) => {
		if(err) return res.json({Status: "Error", Error: "Erro de rodar query"});
		if(result.length > 0) {
			bcrypt.compare(req.body.senha.toString(), result[0].senha, (err, response) => {
				if(err) return res.json({ Error: "Erro de senha" });
				if(response) {
					const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {expiresIn: '1d'});
					return res.json({Status: "Success", Token: token});	
				} else {
					return res.json({Status: "Error", Error: "Usuário ou senha estão incorretos!!!"});
				}
			})
		} else {
			return res.json({Status: "Error", Error: "Usuário ou senha estão incorretos!!!"});
		}
	})
}

export const addUser = (req, res) => {
	const query = "INSERT INTO login(`usuario`, `email`, `senha`) VALUES(?)";
	bcrypt.hash(req.body.senha.toString(), 10, (err, hash) => {
		if(err) return res.status(400).json("Usuario ou senha estão incorretos!");
		
		const values = [
			req.body.usuario,
			req.body.email,
				hash,
		];
		
		db.query(query, [values], (err) => {
			if(err) return res.json(err);
			
			return res.status(200).json("Usuário cadastrado com sucesso!");
		});
	});
}