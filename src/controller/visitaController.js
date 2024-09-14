import { Router } from "express";
const endpoints = Router()
import { inserirVisita } from "../repository/visitaRepository.js";

//Aqui vão ficar os endpoints e/ou o endpoint de visita.

 endpoints.post('/qrcode',  async (req, resp) => {

    let qrcode = req.body;

    let id =  await inserirVisita(qrcode)

    resp.send({
        id:id
    })
})




export default endpoints;