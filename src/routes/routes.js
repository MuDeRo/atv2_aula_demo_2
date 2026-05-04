import { Router } from "express";
const routes = Router();
import categoriaRoutes from "./categoriaRoutes.js";
import produtoRoutes from "./produtoRoutes.js";
import clienteRoutes from "./clienteRoutes.js";
import pedidoRoutes from "./pedidoRoutes.js";

routes.use('/pedidos', pedidoRoutes);
routes.use('/categorias', categoriaRoutes); // todas as rotas definidas em categoriaRoutes serão acessíveis a partir do caminho /categorias
routes.use('/produtos', produtoRoutes); 
routes.use('/clientes', clienteRoutes);

export default routes;