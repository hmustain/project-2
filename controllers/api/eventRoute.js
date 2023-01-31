const router = require('express').Router();
const { Event } = require('../../models');
const { create } = require('../../models/user');

// GET all event
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Error (500) cannot perform GET request" });
    }
});

// GET event by :ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: "Error (500) cannot perform GET request" });
    }
});

// POST a new event
router.post('/', async (req, res) => {
    try {
        const { name, starting_date, ending_date, description, created_by } = req.body;
        if (!name || !starting_date || !ending_date || !description || !created_by) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEvent = await Event.create({ name, starting_date, ending_date, description, created_by });
        res.json(newEvent);
    } catch (err) {
        res.status(500).json({ message: "Error (500) cannot perform POST request" });
    }
});


// PUT (update) an existing event
router.put('/:id', async (req, res) => {
    try {
        const updateEvent = await Event.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!updateEvent[0]) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(updateEvent);
    } catch (err) {
        res.status(500).json({ message: "Error (500) cannot perform PUT request" });
    }
});

// DELETE event by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleteEvent = await Event.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deleteEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json({ message: "Event deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error (500) cannot perform DEL request" });
    }
});

module.exports = router;