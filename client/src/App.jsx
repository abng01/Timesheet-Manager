import { useState, useEffect } from 'react'
import axios from 'axios'
import TimesheetTable from './components/TimesheetTable'
import TimesheetForm from './components/TimesheetForm'
import FilterBar from './components/FilterBar'

function App() {
  const [timesheets, setTimesheets] = useState([])
  const [editingEntry, setEditingEntry] = useState(null)
  const [filterText, setFilterText] = useState('')
  const [filterDate, setFilterDate] = useState('')

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

  const filteredTimesheets = timesheets.filter((entry) => {
    const matchesText = entry.task.toLowerCase().includes(filterText.toLowerCase())
    const matchesDate = filterDate ? entry.date === filterDate : true
    return matchesText && matchesDate
  })

  useEffect(() => {
    fetchTimesheets()
  }, [])

  return (
    <div>
      <h1>Timsheet Manager</h1>
      <TimesheetForm onEntryAdded={fetchTimesheets} editingEntry={editingEntry} setEditingEntry={setEditingEntry} />
      <FilterBar filterText={filterText} setFilterText={setFilterText} filterDate={filterDate} setFilterDate={setFilterDate} />
      <TimesheetTable entries={filteredTimesheets} onDelete={handleDelete} onEdit={handleEdit}/>
    </div>
  )
}

export default App