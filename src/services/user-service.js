import { dbConnection as db } from "../config/database.js";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRETKEY;
import { NotFoundError, DataError, DatabaseError } from '../utils/errorHandler.js';

    class UserService {
        constructor() {
        }

        async login({ username }) {
            try {
                const user = await db.query(`SELECT username, role from users where username = $1 limit 1;`, [username]).then((result) => {
                    if (result.rowCount == 0) return null;
                    return result.rows[0];
                });

                if (!user) {
                    throw new NotFoundError(`User doesn't exist with username ${username} in database`);
                }

                const token = jwt.sign({ username: user.username, role: user.role },
                    secretKey,
                    {
                        algorithm: 'HS256',
                        allowInsecureKeySizes: true,
                        expiresIn: 86400, // 24 hours
                    });

                user.token = token;
                return user;

            } catch (error) {
                if (error?.code) throw new DatabaseError(error?.message, error?.stack);
                throw error;
            }
        }


        async create({ name, gender, username, email, role, class_uuid }) {
            try {
                const userMembershipExist = await db.query(`SELECT username from membership where username = $1 and class_uuid = $2;`, [username, class_uuid]).then((result) => {
                    if (result.rowCount >= 1) return true;
                    return false;
                });

                if (userMembershipExist) {
                    throw new DataError(`User already exist for the class ${class_uuid}.`);
                }

                const userExist = await db.query(`SELECT * from users where username = $1 limit 1;`, [username]).then((result) => {
                    if (result.rowCount == 0) return null;
                    return result.rows[0];
                });

                if (!userExist) {
                    await db.query(`INSERT INTO users (name, gender, username, email, role) values($1, $2, $3, $4, $5);`, [name, gender, username, email, role]);
                }

                return userExist;

            } catch (error) {
                if (error?.code) throw new DatabaseError(error?.message, error?.stack);
                throw error;
            }
        }

        async update({ username, avatar_state }) {
            try {
                const updatedRecord = await db.query(`UPDATE users set avatar_state = $2, updated_at = localtimestamp where username = $1 returning *;`, [username, avatar_state]).then((result) => {
                    if (result.rowCount == 0) return null;
                    return result.rows[0];
                });

                if (!updatedRecord) {
                    throw new NotFoundError(`Failed to update user ${username} as user doesn't exist`);
                }

                return updatedRecord;
            } catch (error) {
                if (error?.code) throw new DatabaseError(error?.message, error?.stack);
                throw error;
            }
        }

        async delete({ username }) {
            try {
                const deletedUserRecord = await db.query(`DELETE from users where username = $1 returning *;`, [username]).then((result) => {
                    if (result.rowCount == 0) return null;
                    return result.rows[0];
                });

                if (!deletedUserRecord) {
                    throw new NotFoundError(`User ${username} doesn't exist. It is already dropped from class!!`);
                }

                return deletedUserRecord;
            } catch (error) {
                if (error?.code) throw new DatabaseError(error?.message, error?.stack);
                throw error;
            }
        }

        async enroll({ name, gender, username, email, role, class_uuid }) {
            try {
                const classExist = await db.query(`SELECT * from classes where class_uuid = $1 limit 1;`, [class_uuid]).then((result) => {
                    if (result.rowCount == 0) return null;
                    return result.rows[0];
                })

                if (!classExist) {
                    throw new DataError(`Class ${class_uuid} Doesn't exist to which the user is trying to enroll`);
                }

                //update student membership
                const studentMembershipId = await db.query(`INSERT INTO membership(class_uuid, username) values($1, $2) returning id;`, [class_uuid, username]).then((result => result.rows[0]));
                return { student_membership: studentMembershipId };
            } catch (error) {
                if (error?.code) throw new DatabaseError(error?.message, error?.stack);
                throw error;
            }
        }
    }

export default UserService;