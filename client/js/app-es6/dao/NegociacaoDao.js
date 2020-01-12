import {Negociacao} from "../models/Negociacao";

export class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {
                resolve();
            };
            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possivel adicionar a negociacao')
            };
        })
    }

    listaTodos() {

        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
            
            let negociacoes =[];

            cursor.onsuccess = e => {
                //atual é um ponteiro para o registro que se esta lendo
                let atual = e.target.result;

                if (atual){
                    //dado é o valor para o qual o ponteiro está apontando. 
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor))
                    //vai para o próximo registro.
                    atual.continue();
                } else {
                    
                    resolve(negociacoes);
                }

            }

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possivel recuperar as negociações.')
            }
        })
    }

    apagaTodos(){

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();
            
            request.onsuccess = e => resolve('Negociações apagadas com sucesso');
            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar as negociações');
            }
        })
    }
}