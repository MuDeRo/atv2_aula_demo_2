import { connection } from "../configs/Database.js";

const clienteRepository = {
    criar: async (cliente) => {
        const sql = 'INSERT INTO clientes (nome, cpf) VALUES (?,?)';
        const values = [cliente.nome, cliente.cpf];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    editar: async (cliente) => {
        const sql = 'UPDATE clientes SET nome = ? WHERE id = ?';
        const values = [cliente.nome, cliente.id];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM clientes WHERE id = ?';
        const values = [id];
        const [rows] = await connection.execute(sql, values);
        return rows;
    }

}

export default clienteRepository;