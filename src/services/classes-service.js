import { dbConnection as db } from "../config/database.js";
import { NotFoundError, DataError } from '../utils/errorHandler.js';

class ClassesService {
    constructor() {
    }

    async create({ name, class_uuid, description, created_by_user }) {
        try {
            const classExist = await db.query(`SELECT class_uuid from classes where class_uuid = $1 limit 1;`, [class_uuid]).then((result) => {
                if (result.rowCount == 0) return null;
                return result.rows[0];
            });

            if (classExist) {
                throw new DataError(`Class with unique uuid ${class_uuid} already exist !!`);
            }

            const classDetails = await db.query(`INSERT INTO classes (name, class_uuid, description, is_active, created_by_user) values($1, $2, $3, true, $4) RETURNING class_uuid, name, is_active, description;`, [name, class_uuid, description, created_by_user]);
            return classDetails?.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update({ name, gender, username, email, role }) {
        try {
            const userExist = await db.query(`SELECT username from users where username = $1 limit 1;`, [username]).then((result) => {
                if (result.rowCount == 0) return null;
                return result.rows[0];
            });

            if (userExist) {
                throw new DataError(`User with unique username ${username} already exist !! . Update your username`);
            }

            await db.query(`INSERT INTO users (name, gender, username, email, role) values($1, $2, $3, $4, $5);`, [name, gender, username, email, role]);
            return username;
        } catch (error) {
            throw error;
        }
    }

    async delete({ name, gender, username, email, role }) {
        try {
            const userExist = await db.query(`SELECT username from users where username = $1 limit 1;`, [username]).then((result) => {
                if (result.rowCount == 0) return null;
                return result.rows[0];
            });

            if (userExist) {
                throw new DataError(`User with unique username ${username} already exist !! . Update your username`);
            }

            await db.query(`INSERT INTO users (name, gender, username, email, role) values($1, $2, $3, $4, $5);`, [name, gender, username, email, role]);
            return username;
        } catch (error) {
            throw error;
        }
    }

    async getFeed({ name, gender, username, email, role }) {
        try {
            const userExist = await db.query(`SELECT username from users where username = $1 limit 1;`, [username]).then((result) => {
                if (result.rowCount == 0) return null;
                return result.rows[0];
            });

            if (userExist) {
                throw new DataError(`User with unique username ${username} already exist !! . Update your username`);
            }

            await db.query(`INSERT INTO users (name, gender, username, email, role) values($1, $2, $3, $4, $5);`, [name, gender, username, email, role]);
            return username;
        } catch (error) {
            throw error;
        }
    }
}

export default ClassesService;