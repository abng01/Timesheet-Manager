function TimesheetTable({ entries, onDelete, onEdit, onSort, sortColumn, sortDirection }) {
    const arrow = (column) => {
        if (sortColumn !== column) return '↕'
        return sortDirection === 'asc' ? '↑' : '↓'
    }

    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => onSort('date')} style={{ cursor: 'pointer' }}>
                        Date {arrow('date')}
                    </th>
                    <th onClick={() => onSort('hours')} style={{ cursor: 'pointer' }}>
                        Hours {arrow('hours')}
                    </th>
                    <th onClick={() => onSort('task')} style={{ cursor: 'pointer' }}>
                        Task {arrow('task')}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry) => (
                    <tr key={entry.id}>
                        <td>{entry.date}</td>
                        <td>{entry.hours}</td>
                        <td>{entry.task}</td>
                        <td>
                            <button onClick={() => onEdit(entry)}>Edit</button>
                            <button onClick={() => onDelete(entry.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TimesheetTable