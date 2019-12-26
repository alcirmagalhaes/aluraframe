class ListaNegociacoes{
    constructor(contexto, armadilha){
        this._negociacoes = [];
        this._armadilha = armadilha;   
        this._contexto = contexto;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        //this._armadilha(this);
        Reflect.apply(this._armadilha, this._contexto,[this]);
    }

    get negociacoes(){
        //programação defensiva, retorna uma cópia da lista de negociações 
        //para evitar a alterção da original.
        return [].concat(this._negociacoes);
    }

    esvazia() {

        this._negociacoes = [];
        //this._armadilha(this);
        Reflect.apply(this._armadilha, this._contexto,[this]);
    }
}