import { Router } from 'express';
import { inserirVisita } from '../repository/visitaRepository.js';

const endpoints = Router();

endpoints.post('/qrcode', async (req, resp) => {
  try {
    let qrcode = req.body; // Recebe os dados do QR Code enviados no corpo da requisição

    // Validação básica para garantir que os dados necessários estão presentes
    if (!qrcode.ds_qrcode || !qrcode.ds_sala) {
      return resp.status(400).send({ error: 'Dados do QR Code ou sala estão ausentes!' });
    }

    // Insere os dados no banco de dados
    let id = await inserirVisita(qrcode);

    // Envia a resposta com o ID da visita inserida
    resp.send({ id: id });
  } catch (error) {
    console.error('Erro ao inserir visita:', error);
    resp.status(500).send({ error: 'Erro ao inserir visita no banco de dados' });
  }
});







export default endpoints;