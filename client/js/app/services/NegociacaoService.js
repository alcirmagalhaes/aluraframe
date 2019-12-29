class NegociacaoService {
    obterNegociacoesDaSemana(callback) {
        //AJAX com javascript puro -- sem usar JQuery
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        // configurações do xhr
        xhr.onreadystatechange = () => {
            
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {

                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                } else {
                    
                    console.log(xhr.responseText);
                    callback('Não foi possível obter as negociações.', null);
                }

            }
        }
        //executa
        xhr.send();
    }
}