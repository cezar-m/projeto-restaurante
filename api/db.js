import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurante",
});

db.connect(function(err){
	if(err) {
		console.log("Erro ao Conectar com o banco");
	} else {
		console.log("Conectado com sucesso!!!");
	}
}) 
 