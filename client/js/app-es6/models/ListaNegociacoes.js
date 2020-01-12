class ListaNegociacoes{
    constructor(){
      
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        //gambiarra para funcionar (baixa performance)
        //this._negociacoes = [].concat(this._negociacoes, negociacao);
        this._negociacoes.push(negociacao);
    }

    esvazia() {

        this._negociacoes = [];
    }
    
    get negociacoes(){
        //programação defensiva, retorna uma cópia da lista de negociações 
        //para evitar a alterção da original.
        return [].concat(this._negociacoes);
    }

    get volumeTotal() {
        
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }

    ordena(criterio) {
        
        this._negociacoes.sort(criterio);
    }

    inverteOrdem() {
        this._negociacoes.reverse();
    }
    
}