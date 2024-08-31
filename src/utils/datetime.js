export function horaAtual(){

    let agr = new Date();

    let msg = agr.toLocaleDateString()  +  ' '  +  agr.toLocaleTimeString();

    return msg;

}