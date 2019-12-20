class DateHelper {
    textoParaData(texto){
        return new Date(...texto.split('-').map((item,indice) => item - indice % 2));
    }

    dataParatexto(data){
        return data.getDate()
            + '/' + (data.getMonth() + 1)
            + '/' + data.getFullYear();
    }
}