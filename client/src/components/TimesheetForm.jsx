import { useState, useEffect } from 'react'
import axios from 'axios'

function TimesheetForm({ onEntryAdded, editingEntry, setEditingEntry }) {
    const [date, setDate] = useState('')
    const [hours, setHours] = useState('')
    const [task, setTask] = useState('')

    useEffect(() => {
        if (editingEntry) {
            setDate(editingEntry.date)
            setHours(editingEntry.hours)
            setTask(editingEntry.task)
        }
    }, [editingEntry])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingEntry) {
                await axios.put(`http://localhost:5000/api/timesheets/${editingEntry.id}`, {
                    date,
                    hours: parseFloat(hours),
                    task
                })
                    setEditingEntry(null)
            } else {
                await axios.post(`http://localhost:5000/api/timesheets`, {
                    date,
                    hours: parseFloat(hours),
                    task
                })
            }
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
            <button type="submit">{editingEntry ? 'Update Entry' : 'Add entry'}</button>
        </form>
    )
}


export default TimesheetForm