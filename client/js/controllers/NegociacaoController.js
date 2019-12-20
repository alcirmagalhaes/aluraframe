class NegociacaoController {
    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();
        
        //com o split funciona perfeitamente (pois ele transfroma a data em um 
        //array de 3 elementos ['YYYY', 'MM', 'DD'], e o construtor Date 
        //trabalha perfeitamente com este array)
        let data1 = new Date(
            this._inputData.value.split('-')
        );
        console.log(data1);
        console.log(data1)
        console.log('----');
        //Utilizando programação funciomal
        let data = new Date(
            //O split cria o array ['yyyy', 'mm','dd']
            //O map varre o array retornado pelo split e decrementa o mês (indice = 1) em uma unidade e retorna um novo array
            //O '...' é chamado de spread operator e ele desmembra o array em YYYY MM DD
            ...this._inputData.value
                .split('-')
                .map(function(item, indice){
                    return item - indice % 2; // como o vetor só tem três posiçoes isto dá certo para decrementar apenas o mês
                })
        );
        console.log(data);
        console.log(data);

        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        )
        console.log(negociacao);

    }
  }