export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #caminhoImage;
    #dataCad;

    constructor(pIdCategoria, pNome, pValor, pCaminhoImage, pId) {
        this.idCategoria = pIdCategoria;
        this.nome = pNome;
        this.valor = pValor;
        this.caminhoImage = pCaminhoImage;
        this.id = pId;
    }

    get idCategoria() {
        return this.#idCategoria;
    }

    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get valor() {
        return this.#valor;
    }

    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }

    get caminhoImage() {
        return this.#caminhoImage;
    }

    set caminhoImage(value) {
        this.#validarCaminhoImage(value);
        this.#caminhoImage = value;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    #validarIdCategoria(value) { //valor não pode ser nulo
        if (value <= 0) {
            throw new Error('O valor do ID da categoria não corresponde ao esperado!');
        }
    }

    #validarNome(value) {

        if (!value || value.trim().length < 3 || value.trim().length > 45) {

            throw new Error('O campo nome é obrigatório e deve conter entre 3 e 45 caracteres!');
        }

    }

    #validarValor(value) {
        if (value <= 0) {
            throw new Error('O campo valor é obrigatório e deve ser maior que zero!');
        }
    }

    #validarCaminhoImage(value) {
        if (value && (value.trim().length < 5 || value.trim().length > 250)) {
            throw new Error('O campo caminho da imagem deve conter entre 5 e 250 caracteres!');
        }
    }

    #validarId(value) { //valor não pode ser nulo
        if (value && value <= 0) {
            throw new Error('O valor do ID não corresponde ao esperado!');
        }
    }


    static criar(dados) {
        return new Produto(dados.idCategoria, dados.nome, dados.valor, dados.caminhoImage, null); //id é nulo, pois o banco de dados irá gerar um id automático para o produto criado
    }

    static editar(dados, id) {
        return new Produto(dados.idCategoria, dados.nome, dados.valor, dados.caminhoImage, id);
    }

    
}