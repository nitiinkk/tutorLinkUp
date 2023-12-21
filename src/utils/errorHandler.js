export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;

  return res.status(statusCode ?? 500).json({
    message: err.message ? err.message : "",
    name: err.name,
    stack: err.stack ? err.stack : "",
    success: false,
  });
}

export class NotFoundError extends Error {
  constructor(message) {
    super();
    this.status = 404;
    this.name = "Not found.";
    this.message = message;
  }
}


export class DataError extends Error {
  constructor(message) {
    super();
    this.status = 400;
    this.name = "Data Error";
    this.message = message;
  }
}

export class DatabaseError extends Error {
  constructor(message, stack) {
    super();
    this.status = 500;
    this.name = "Database Error while running sql query";
    this.message = message;
    this.stack = stack;
  }
}