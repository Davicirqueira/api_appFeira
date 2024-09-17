import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import QRCodeReader from 'qrcode-reader';
import conection from './src/repository/connection.js';
import * as Jimp from 'jimp';
import fs from 'fs';

const app = express();
app.use(bodyParser.json());


// Conexão com o banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '8823',  // Use a senha correta
    database: process.env.DB_NAME || 'QR_code'
});

// Rota para enviar o QR Code e salvar o conteúdo no banco de dados
app.post('/upload-qr', async (req, res) => {
    try {
        const qrImagePath = req.body.qrImagePath;

        // Carregar a imagem do QR Code
        const image = await Jimp.read(qrImagePath);
        const qr = new QRCodeReader();

        // Ler o QR Code
        qr.decode(image.bitmap, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao ler o QR Code', error: err });
            }

            const qrContent = result.result;

            // Inserir o conteúdo no banco de dados
            const query = 'INSERT INTO qr_codes (content) VALUES (?)';
            connection.query(query, [qrContent], (error, results) => {
                if (error) {
                    return res.status(500).json({ message: 'Erro ao salvar no banco de dados', error });
                }
                res.status(200).json({ message: 'QR Code salvo com sucesso!', qrContent });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});


app.use((req, res, next) => {
    console.log(`Requisição recebida: ${req.method} ${req.url}`);
    next();
  });
  

// Iniciar o servidor
const PORTA = process.env.PORTA ;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
