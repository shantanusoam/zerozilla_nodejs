const express = require('express');
const router = express.Router();
const Agency = require('./models/Agency');
const Client = require('./models/Client');

// API to create an agency and client in a single request
router.post('/agency-client', (req, res) => {
  // Extract agency and client data from the request body
  const { agency, client } = req.body;

  // Create a new Agency instance and save it to the database
  const newAgency = new Agency(agency);
  newAgency.save((err, savedAgency) => {
    if (err) return res.status(500).send(err);

    // Set agencyId for the client and create a new Client instance
    client.agencyId = savedAgency._id;
    const newClient = new Client(client);

    // Save the new client to the database
    newClient.save((err, savedClient) => {
      if (err) return res.status(500).send(err);

      // Return the saved agency and client in the response
      res.status(201).json({ agency: savedAgency, client: savedClient });
    });
  });
});

// API to update a client detail by client ID
router.put('/client/:clientId', (req, res) => {
  // Extract client ID and updated client data from the request parameters and body
  const clientId = req.params.clientId;
  const updatedClient = req.body;

  // Find the client by ID and update its data in the database
  Client.findByIdAndUpdate(clientId, updatedClient, { new: true }, (err, updatedClient) => {
    if (err) return res.status(500).send(err);

    // If the client is not found, return a 404 status with an error message
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Return the updated client in the response
    res.json(updatedClient);
  });
});

// API to get agency and client details with top client(s) with maximum total bill
router.get('/top-client', (req, res) => {
  // Perform an aggregation query to find top clients with maximum total bill for each agency
  Client.aggregate([
    {
      $group: {
        _id: '$agencyId',
        topClient: { $max: '$totalBill' }
      }
    },
    {
      $lookup: {
        from: 'agencies',
        localField: '_id',
        foreignField: '_id',
        as: 'agency'
      }
    },
    {
      $unwind: '$agency'
    },
    {
      $project: {
        agencyName: '$agency.name',
        clientName: {
          $arrayElemAt: [
            '$agency.clients.name',
            {
              $indexOfArray: ['$agency.clients.totalBill', '$topClient']
            }
          ]
        },
        totalBill: '$topClient'
      }
    }
  ]).exec((err, result) => {
    if (err) return res.status(500).send(err);

    // Return the result of the aggregation query in the response
    res.json(result);
  });
});

module.exports = router;
