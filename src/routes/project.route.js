import { Router } from "express";
import { getProject, createProject, updateProject, deleteProject, getOneProject} from "../controllers/project.controller.js";

const router = Router();

router.get('/projects', getProject);
router.get('/projects/:id', getOneProject);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);


export default router;