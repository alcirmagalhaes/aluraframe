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
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso';
        })
        .catch(error => this._mensagem.texto = error);  
    }

    /*
        service.obterNegociacoesDaSemana()
            .then(negociacoes => { 
                
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociações da semana obtidas com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaAnterior()
            .then(negociacoes => { 
                
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociações da semana anterior obtidas com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => { 
                
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociações da semana retrasada obtidas com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro);
    
    };
 */
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
       
       this._listaNegociacoes.esvazia();
       this._mensagem.texto = 'Lista de negociações apagada!';
       
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