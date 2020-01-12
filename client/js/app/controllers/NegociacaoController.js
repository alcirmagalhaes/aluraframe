'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';

        this._service = new NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                console.log(erro);
                _this._mensagem.texto = erro;
            });

            /* este bloco foi para o negociacaoService, para a lista ser gera por lá
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
             */

            setInterval(function () {

                _this.importaNegociacoes();
            }, 5000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();
            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {

                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
            /*      este blco foi para o NegociacaoService
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
            */
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                negociacoes.forEach(function (negociacao) {
                    return _this3._listaNegociacoes.adiciona(negociacao);
                });
                _this3._mensagem.texto = 'Negociações do período importadas com sucesso';
            }).catch(function (error) {
                return _this3._mensagem.texto = error;
            });
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {

            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0;
            this._inputData.focus();
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {

            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this4 = this;

            this._service.apaga().then(function (mensagem) {

                _this4._mensagem.texto = mensagem;
                _this4._listaNegociacoes.esvazia();
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });

            /* ConnectionFactory
                .getConnection()
                .then(conexao => new NegociacaoDao(conexao))
                .then(dao => dao.apagaTodos())
                .then(mensagem => {
                      this._mensagem.texto = mensagem;
                    this._listaNegociacoes.esvazia();
                }) 
            */
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {

            if (this._ordemAtual == coluna) {
                this._listaNegociacoes.inverteOrdem();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                }); //ordem crescente
            }
            this._ordemAtual = coluna;
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map