class ProxyFactory {
    static create(objeto, props, acao) {

        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if(props.includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    return function() {

                        console.log(`a propriedade "${prop}" foi interceptada`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);       
            }
        })
    }
}