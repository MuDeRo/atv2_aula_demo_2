import { Cliente } from "../models/Cliente.js";
import clienteRepository from "../repositories/clienteRepository.js";

const clienteController = {
    registrar: async (req, res) => {
        try {

            const {nome} = req.body;
            const cpf = String(req.body.cpf); // converte o CPF recebido na requisição para string

            const cliente = Cliente.criar({ nome, cpf }); // utiliza o método estático criar da classe Cliente para criar um objeto da classe Cliente a partir dos dados recebidos na requisição


            const resultado = await clienteRepository.criar(cliente);
            res.status(201).json(resultado);

        } catch (error) {

            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    editar: async (req, res) => {
        try {

            const id = Number(req.query.id); // converte o id recebido na query string para número
            const { nome } = req.body;

            const cliente = Cliente.editar({ nome }, id); //id é fora do objeto, pois é um campo opcional, que pode ser nulo, já que o método editar pode ser utilizado tanto para criar uma nova categoria (quando o id é nulo) quanto para editar uma categoria existente (quando o id é diferente de nulo)

            const resultado = await clienteRepository.editar(cliente); 

            res.status(200).json({resultado});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },


    deletar: async (req, res) => {
        try {

            const id = Number(req.params.id); // converte o id recebido na query string para número

            const resultado = await clienteRepository.deletar(id); 

            res.status(200).json({
                resultado
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    selecionar: async (req, res) => {
        try {

            const resultado = await clienteRepository.selecionar();

            res.status(200).json({
                resultado
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    }
}

export default clienteController;