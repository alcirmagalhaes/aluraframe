class HttpService {

    _handleErrors(res) {
       
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }
    get (url) {

       url = 'xxx'; 
       return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());

/*         return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            
            xhr.onreadystatechange = () => {
                
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
    
                        resolve(JSON.parse(xhr.responseText));
                    } else {
    
                        reject(xhr.responseText);
                    }
    
                }
            }
            xhr.send();
        }) */
    }

    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
        });

    }
}