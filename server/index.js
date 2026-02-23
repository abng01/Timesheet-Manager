const express = require('express')
const cors = require('cors')
require('dotenv').config()

const timesheetsRouter = require('./routes/timesheets')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/timesheets', timesheetsRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${5000}`)
})