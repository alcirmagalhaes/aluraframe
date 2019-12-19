class NegociacaoController {
    constructor () {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();
        console.log(typeof(this._inputData.value));
        
        console.log(this._inputData.value);
        //a data é recebida no formato '2019-12-19' e a transformamos em ['2019','12','19'] para o construtor Date
        let data = new Date(this._inputData.value.split('-'));  
        console.log(data)
    }
  }