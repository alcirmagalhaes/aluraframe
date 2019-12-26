class ListaNegociacoes{
    constructor(armadilha){
      
        this._negociacoes = [];
        this._armadilha = armadilha;   
    }

    adiciona(negociacao) {
       
        this._negociacoes.push(negociacao);
        this._armadilha(this);
    }

    get negociacoes(){
        //programação defensiva, retorna uma cópia da lista de negociações 
        //para evitar a alterção da original.
        return [].concat(this._negociacoes);
    }

    esvazia() {

        this._negociacoes = [];
        this._armadilha(this);
    }
}