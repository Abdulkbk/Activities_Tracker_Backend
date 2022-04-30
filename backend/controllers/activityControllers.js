const asyncHandler = require('express-async-handler')

const Activity = require('../models/activityModel')

const getActivity = asyncHandler(async (req, res) => {
  console.log('Getting your Activities')
  const activities = await Activity.find()

  res.status(200).json(activities)
})

const createActivity = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: 'Please add a activity' })
    throw new Error('Please add a text field')
  }

  const activity = await Activity.create({
    text: req.body.text,
    completed: false,
  })

  res.status(200).json(activity)
})

const updateActivity = asyncHandler(async (req, res) => {
  const activity = Activity.findById(req.params.id)

  if (!activity) {
    res.status(400)
    throw new Error('Activity not found')
  }

  const updatedActivity = await Activity.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(200).json(updatedActivity)
})

const toggleActivity = asyncHandler(async (req, res) => {
  const activity = Activity.findById(req.params.id)

  console.log(req.body.completed)

  if ((req.body.completed != true) & (req.body.completed != false)) {
    res.status(400).json({ message: 'Please mark complete or not' })
    throw new Error('Please add a text field')
  }

  const updateActivity = await Activity.findByIdAndUpdate(
    req.params.id,
    {
      completed: req.body.completed,
    },
    { new: true }
  )

  res.status(200).json(updateActivity)
})

const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id)

  if (!activity) {
    res.status(400)
    throw new Error('Activity not found')
  }

  console.log(req.params.id)

  activity.remove()

  res.status(200).json(req.params.id)
})

module.exports = {
  getActivity,
  createActivity,
  updateActivity,
  toggleActivity,
  deleteActivity,
}
