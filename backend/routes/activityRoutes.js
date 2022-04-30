const express = require('express')
const router = express.Router()
const {
  getActivity,
  createActivity,
  updateActivity,
  toggleActivity,
  deleteActivity,
} = require('../controllers/activityControllers')

router.get('/', getActivity)

router.post('/', createActivity)

router.put('/:id', updateActivity)

router.put('/completed/:id', toggleActivity)

router.delete('/:id', deleteActivity)

module.exports = router
