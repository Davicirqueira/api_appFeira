import conection from "./connection.js";

//Aqui no caso a visita é um objeto com as 3 propriedades necessárias.

export async function inserirVisita(visita){

    let comando = `
        insert into tb_visita (ds_qrcode, dt_visita, ds_sala)
            values(?,?,?);
    `

    let r = await conection.query (comando, [visita.qrcode, visita.data, visita.sala]);
    let info = r[0];

    let idVisita = info.insertId;

    return idVisita;

}

