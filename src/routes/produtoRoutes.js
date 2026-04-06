import { Router } from 'express';
import produtoController from '../controllers/produtoController.js';
import uploadImage from '../middlewares/uploadImage.js';

const produtoRoutes = Router();

produtoRoutes.post('/', uploadImage, produtoController.registrar);
produtoRoutes.put('/', produtoController.editar);
produtoRoutes.delete('/:id', produtoController.deletar);
produtoRoutes.get('/', produtoController.selecionar);

export default produtoRoutes;