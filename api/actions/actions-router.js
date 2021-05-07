const express = require('express')
// middleware stretch?
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

const router = express.Router()

// [GET] /api/actions
router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})
// [GET] /api/actions/:id
router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(foundAction => {
        if(!foundAction) {
            res.status(404).json({
                message: `action does not exist`
            })
        } else {
            res.status(200).json(foundAction)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})
// [POST] /api/actions
router.post('/', (req, res) => {
    const newAction = req.body
    Actions.insert(newAction)
    .then((addAction) => {
        if (
            !addAction.project_id 
            || !addAction.description 
            || !addAction.notes
        ) {
            res.status(400).json({
                message: `provide project id, description, and notes to this action`
            })
        } else {
            res.status(200).json(addAction)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})
// [PUT] /api/actions/:id
router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(editedAction => {
        if(!editedAction) {
            res.status(400).json({
                message: `action does not exist`
            })
        } else {
            res.status(200).json(editedAction)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})
// [DELETE] /api/actions/:id
router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(removeAction => {
        if(!removeAction) {
            res.status(404).json({
                message: `action does not exist and therefore cannot be removed`
            })
        } else {
            res.status(200).json(removeAction)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})

module.exports = router