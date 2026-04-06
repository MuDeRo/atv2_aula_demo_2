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

        // remove tudo que não for número
        const cpf = value.replace(/\D/g, '');

        if (cpf.length !== 11) {
            throw new Error("CPF deve conter 11 dígitos.");
        }

        // elimina CPFs inválidos conhecidos (ex: 11111111111)
        if (/^(\d)\1{10}$/.test(cpf)) {
            throw new Error("CPF inválido.");
        }

        let soma = 0;
        let resto;

        // 1º dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i); //multiplica cada dígito pelos pesos decrescentes de 10 a 2
        }

        resto = (soma * 10) % 11; //calcula o resto da divisão da soma multiplicada por 10 por 11

        if (resto === 10 || resto === 11) resto = 0; //se o resto for 10 ou 11, considera-se 0

        if (resto !== parseInt(cpf.substring(9, 10))) { //compara o resultado com o 10º dígito do CPF
            throw new Error("CPF inválido.");
        }

        // 2º dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) { 
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i); //multiplica cada dígito pelos pesos decrescentes de 11 a 2
        }

        resto = (soma * 10) % 11; 
        if (resto === 10 || resto === 11) resto = 0;

        if (resto !== parseInt(cpf.substring(10, 11))) {
            throw new Error("CPF inválido.");
        }

    };

    #validarId(value) {
        if (value <= 0) {
            throw new Error("O ID deve ser um número positivo.");
        }
    };

    static criar(dados) {
        return new Cliente(dados.nome, dados.cpf, dados.dataCad, null);
    };

    static editar(dados, id) {
        return new Cliente(dados.nome, dados.cpf, dados.dataCad, id);
    };

}