

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import visitaController from './controller/visitaController.js'

const app = express();
app.use(express.json());
app.use(cors());      

app.use(visitaController);

//utilizamos o rotas.js aqui.
const PORTA = process.env.PORTA
app.listen(PORTA, () => console.log(`--> Api subiu na porta ${PORTA}`))