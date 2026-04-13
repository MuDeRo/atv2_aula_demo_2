export class Cliente {
    #id;
    #nome;
    #cpf;
    #dataCad;

    constructor(pNome, pCpf, pDataCad, pId) {
        this.nome = pNome;
        this.cpf = pCpf;
        this.id = pId;
    };

    get nome() {
        return this.#nome;
    };

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    };

    get cpf() {
        return this.#cpf;
    };

    set cpf(value) {
        this.#validarCpf(value);
        this.#cpf = value;
    };


    get id() {
        return this.#id;
    };

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    };


    #validarNome(value) {
        if (value.length < 3) {
            throw new Error("O nome deve conter pelo menos 3 caracteres.");
        }
    };

    #validarCpf(value) {
        if (!value) {
            throw new Error("CPF é obrigatório.");
        }

    };

    #validarId(value) {
        if (value <= 0) {
            throw new Error("O ID deve ser um número positivo.");
        }
    };

    static criar(dados) {
        return new Cliente(dados.nome, dados.cpf, null);
    };

    static editar(dados, id) {
        return new Cliente(dados.nome, dados.cpf, id);
    };

}