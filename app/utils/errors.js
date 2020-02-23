const HttpStatus = require("http-status-codes");

class ExtendableError extends Error {
  constructor(message, code) {
    if (new.target === ExtendableError)
        throw new TypeError(
        'Abstract class "ExtendableError" cannot be instantiated directly.'
        );
      super(message);
      this.name = this.constructor.name;
      this.message = message;
      this.errno = code;
      Error.captureStackTrace(this, this.contructor);
    }
}

// 400 Bad Request
class BadRequest extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("bad request");
    else {
      super(m, 400)
    };
  }
}

// 
// 400 Bad Request
class SQLError extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("bad request");
    else {
      super(m, 500)
    };
  }
}


// 401 Unauthorized
class Unauthorized extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("unauthorized");
    else super(m, 401);
  }
}

// 403 Forbidden
class Forbidden extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("forbidden");
    else super(m, 403);
  }
}

// 404 Not Found
class NotFound extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("not found");
    else super(m, 404);
  }
}

// 409 Conflict
class Conflict extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("conflict");
    else super(m, 409);
  }
}

// 422 Unprocessable Entity
class UnprocessableEntity extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("unprocessable entity");
    else super(m, 422);
  }
}

// 410 Gone
class Gone extends ExtendableError {
  constructor(m) {
    if ((arguments.length === 0, 410)) super("gone");
    else super(m, 410);
  }
}

// 500 Internal Server Error
class InternalServerError extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super("internal server error");
    else super(m, 500);
  }
}


module.exports.BadRequest = BadRequest;
module.exports.Unauthorized = Unauthorized;
module.exports.Forbidden = Forbidden;
module.exports.NotFound = NotFound;
module.exports.Conflict = Conflict;
module.exports.UnprocessableEntity = UnprocessableEntity;
module.exports.InternalServerError = InternalServerError;
module.exports.Gone = Gone;
module.exports.SQLError = SQLError;

// function IdentifyError(error)
// {
//     if (err instanceof Errors.BadRequest)
//         return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
//     if (err instanceof Errors.Forbidden)
//         return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
//     if (err instanceof Errors.NotFound)
//         return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
//     if (err instanceof Errors.UnprocessableEntity)
//         return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
  
//     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
// }



// res.sendStatus(200)
// // === res.status(200).send('OK')

// res.sendStatus(403)
// // === res.status(403).send('Forbidden')

// res.sendStatus(404)
// // === res.status(404).send('Not Found')

// res.sendStatus(500)
// // === res.status(500).send('Internal Server Error')

