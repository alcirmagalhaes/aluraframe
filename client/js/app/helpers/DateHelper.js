//classe estática
class DateHelper {
    constructor(){
        throw new Error('Esta classe não pode ser instânciada!');
    }
    static textoParaData(texto){
        if (!/\d{2}\/\d{2}\/\d{4}/.test(texto))
            throw new Error('Deve estar no formato  dd/mm/yyyy')
        return new Date(...texto
                            .split('/')
                            .reverse()
                            .map((item,indice) => item - indice % 2)
                        );
    }

    static dataParaTexto(data){
        //template string
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;

    }
}