import express from "express";
import { 
	hash,
	login,
} from "../../controllers/controller_user.js";

const routerLogin  = express.Router();

routerLogin.get("/", hash);

routerLogin.post("/", login);

export default routerLogin;