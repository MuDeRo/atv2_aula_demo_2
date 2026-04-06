export class Endereco {
    #id;
    #idCliente;
    #cep;
    #logradouro;
    #complemento;
    #municipio;
    #uf;

    constructor(pIdCliente, pCep, pLogradouro, pComplemento, pMunicipio, pUf, pId) {
        this.idCliente = pIdCliente;
        this.cep = pCep;
        this.logradouro = pLogradouro;
        this.complemento = pComplemento;
        this.municipio = pMunicipio;
        this.uf = pUf;
        this.id = pId;
    }

    get idCliente() {
        return this.#idCliente;
    };

    set idCliente(value) {
        this.#validarIdCliente(value);
    };

    get cep() {
        return this.#cep;
    };

    set cep(value) {
        this.#validarCep(value);
        this.#cep = value;
    };

    get logradouro() {
        return this.#logradouro;
    };

    set logradouro(value) {
        this.#validarLogradouro(value);
        this.#logradouro = value;
    };

    get complemento() {
        return this.#complemento;
    };

    set complemento(value) {
        this.#validarComplemento(value);
        this.#complemento = value;
    };

    get municipio() {
        return this.#municipio;
    };

    set municipio(value) {
        this.#validarMunicipio(value);
        this.#municipio = value;
    };

    get uf() {
        return this.#uf;
    };

    set uf(value) {
        this.#validarUf(value);
        this.#uf = value;
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

    #validarCep(value) {
        if (!value) {
            throw new Error("CEP é obrigatório.");
        }
    };

    #validarLogradouro(value) {
        if (!value) {
            throw new Error("Logradouro é obrigatório.");
        }
    };

    #validarComplemento(value) {
        if (!value) {
            throw new Error("Complemento é obrigatório.");
        }
    };

    #validarMunicipio(value) {
        if (!value) {
            throw new Error("Município é obrigatório.");
        }
    };

    #validarUf(value) {
        if (!value || value.length !== 2) {
            throw new Error("UF é obrigatório e deve conter 2 caracteres!");
        }
    };

    #validarId(value) {
        if (value <= 0) {
            throw new Error("O ID deve ser um número positivo.");
        }
    };

    static criar(dados) {
        return new Endereco(
            dados.idCliente,
            dados.cep,
            dados.logradouro,
            dados.complemento,
            dados.municipio,
            dados.uf, 
            null
        );
    };

    static editar(dados, id) {
        return new Endereco(
            dados.idCliente,
            dados.cep,
            dados.logradouro,
            dados.complemento,
            dados.municipio,
            dados.uf, 
            id
        );
    };

}