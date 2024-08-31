import './utils/global.js'

import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());      

//utilizamos o rotas.js aqui.

const PORTA = process.env.PORTA;
servidor.listen(PORTA, () => console.log(`--> Api subiu na porta ${PORTA}`))