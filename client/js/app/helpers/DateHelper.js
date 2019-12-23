//classe estática
class DateHelper {
    constructor(){
        throw new Error('Esta classe não pode ser instânciada!');
    }
    static textoParaData(texto){
        if (!/^\d{4}-\d{2}-\d{2}$/.test(texto))
            throw new Error('Deve estar no formato  yyyy-mm-dd')
        return new Date(...texto.split('-').map((item,indice) => item - indice % 2));
    }

    static dataParaTexto(data){
        //template string
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;

    }
}