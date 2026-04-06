// arquivo da classe de configuração do banco de dados
import mysql from 'mysql2/promise';
import 'dotenv/config';


// Padrão de projeto utilizado na classe de conexão com o banco de dados: SINGLETON
class Database {

    static #intance = null; // não precisamos criar um objeto da classe para acessar a conexão com o banco de dados, pois a conexão é estática
    #pool = null;

    #createPool() { // método privado para criar a conexão com o banco de dados
        this.#pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            waitForConnections: true, // espera a conexão ser liberada para ser utilizada
            connectionLimit: 100, // número máximo de conexões simultâneas
            queueLimit: 0 // número máximo de conexões na fila (0 = ilimitado)
        });

    }

    static getInstance() {
        if (!Database.#intance) {
            Database.#intance = new Database(); // se a instância da classe não existir, cria uma nova instância
            Database.#intance.#createPool(); // cria a conexão com o banco de dados
        }
        return Database.#intance; // retorna a instância da classe
    }

    getPool() {
        return this.#pool; // retorna a conexão com o banco de dados
    }
}

export const connection = Database.getInstance().getPool(); // exporta a conexão com o banco de dados para ser utilizada em outros arquivos




