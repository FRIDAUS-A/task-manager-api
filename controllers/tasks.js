const Task = require('../models/Task')

const asyncWrapper = require('../middleware/async')

const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({})
	res.status(200).json({ tasks })
})
/**
const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find({})
		res.status(200).json({ status: "success", data: {tasks, amount: tasks.length}})
	} catch (err) {
		res.status(500).json({message: err})
	}
}
**/

const createTask = asyncWrapper( async (req, res) => {
	const task = await Task.create(req.body)
	res.status(201).json({ task })
})

/**
const createTask = async (req, res) => {
	try{
		task = await Task.create(req.body)
		res.status(201).json( {task} )
	} catch (err) {
		res.status(500).json(
			{message: err})
	}
}
**/
const getTask = asyncWrapper( async (req, res, next) => {
	const {id:taskID} = req.params
	const task = await Task.findOne({_id:taskID})
	if (!task) {
		console.log("here")
		return next(createCustomError(`No task with id ${taskID}`, 404))
		/**
		const error = new Error('Not Found')
		error.status = 404
		return next(error)
		**/
		//return res.status(404).json({message: `No task with id ${taskID}`})
	}
	res.status(200).json({ task })
})
/**
const getTask = async (req, res) => {
	try {
		const { id:taskID } = req.params
		const task = await Task.findOne({ _id:taskID })
		console.log(task)
		if (!task) {
			return res.status(404).json({message: `No task with id ${taskID}`})
		}
		res.status(200).json({task})
	} catch (err) {
		res.status(500).json({message: err})
	}
}
**/

const  deleteTask = asyncWrapper(async (req, res) => {
	const {id:taskID} = req.params
	const task = await Task.findOneAndDelete({_id:taskID})
	if (!task) {
		createCustomError(`No task with id ${taskID}`, 404)
	}
	res.status(200).json({message: `task with id ${id} deelted successfully`})
})

/**
const deleteTask = async (req, res) => {
	try {
		const { id:taskID } = req.params
		const task = await Task.findOneAndDelete({_id:taskID})
		console.log(task)
		if (!task) {
			return res.status(404).json({message: `No task with id ${taskID}`})
		res.status(200).json({message: "Deleted Successfully"})
		}
	} catch (err) {
		res.status(500).json({message: err})
	}
}
**/

const updateTask = asyncWrapper(async (req, res) => {
	const {id:taskID} = req.params.id
	const task = Task.findOneAndUpdate({_id:taskID}, req.body, {
		new:true,
		runValidators: true
	})
	if (!task) {
		createCustomError(`No task with id ${taskID}`, 404)
	}
	res.status(200).json({ task })
})
/**
const updateTask = async (req, res) => {
	try {
		const {id:taskID} = req.params
		const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
			new: true, runValidation: true,
			overwrite: true,
		})
		if (!task) {
			return res.status(404).json({
				message: `No task with id ${taskID}`})
		}
		res.status(200).json({task})
	} catch (err) {
		res.status(500).json({message: err})
	}
}
	**/

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	deleteTask,
	updateTask,
}