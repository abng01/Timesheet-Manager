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
  const [sortColumn, setSortColumn] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')

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

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const filteredTimesheets = timesheets
    .filter((entry) => {
      const matchesText = entry.task.toLowerCase().includes(filterText.toLowerCase())
      const matchesDate = filterDate ? entry.date === filterDate : true
      return matchesText && matchesDate
    })
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

  useEffect(() => {
    fetchTimesheets()
  }, [])

  return (
    <div>
      <h1>Timsheet Manager</h1>
      <TimesheetForm onEntryAdded={fetchTimesheets} editingEntry={editingEntry} setEditingEntry={setEditingEntry} />
      <FilterBar filterText={filterText} setFilterText={setFilterText} filterDate={filterDate} setFilterDate={setFilterDate} />
      <TimesheetTable 
        entries={filteredTimesheets} 
        onDelete={handleDelete} 
        onEdit={handleEdit}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  )
}

export default App