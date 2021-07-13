import { Router } from "express";

import CandidatoController from "./Candidato.controller";


const router = Router();


router.get("/", CandidatoController.listarCandidatos);
router.get("/cpf", CandidatoController.buscarCandidatoCPF);
router.post("/", CandidatoController.receberListaCandidatos);


export default router;