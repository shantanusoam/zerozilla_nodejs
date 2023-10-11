const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// API to update a client detail
router.put('/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const { name, email, phoneNumber, totalBill } = req.body;

    await Client.findByIdAndUpdate(clientId, { name, email, phoneNumber, totalBill });
    res.status(200).json({ message: 'Client updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
