import mysql from "mysql";

export const db = mysql.createConnection({
  host: "containers-us-west-170.railway.app",
  user: "root",
  password: "A7MI31PANEYEtKxklqG9",
  database: "railway",
});

db.connect(function(err){
	if(err) {
		console.log("Erro ao Conectar com o banco");
	} else {
		console.log("Conectado com sucesso!!!");
	}
}) 
 
