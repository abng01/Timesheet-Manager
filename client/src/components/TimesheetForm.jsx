import { useState } from 'react'
import axios from 'axios'

function TimesheetForm({ onEntryAdded }) {
    const [date, setDate] = useState('')
    const [hours, setHours] = useState('')
    const [task, setTask] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/timesheets', {
                date,
                hours: parseFloat(hours),
                task
            })
            console.log('Entry added:', response.data)
            setDate('')
            setHours('')
            setTask('')
            onEntryAdded()
        } catch (err) {
            console.log('Error:', err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
            <input type="number" placeholder="Hours" value={hours} onChange={(e) => setHours(e.target.value)} required/>
            <input type="text" placeholder="Task Description" value={task} onChange={(e) => setTask(e.target.value)} required/>
            <button type="submit">Add Entry</button>
        </form>
    )
}


export default TimesheetForm