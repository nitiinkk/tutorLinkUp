import { dbConnection as db } from "../config/database.js";
import { NotFoundError, DataError, DatabaseError } from '../utils/errorHandler.js';
import formidable, { errors as formidableErrors } from 'formidable';

class UserService {
    constructor() {
    }

    async saveFileToDisk(req) {
        const form = formidable({});
        let fields;
        let files;
        let response = {};
        try {
            [fields, files] = await form.parse(req);
            response = { ...fields, ...files['file'][0] };
            return response;
        } catch (error) {
            throw error;
        }
    }


    async create(req, { uploaded_by }) {
        try {
            const fileMetaData = await this.saveFileToDisk(req);
            const { filename, filetype, class_uuid, filepath } = fileMetaData;
            const response = await db.query(`
                    INSERT INTO attachment (filename, class_uuid, uploaded_by, file_url, file_type)
                    SELECT $1, c.class_uuid, c.created_by_user, $4, $5
                    FROM classes c
                    WHERE c.class_uuid = $2 AND c.created_by_user = $3 returning *;
                `, [filename[0], class_uuid[0], uploaded_by, filepath, filetype[0]]);

            if (response.rowCount == 0) {
                throw new DataError(`User ${uploaded_by} doesn't have sufficient permission for this class ${class_uuid}`);
            }

            return response.rows[0];

        } catch (error) {
            if (error?.code) throw new DatabaseError(error?.message, error?.stack);
            throw error;
        }
    }

    async update({ fileId, filename, uploaded_by }) {
        try {
            const updatedFile = await db.query(
                ` UPDATE attachment a
                    SET filename = $2, updated_at = localtimestamp
                    FROM classes c
                    WHERE a.id = $1
                    AND a.class_uuid = c.class_uuid
                    AND c.created_by_user = $3
                    RETURNING a.*;
                    `, [fileId, filename, uploaded_by]);

            if (updatedFile.rowCount == 0) {
                throw new DataError(`User ${uploaded_by} doesn't have sufficient permission to update the file.`);
            }

            return updatedFile.rows[0];
        } catch (error) {
            if (error?.code) throw new DatabaseError(error?.message, error?.stack);
            throw error;
        }
    }

    async delete({ fileId, uploaded_by }) {
        try {
            const deletedFile = await db.query(`
                                                DELETE FROM attachment a
                                                USING classes c
                                                WHERE a.id = $1
                                                AND c.created_by_user = $2
                                                AND a.class_uuid = c.class_uuid returning *;`, [fileId, uploaded_by]);
            if (deletedFile.rowCount == 0) {
                throw new NotFoundError(`File has already been deleted`);
            }

            return deletedFile.rows[0];
        } catch (error) {
            if (error?.code) throw new DatabaseError(error?.message, error?.stack);
            throw error;
        }
    }


    async getFeed({ username, page, title, type }) {
        try {
            const limit = 3;
            const offset = (page - 1) * limit;

            let sql = `SELECT a.filename, a.class_uuid, a.file_url, a.file_type, a.uploaded_by 
                        FROM attachment a
                        JOIN classes c ON c.class_uuid = a.class_uuid
                        WHERE c.class_uuid IN (SELECT membership.class_uuid FROM membership WHERE membership.username = $1)  `
            let sqlParams = [username];

            if (type) {
                sqlParams.push(type);
                sql += ` AND a.file_type = $${sqlParams.length}`;
            }

            if (title) {
                sql += ` AND a.filename LIKE '%${title}%'`;
            }

            if (page) {
                sql += ` LIMIT ${limit}`;
            }

            if (offset) {
                sql += ` OFFSET ${offset}`;
            }

            const records = await db.query(sql, sqlParams);
            if (records.rowCount == 0) {
                throw new NotFoundError("Error while finding the file, try searching with correct parameters");
            }
            return records.rows;
        } catch (error) {
            if (error?.code) throw new DatabaseError(error?.message, error?.stack);
            throw error;
        }
    }
}

export default UserService;