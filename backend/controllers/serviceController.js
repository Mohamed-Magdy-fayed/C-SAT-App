const asyncHandler = require('express-async-handler')
const Service = require('../models/serviceModel')

// @desc    Add new service
// @route   POST /api/service/add
// @access  private
const addService = asyncHandler(async (req, res) => {
  const { name, code, questions } = req.body

  if (!name || !code || !questions) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if code exists
  const codeExists = await Service.findOne({ code })

  if (codeExists) {
    res.status(400)
    throw new Error('Service code already used')
  }

  // add service
  const service = await Service.create({
    name,
    code,
    questions,
  })

  if (service) {
    res.status(201).json({
      _id: service.id,
      name: service.name,
      code: service.code,
      questions: service.questions,
    })
  } else {
    res.status(400)
    throw new Error('Invalid service data')
  }
})

// @desc    Remove a service
// @route   DELETE /api/service/:code
// @access  private
const removeService = asyncHandler(async (req, res) => {
  const code = req.params.code

  // Check for service
  const service = await Service.findOne({ code })

  if (service) {
    await Service.deleteOne({ code: code })
    res.json({
      code: service.code
    })
  } else {
    res.status(400)
    throw new Error('Invalid service code')
  }
})

// @desc    Edit a service
// @route   PUT /api/service/:code
// @access  private
const addRating = asyncHandler(async (req, res) => {
  const ratings = req.body.ratings
  const user = req.body.user
  const code = req.params.code
  
  // Check for service
  const service = await Service.findOne({ code })
  
  if (service) {
    const data = []
    ratings.map(async (rating, index) => {
      const update = service.questions[index][rating].ratings.push(user)
      
      const doc = await Service.findOneAndUpdate({ code: code }, {
        ...service,
        questions: [
          [index][rating] = update
        ]
      }, {
        new: true
      })
      data.push(doc)
    })
    res.json({
      updated: data
    })
  } else {
    res.status(400)
    throw new Error('Invalid service code')
  }
})

// @desc    Get services
// @route   GET /api/service
// @access  Private
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find()
  res.status(200).json(services)
})

module.exports = {
  addService,
  removeService,
  addRating,
  getServices,
}