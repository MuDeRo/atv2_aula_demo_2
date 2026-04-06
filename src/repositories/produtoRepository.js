import { connection }  from "../configs/Database.js";

const produtoRepository = {
    criar: async (produto) => {
        const sql = 'INSERT INTO produtos (id_categoria, nome, valor, caminho_image) VALUES (?,?,?,?)';
        const values = [produto.idCategoria, produto.nome, produto.valor, produto.caminhoImage];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    editar: async (produto) => {
        const sql = 'UPDATE produtos SET nome = ?, valor = ? WHERE id = ?';
        const values = [produto.nome, produto.valor, produto.id];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM produtos WHERE id = ?';
        const values = [id];
        const [rows] = await connection.execute(sql, values);
        return rows;
    }

}

export default produtoRepository;