const tokenService = require('../services/tokenService')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status(401).json({
        message: 'Unathorized',
      })
    }

    const data = tokenService.validateAccess(token)
    if (!data) {
      res.status(401).json({
        message: 'Unathorized',
      })
    }
    req.user = data

    next()
  } catch (error) {
    res.status(401).json({
      message: 'Unathorized',
    })
  }
}
