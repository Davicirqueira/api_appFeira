import conection from "./connection.js";

export const inserirVisita = async (qrcode) => {
    try {
      const { ds_qrcode, ds_sala, dt_visita } = qrcode;
      const [result] = await conection.execute(
        'INSERT INTO tb_visita (ds_qrcode, dt_visita, ds_sala) VALUES (?, ?, ?)',
        [ds_qrcode, dt_visita, ds_sala]
      );
      return result.insertId; // Retorna o ID do registro inserido
    } catch (error) {
      console.error('Erro ao inserir visita no banco de dados:', error);
      throw error; 
    }
  };

