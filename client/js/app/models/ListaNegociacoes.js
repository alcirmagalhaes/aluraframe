class ListaNegociacoes{
    constructor(){
      
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        //gambiarra para funcionar (baixa performance)
        this._negociacoes = [].concat(this._negociacoes, negociacao);
        //this._negociacoes.push(negociacao);
    }

    get negociacoes(){
        //programação defensiva, retorna uma cópia da lista de negociações 
        //para evitar a alterção da original.
        return [].concat(this._negociacoes);
    }

    esvazia() {

        this._negociacoes = [];
    }
}