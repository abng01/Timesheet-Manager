const express = require('express')
const router = express.Router()
const db = require('../db')

// GET all timesheets
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, DATE_FORMAT(date, "%Y-%m-%d") as date, CAST(hours AS FLOAT) as hours, task, created_at FROM timesheets ORDER BY date DESC')
        console.log('Fetched rows:', rows)
        res.json(rows)
    } catch (err) {
        console.log('Error:', err.message)
        res.status(500).json({ error: err.message })
    }
})

// POST a new timesheet entry
router.post('/', async (req, res) => {
    const { date, hours, task } = req.body
    try {
        const [result] = await db.query(
            'INSERT INTO timesheets (date, hours, task) VALUES (?, ?, ?)',
            [date, hours, task]
        )
        console.log('Inserted entry:', result)
        res.status(201).json({ id: result.insertId, date, hours, task })
    } catch (err) {
        console.log('Error:', err.message)
        res.status(500).json({ error: err.message })
    }
})

// PUT (update) an entry
router.put('/:id', async (req, res) => {
    const { date, hours, task } = req.body
    try {
        await db.query(
            'UPDATE timesheets SET date = ?, hours = ?, task = ? WHERE id = ?',
            [date, hours, task, req.params.id]
        )
        console.log('Updated entry with id:', req.params.id)
        res.json({ id: req.params.id, date, hours, task })
    } catch (err) {
        console.log('Error:', err.message)
        res.status(500).json({ error: err.message })
    }
})

// DELETE an entry
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM timesheets WHERE id = ?', [req.params.id])
        console.log('Deleted entry with id:', req.params.id)
        res.json({ message: 'Entry deleted' })
    } catch (err) {
        console.log('Error:', err.message)
        res.status(500).json({ error: err.message })
    }
})

module.exports = router