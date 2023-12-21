import FileService from '../services/file-service.js';
const fileService = new FileService();

export const createFiles = async (req, res, next) => {
    try {
        const fileDetails = await fileService.create(req, {
            uploaded_by: req.authorisedUser
        });
        return res.json({
            success: true,
            message: "File Uploaded Successfully",
            data: fileDetails,
            err: {}
        });
    } catch (error) {
        next(error);
    }
}

export const deleteFiles = async (req, res, next) => {
    try {
        const response = await fileService.delete({ fileId: req.params.fileId, uploaded_by: req.authorisedUser });
        return res.json({
            success: true,
            message: `File ${response.filename} Deleted succesfully from class ${response.class_uuid}`,
            data: [],
            err: {}
        });
    } catch (error) {
        next(error);
    }
}

export const updateFiles = async (req, res, next) => {
    try {
        const response = await fileService.update({
            filename: req.body.filename,
            fileId: req.params.fileId,
            uploaded_by: req.authorisedUser
        });
        return res.json({
            success: true,
            message: "File updated succesfully",
            data: response,
            err: {}
        });
    } catch (error) {
        next(error);
    }
}

export const getFilesFeed = async (req, res, next) => {
    try {
        const response = await fileService.getFeed({
            username: req.authorisedUser,
            page: req.query.page,
            title: req.query.title,
            type: req.query.type
        });
        return res.json({
            success: true,
            message: "File Feed retrieved succesfully",
            data: response,
            err: {}
        });
    } catch (error) {
        next(error);
    }
}