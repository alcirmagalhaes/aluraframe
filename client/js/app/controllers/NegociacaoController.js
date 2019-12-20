class NegociacaoController {
    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();
        let helper = new DateHelper();
        let data = helper.textoParaData(this._inputData.value);
        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        )
        console.log(negociacao);
        //fazer a data ser exibina no formato dd/mm/yyyy
        let diaMesAno = helper.dataParatexto(data)
        console.log(diaMesAno); 
    }
  }