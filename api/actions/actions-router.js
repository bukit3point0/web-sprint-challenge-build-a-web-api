const express = require('express')
// middleware stretch?
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

const router = express.Router()

// [GET] /api/actions
// [GET] /api/actions/:id
// [POST] /api/actions
// [PUT] /api/actions/:id
// [DELETE] /api/actions/:id

module.exports = router