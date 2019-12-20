class NegociacaoController {
    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();
        let data = DateHelper.textoParaData(this._inputData.value);
        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        )
        console.log(negociacao);
        //fazer a data ser exibina no formato dd/mm/yyyy
        let diaMesAno = DateHelper.dataParatexto(data)
        console.log(diaMesAno); 
    }
  }