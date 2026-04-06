export class Telefone {
    #id;
    #idCliente;
    #telefone;

    constructor(pIdCliente, pTelefone, pId) {
        this.idCliente = pIdCliente;
        this.telefone = pTelefone;
        this.id = pId;
    };

    get idCliente() {
        return this.#idCliente;
    };

    set idCliente(value) {
        this.#validarIdCliente(value);
    };

    get telefone() {
        return this.#telefone;
    };

    set telefone(value) {
        this.#validarTelefone(value);
        this.#telefone = value;
    };

    get id() {
        return this.#id;
    };

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    };

    #validarIdCliente(value) {
        if (value <= 0) {
            throw new Error("O ID do cliente deve ser um número positivo.");
        }
    };


    #validarTelefone(value) {
        if (!value) {
            throw new Error("Telefone é obrigatório.");
        }

        // remove tudo que não for número
        const telefone = value.replace(/\D/g, '');

        // valida tamanho (com DDD: 10 ou 11 dígitos)
        if (telefone.length < 10 || telefone.length > 11) { 
            throw new Error("Telefone deve conter DDD e ter 10 ou 11 dígitos.");
        }

        // valida DDD (não pode começar com 0)
        const ddd = telefone.substring(0, 2);
        if (ddd.startsWith("0")) {
            throw new Error("DDD inválido.");
        }

        // valida se é celular (11 dígitos começa com 9)
        if (telefone.length === 11) {
            const primeiroDigito = telefone.substring(2, 3);
            if (primeiroDigito !== "9") {
                throw new Error("Celular inválido.");
            }
        }

        // valida se todos os números são iguais (ex: 99999999999)
        if (/^(\d)\1+$/.test(telefone)) {
            throw new Error("Telefone inválido.");
        }
    };


    #validarId(value) {
        if (value <= 0) {
            throw new Error("O ID deve ser um número positivo.");
        }
    };

    static criar(dados) {
        return new Telefone(dados.idCliente, dados.telefone, null);
    };

    static editar(dados, id) {
        return new Telefone(dados.idCliente, dados.telefone, id);
    };

}