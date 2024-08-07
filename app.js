require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
const tasks = require('./routes/tasks')
connectDB = require('./db/connect')

notFound = require('./middleware/not-found')
errorHandlerMiddleWare = require('./middleware/error-handler')


// routes
app.get('/hello', (req, res) => {
	res.send('<h1>Task Manager App</h1>')
})
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleWare)




const start = async () => {
	try{

		await connectDB(process.env.MONGO_URL)
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`)
		})
	}
	catch (err) {
		console.log(err)
	}	
}

start()