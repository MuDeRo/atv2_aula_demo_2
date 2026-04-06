export class Categoria{ 
    #id;
    #nome;
    #descricao;
    #dataCad;
    

    constructor( pNome, pDescricao, pId ){
        this.nome = pNome; // utiliza o setter para validar o campo nome antes de atribuir o valor à propriedade privada #nome
        this.descricao = pDescricao;
        this.id = pId; // sempre que pode ter propriedades opcionais/nulos, é recomendado colocar no final do construtor
    }

    get nome(){
        return this.#nome;
    }

    set nome(value){ 
        this.#validarNome(value); // validação do campo nome antes de atribuir o valor à propriedade privada #nome
        this.#nome = value; // atribuição do valor à propriedade privada #nome
    }

    get descricao(){
        return this.#descricao;
    }

    get id(){
        return this.#id;
    }
    
    set descricao(value){
        this.#validarDescricao(value);
        this.#descricao = value; 
    }

    set id(value){
        this.#validarId(value);
        this.#id = value; 
    }

    #validarNome(value){
        if(!value || value.trim().length < 3 || value.trim().length > 45){
            throw new Error('O campo nome é obrigatório e deve conter entre 3 e 45 caracteres!');
        }
    }

    #validarDescricao(value){
        if(value && (value.trim().length < 5 || value.trim().length > 100)){
            throw new Error('O campo descrição deve conter entre 5 e 100 caracteres!');
        }
    }

    #validarId(value){ //valor não pode ser nulo
        if(value && value <= 0 ){
            throw new Error('O valor do ID não corresponde ao esperado!');
        }
    }


    // Design Pattern: Factory Method - método estático para criar um objeto da classe Categoria a partir de um objeto 
    static criar(dados){
        return new Categoria(dados.nome, dados.descricao, null); // o ID é gerado automaticamente pelo banco de dados, então passamos null para o construtor
    }

    static editar(dados, id){
        return new Categoria(dados.nome, dados.descricao, id); 
    }
}