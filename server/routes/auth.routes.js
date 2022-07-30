const express = require('express')
const router = express.Router({ mergeParams: true })
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateUserData } = require('../utils/helpers')
const tokenService = require('../services/tokenService')

router.post('/signUp', async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        error: {
          message: 'EMAIL__EXISTS',
          code: 400,
        },
      })
    }
    const hashedPassword = bcrypt.hash(password, 12)
    const newUser = await User.create({
      password: hashedPassword,
      ...generateUserData(),
      ...req.body,
    })

    const tokens = tokenService.generate({ _id: newUser._id })

    await tokenService.save(newUser._id, tokens.refreshToken)

    res.status(201).send({ ...tokens, userId: newUser._id })
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка.Попробуйте позже',
    })
  }
})

router.post('/signInWithPassword', async (req, res) => {})
router.post('/token', async (req, res) => {})

module.exports = router
