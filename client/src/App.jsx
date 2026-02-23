import { useState, useEffect } from 'react'
import axios from 'axios'
import TimesheetTable from './components/TimesheetTable'
import TimesheetForm from './components/TimesheetForm'

function App() {
  const [timesheets, setTimesheets] = useState([])
  const [editingEntry, setEditingEntry] = useState(null)

  const fetchTimesheets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/timesheets')
      setTimesheets(response.data)
    } catch (err) {
      console.log('Error:', err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/timesheets/${id}`)
      fetchTimesheets()
    } catch (err) {
      console.log('Error:', err.message)
    }
  }

  const handleEdit = (entry) => {
    setEditingEntry(entry)
  }

  useEffect(() => {
    fetchTimesheets()
  }, [])

  return (
    <div>
      <h1>Timsheet Manager</h1>
      <TimesheetForm onEntryAdded={fetchTimesheets} editingEntry={editingEntry} setEditingEntry={setEditingEntry} />
      <TimesheetTable entries={timesheets} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  )
}

export default App