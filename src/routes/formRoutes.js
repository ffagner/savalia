import { Router } from "express";
import { getEscolas, showForm, submitForm } from "../controllers/formController.js";

const router = Router();

router.get("/", showForm);
router.get("/escolas", getEscolas);
router.post("/submit", submitForm);

export default router;