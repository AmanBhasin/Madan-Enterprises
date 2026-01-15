const express = require('express');
const cors = require('cors');
const Kalam = require('../models/Kalam');
const router = express.Router();

// save a new row
router.post("/", async(req, res) =>{
    try {
        const today = new Date();
        const date = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}`;
        const data = new Kalam({...req.body, date});
        const saved = await data.save();
        res.json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Error creating data', error });
    }
})


// get all rows for specific date
router.get("/:day/:month", async(req, res) => {
    const {day, month} = req.params;
    const date = `${day}/${month}`;
    try{
        const rows = await Kalam.find({date});
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
} );
// get all data from a month back

module.exports = router;