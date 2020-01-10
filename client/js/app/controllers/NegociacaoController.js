class NegociacaoController {
    constructor () {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind (
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
        
        this._ordemAtual = '';

        ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                    negociacoes.forEach(negociacao => 
                            this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            })

/*      outra forma de se buscar as negociaçoes durante o carregamento da pagina 
        ConnectionFactory
            .getConnection()
            .then(conexao => {
                new NegociacaoDao(conexao)
                    .listaTodos()
                    .then(negociacoes => {
                        negociacoes.forEach(negociacao =>{

                            this._listaNegociacoes.adiciona(negociacao);
                        })
                    })
            })
*/            
    }

    adiciona(event) {

        event.preventDefault();
        ConnectionFactory.getConnection()
        .then(conexao => {
            let negociacao = this._criaNegociacao();
            new NegociacaoDao(conexao)
            .adiciona(negociacao)
            .then(() =>{
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociação adicionada com sucesso!'
                this._limpaFormulario();  
            }) 
        })
        .catch(erro => this._mensagem.texto = erro);
        
/*      Código antigo, onde só atualizava a pagina  
        try {
            
            event.preventDefault();
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociação adicionada com sucesso!'
            this._limpaFormulario();    
        }catch(erro) {
            this._mensagem.texto = erro;
        };
*/
    }

    importaNegociacoes() {
                          
        let service = new NegociacaoService();
        service
        .obterNegociacoes()
        .then(negociacoes => 
            negociacoes.filter(negociacao =>  
                this._listaNegociacoes.negociacoes.indexOf(negociacao) == -1)
        )
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso';
        })
        .catch(error => this._mensagem.texto = error);  
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
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    apaga() {
       
        ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {

                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
       
    }

    ordena(coluna) {
        
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);//ordem crescente
        }
        this._ordemAtual = coluna;
    }
}