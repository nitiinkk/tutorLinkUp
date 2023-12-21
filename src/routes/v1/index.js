import express from 'express';
const router = express.Router();
import { login } from '../../controllers/auth-controller.js';
import { validateJwt, isTutor } from '../../middlewares/validate-auth.js';
import { deleteStudent, createStudent, enrollUser, updateStudent } from '../../controllers/user-controller.js';
import { createClasses, getClassesFeed } from '../../controllers/classes-controller.js';
import { createFiles, updateFiles, deleteFiles, getFilesFeed } from '../../controllers/file-controller.js';

//login route
router.post('/login', login);

//crud operation for student
router.post('/students', validateJwt, isTutor, createStudent, enrollUser);
router.put('/students/:username', validateJwt, isTutor, updateStudent);
router.delete('/students/:username', validateJwt, isTutor, deleteStudent);

//classes endpoint
router.post('/createClasses', validateJwt, isTutor, createClasses);

//crud for files
router.post('/files', validateJwt, isTutor, createFiles);
router.put('/files/:fileId', validateJwt, isTutor, updateFiles);
router.delete('/files/:fileId', validateJwt, isTutor, deleteFiles);

//pagination
router.get('/classesfeed', validateJwt, getClassesFeed);

router.get('/filesfeed', validateJwt, getFilesFeed);


export default router;