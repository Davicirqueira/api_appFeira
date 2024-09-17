import { Router } from 'express';
import { inserirVisita } from '../repository/visitaRepository.js';

const endpoints = Router();

app.post('/qrcode', async (req, res) => {
  try {
    const { ds_qrcode, ds_sala, dt_visita } = req.body;

    if (!ds_qrcode || !ds_sala || !dt_visita) {
      return res.status(400).send({ error: 'Dados do QR Code, sala ou data estão ausentes!' });
    }

    const [result] = await connection.execute(
      `insert into tb_visita (ds_qrcode, dt_visita, ds_sala) 
      values (?, ?, ?)`,
      [ds_qrcode, dt_visita, ds_sala]
    );
    
    res.send({ id: result.insertId });
  } catch (error) {
    console.error('Erro ao registrar visita:', error);
    res.status(500).send({ error: 'Erro ao inserir visita no banco de dados' });
  }
});

export default endpoints;
