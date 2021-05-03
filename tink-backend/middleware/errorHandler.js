const { BackendError } = require('../errors')

const errorHandler = (error, req, res, next) => {
  if (error instanceof BackendError) {
    res
      .status(error.status)
      .json({ error: error.message })
  } else {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Something went horribly wrong, do not worry though...' })
  }
}

module.exports = errorHandler