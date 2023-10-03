import express from "express";
import { 
	getUsers,
	addUser,
} from "../../controllers/controller_user.js";

const routerRegistro  = express.Router();

routerRegistro.get("/", getUsers);

routerRegistro.post("/", addUser); 

export default routerRegistro;