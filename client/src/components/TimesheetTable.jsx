function TimesheetTable({ entries, onDelete, onEdit }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Hours</th>
                    <th>Task</th>
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