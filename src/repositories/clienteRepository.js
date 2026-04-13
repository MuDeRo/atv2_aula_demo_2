import { connection } from "../configs/Database.js";
// pool de conexão não permite transaction, então criar outras conexão

const clienteRepository = {
    criar: async (cliente, telefone, endereco) => { // transação para garantir que cliente, telefone e endereço sejam criados juntos

        const conn = await connection.getConnection(); //nova conexão para transação

        try {
            await conn.beginTransaction();

            const sqlCliente = 'INSERT INTO clientes (nome, cpf) VALUES (?,?)';
            const valuesCliente = [cliente.nome, cliente.cpf];
            const [rowsCliente] = await conn.execute(sqlCliente, valuesCliente);


            const sqlTelefone = 'INSERT INTO telefones (id_cliente, telefone) VALUES (?,?)';
            const valuesTelefone = [rowsCliente.insertId, telefone.telefone]; // usar o id do cliente criado para associar o telefone
            const [rowsTelefone] = await conn.execute(sqlTelefone, valuesTelefone);

            console.log(rowsCliente.insertId, endereco.cep, endereco.logradouro, endereco.complemento, endereco.municipio, endereco.uf, endereco.numero)
            const sqlEndereco = 'INSERT INTO enderecos (id_cliente, cep, logradouro, complemento, municipio, uf, numero) VALUES (?,?,?,?,?,?,?)';
            const valuesEndereco = [rowsCliente.insertId, endereco.cep, endereco.logradouro, endereco.complemento, endereco.municipio, endereco.uf, endereco.numero];
            const [rowsEndereco] = await conn.execute(sqlEndereco, valuesEndereco);

            conn.commit();
            return { rowsCliente, rowsTelefone, rowsEndereco };

        } catch (error) {

            conn.rollback(); // desfaz as operações caso ocorra algum erro
            throw new Error(error);

        } finally {
            conn.release();
        }
    },

    editar: async (telefone, endereco, id) => {

        const conn = await connection.getConnection();

        try {

            conn.beginTransaction();

            console.log(telefone.telefone, id)
            const sqlTelefone = 'UPDATE telefones SET telefone = ? WHERE id_cliente = ?';
            const valuesTelefone = [telefone.telefone, id];
            const [rowsTelefone] = await conn.execute(sqlTelefone, valuesTelefone);
            // return rowsTelefone;

            const sqlEndereco = 'UPDATE enderecos SET cep = ?, logradouro = ?, complemento = ?, municipio = ?, uf = ?, numero = ? WHERE id_cliente = ?';
            const valuesEndereco = [endereco.cep, endereco.logradouro, endereco.complemento, endereco.municipio, endereco.uf, endereco.numero, id];
            const [rowsEndereco] = await conn.execute(sqlEndereco, valuesEndereco);


            conn.commit();
            return { rowsTelefone, rowsEndereco };

        } catch (error) {
            conn.rollback();
            throw new Error(error);
        }
        finally {
            conn.release();
        }
    },

    selecionar: async () => {
        const sql = 'select c.id, c.nome, c.cpf, t.telefone, e.cep, e.logradouro, e.complemento, e.municipio, e.uf, e.numero from clientes as c inner join telefones as t on c.id = t.id_cliente inner join enderecos as e on c.id = e.id_cliente';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    deletar: async (id) => {
        const conn = await db.getConnection();

        try {
            await conn.beginTransaction();

            const sqlEndereco = 'DELETE FROM enderecos WHERE id_cliente=?;';
            const valuesEndereco = [id];
            const [rowsEndereco] = await db.execute(sqlEndereco, valuesEndereco);

            const sqlTelefone = 'DELETE FROM telefones WHERE id_cliente=?;';
            const valuesTelefone = [id];
            const [rowsTelefone] = await db.execute(sqlTelefone, valuesTelefone);

            const sqlCliente = 'DELETE FROM clientes WHERE id=?;';
            const valuesCliente = [id];
            const [rowsCliente] = await db.execute(sqlCliente, valuesCliente);

            await conn.commit();

            return { rowsTelefone, rowsEndereco, rowsCliente};

        } catch (error) {
            await conn.rollback();
            throw new Error(error.message);

        } finally {
            conn.release();
        }
    }
}



export default clienteRepository;