import ClassesService from '../services/classes-service.js';
const classesService = new ClassesService();
import { v4 as uuidv4 } from 'uuid';

export const createClasses = async (req, res, next) => {
    try {
        const classDetails = await classesService.create({
            name: req.body.name,
            class_uuid: uuidv4(),
            description: req.body.description,
            authorisedUser: req.authorisedUser
        });
        return res.json({
            success: true,
            message: "Class created succesfully",
            data: classDetails,
            err: {}
        });
    } catch (error) {
        next(error);
    }
}

export const getClassesFeed = async (req, res, next) => {
    try {
        const classesFeed = await classesService.getFeed({
            authorisedUser: req.authorisedUser,
            page: req.query.page
        });
        return res.json({
            success: true,
            message: "Class feed fetched succesfully",
            data: classesFeed,
            err: {}
        });
    } catch (error) {
        next(error);
    }
}