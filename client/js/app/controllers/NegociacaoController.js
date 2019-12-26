class NegociacaoController {
    constructor () {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new ListaNegociacoes(model =>
            this._negociacoesView.update(model));
            
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {

        event.preventDefault();
        const negociacao = this._criaNegociacao();
        this._listaNegociacoes.adiciona(negociacao);
        
        this._mensagem.texto = 'Negociação adicionada com sucesso!'
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();    
        //console.log(this._listaNegociacoes.negociacoes); 
    }
 
    _limpaFormulario(){
 
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
        
    }
 
    _criaNegociacao(){
 
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        
        this._mensagem.texto = 'Lista de negociações apagada!';
        this._mensagemView.update(this._mensagem);
    }
  }