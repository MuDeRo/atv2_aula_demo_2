import { Cliente } from "../models/Cliente.js";
import { Endereco } from "../models/Endereco.js";
import { Telefone } from "../models/Telefone.js";
import clienteRepository from "../repositories/clienteRepository.js";
import { validarCpf } from "../utils/validarCpf.js";
import { limparNumeros } from "../utils/limparNumeros.js";
import axios from "axios";

const clienteController = {
    registrar: async (req, res) => {
        try {

            let { nome, cpf, cep, telefone, numero } = req.body;

            // console.log(cpf)
            cpf = limparNumeros(cpf);
            validarCpf(cpf);
            cep = limparNumeros(cep);
            telefone = limparNumeros(telefone);

            const API_CEP = `https://viacep.com.br/ws/${cep}/json/`;

            const respostaApi = await axios.get(API_CEP);

            if (respostaApi.data.erro) {
                return res.status(400).json({ message: 'CEP inválido' });
            }



            const dadosEndereco = {
                cep: cep,
                logradouro: respostaApi.data.logradouro,
                complemento: respostaApi.data.complemento,
                municipio: respostaApi.data.localidade,
                uf: respostaApi.data.uf,
                numero: numero

            }

            // console.log(cpf)

            const clienteClass = Cliente.criar({ nome, cpf });
            const telefoneClass = Telefone.criar({ telefone });
            const enderecoClass = Endereco.criar(dadosEndereco);

            

            const resultado = clienteRepository.criar(clienteClass, telefoneClass, enderecoClass);

            return res.status(201).json({resultado});


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro no server', error: error.message });
        }
    },

    editar: async (req, res) => {
        try {

            let {cep, telefone, numero} = req.body;
            const id = Number(req.query.id)


            cep = limparNumeros(cep);
            telefone = limparNumeros(telefone);

            const API_CEP = `https://viacep.com.br/ws/${cep}/json/`;

            const respostaApi = await axios.get(API_CEP);

            if (respostaApi.data.erro) {
                return res.status(400).json({ message: 'CEP inválido' });
            }


            const dadosEndereco = {
                cep: cep,
                logradouro: respostaApi.data.logradouro,
                complemento: respostaApi.data.complemento || null,
                municipio: respostaApi.data.localidade,
                uf: respostaApi.data.uf,
                numero: numero

            };

            const telefoneClass = Telefone.criar({ telefone });
            const enderecoClass = Endereco.criar(dadosEndereco);
            console.log(telefoneClass.idCliente, telefoneClass.telefone);
            
             
            const resultado = await clienteRepository.editar(telefoneClass, enderecoClass, id); 

            return res.status(200).json(resultado)
            
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