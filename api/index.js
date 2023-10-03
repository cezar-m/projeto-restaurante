import express from "express";
import productRoutes from "./routes/produtos/route.js";
import loginRoutes from "./routes/login/routerLogin.js";
import userRoutes from "./routes/login/routerRegistro.js";
import cors from "cors";

const app = express()

app.use(express.json());
app.use(cors());

app.use("/product", productRoutes);
app.use("/login", loginRoutes);
app.use("/cadusuario", userRoutes);

app.listen(8800);