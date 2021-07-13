import { Router } from "express";

import CandidatoRoutes from "./resources/Candidato/Candidato.routes"

const router = Router();

router.use("/v1/candidatos", CandidatoRoutes);


export default router;