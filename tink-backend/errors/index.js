class BackendError extends Error {}

class CodeMissing extends BackendError {
  constructor() {
    super()
    this.message = 'Authentication code missing.'
    this.status = 403
  }
}
class AccessTokenMissing extends BackendError {
  constructor() {
    super()
    this.message = 'Accesstoken missing.'
    this.status = 403
  }
}

module.exports = {
  BackendError,
  CodeMissing,
  AccessTokenMissing
}