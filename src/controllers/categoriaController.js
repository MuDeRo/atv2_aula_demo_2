import { Categoria } from "../models/Categoria.js";
import categoriaRepository from "../repositories/cetegoriaRepository.js";

const categoriaController = {

    registrar: async (req, res) => {
        try {

            const { nome, descricao } = req.body;
            const categoria = Categoria.criar({ nome, descricao }); // utiliza o método estático criar da classe Categoria para criar um objeto da classe Categoria a partir dos dados recebidos na requisição

            const resultado = await categoriaRepository.criar(categoria); // chama o método criar do repositório para inserir a categoria no banco de dados

            res.status(201).json({
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

    editar: async (req, res) => {
        try {

            const id = Number(req.query.id); // converte o id recebido na query string para número
            const { nome, descricao } = req.body;

            const categoria = Categoria.editar({ nome, descricao}, id); //id é fora do objeto, pois é um campo opcional, que pode ser nulo, já que o método editar pode ser utilizado tanto para criar uma nova categoria (quando o id é nulo) quanto para editar uma categoria existente (quando o id é diferente de nulo)

            const resultado = await categoriaRepository.editar(categoria); 

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

            const resultado = await categoriaRepository.deletar(id); 

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

            const resultado = await categoriaRepository.selecionar();

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
}


export default categoriaController;