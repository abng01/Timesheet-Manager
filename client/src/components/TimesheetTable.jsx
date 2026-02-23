function TimesheetTable({ entries }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Hours</th>
                    <th>Task</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry) => (
                    <tr key={entry.id}>
                        <td>{entry.date}</td>
                        <td>{entry.hours}</td>
                        <td>{entry.task}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TimesheetTable