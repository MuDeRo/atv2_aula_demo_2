import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {
    registrar: async (req, res) => {
        try {

            
            const nome = String(req.body.nome);

            const idCategoria = Number(req.body.idCategoria); // converte o id da categoria recebido na requisição para número
            const valor = Number(req.body.valor); // converte o preço recebido na requisição para número
            const caminhoImage = `/uploads/image/${req.file.filename}`;

            

            const produto = Produto.criar({ idCategoria, nome, valor, caminhoImage }); // utiliza o método estático criar da classe Produto para criar um objeto da classe Produto a partir dos dados recebidos na requisição

            console.log({ idCategoria, nome, valor, caminhoImage });
            console.log(produto);

            const resultado = await produtoRepository.criar(produto);
            res.status(201).json(resultado);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },


    editar: async (req, res) => {
        try {

            const id = Number(req.query.id); // converte o id recebido na query string para número
            const { nome, valor } = req.body;

            const produto = Produto.editar({ nome, valor }, id); //id é fora do objeto, pois é um campo opcional, que pode ser nulo, já que o método editar pode ser utilizado tanto para criar uma nova categoria (quando o id é nulo) quanto para editar uma categoria existente (quando o id é diferente de nulo)

            const resultado = await produtoRepository.editar(produto); 

            res.status(200).json({
                resultado
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Erro no server',
                error: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {

            const id = Number(req.params.id); // converte o id recebido na query string para número

            const resultado = await produtoRepository.deletar(id); 

            res.status(200).json({
                resultado
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Erro no server',
                error: error.message
            });
        }
    },


    selecionar: async (req, res) => {
        try {

            const resultado = await produtoRepository.selecionar();

            res.status(200).json({
                resultado
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Erro no server',
                error: error.message
            });
        }
    }

}

export default produtoController;