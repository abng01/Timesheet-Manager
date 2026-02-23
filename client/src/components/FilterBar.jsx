function FilterBar({ filterText, setFilterText, filterDate, setFilterDate }) {
    return (
        <div>
            <input 
                type="text"
                placeholder="Search by task..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
            />
            <input 
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
            />
            <button onClick={() => { 
                setFilterText('')
                setFilterDate('')
            }}>
                Clear Filters
            </button>
        </div>
    )
}

export default FilterBar