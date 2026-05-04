
export class Pedido{
    #id;
    #idCliente;
    #subtotal;
    #status;
    #dataCad;

    //constructor
    constructor(pIdCliente, pSubTotal, pStatus, pId){
        this.idCliente = pIdCliente;
        this.subTotal = pSubTotal;
        this.status = pStatus;
        this.id = pId;
    }

    //getters
    get id(){
        return this.#id;
    }

    get idCliente(){
        return this.#idCliente;
    }

    get subTotal(){
        return this.#subtotal;
    }

    get status(){
        return this.#status;
    }

    

    //setters

    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    set idCliente(value){
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    set subTotal(value){
        this.#validarSubTotal(value);
        this.#subtotal = value;
    }

    set status(value){
        this.#validarStatus(value);
        this.#status = value;
    }

    //metodos auxiliares
    #validarId(value){
        if(value <= 0 && value){
            throw new Error("Verifique o id inserido!");
        }
    }

    #validarIdCliente(value){
        if(value <= 0 && value){
            throw new Error("Verifique o id do cliente inserido!");
        }
    }

    #validarSubTotal(value){
        console.log(value);
        
        if(value < 0 || !value){
            throw new Error("Verifique o valor do subtotal inserido!");
        }
    }

    #validarStatus(value){
        if(!value){
            throw new Error("Verifique o status inserido!");
        }
    }

    //design pattern 
    static criar(dados){
        console.log(dados.idCliente, dados.subTotal, dados.status);
        
        return new Pedido(dados.idCliente, dados.subTotal, dados.status, null);
    }

    static editar(dados){
        return new Pedido(dados.idCliente, dados.subTotal, dados.status, dados.id);
    }
}