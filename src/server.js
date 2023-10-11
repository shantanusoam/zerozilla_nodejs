const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { generateAuthToken, authenticateToken } = require('./auth');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://bluestackssoam:Ssoam+7860@cluster0.7d9x7tr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
// Models
const Agency = require('./models/agency');
const Client = require('./models/client');
// MongoDB Models (Agency, Client)



// API to generate authentication token
app.post('/api/authenticate', (req, res) => {
  // Here you can authenticate the user, check credentials, etc.
  const user = { /* user data */ };
  const token = generateAuthToken(user);
  res.json({ token });
});

app.use(bodyParser.json());



// 1st API: Create an agency and client in a single request
app.post('/api/agency-client', async (req, res) => {
    try {
        const { agency, client } = req.body;
        const newAgency = new Agency(agency);
        await newAgency.save();
        client.agencyId = newAgency._id;
        const newClient = new Client(client);
        await newClient.save();
        res.status(201).json({ agency: newAgency, client: newClient });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// 2nd API: Update client details
app.put('/api/client/:clientId', async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const updatedClient = await Client.findByIdAndUpdate(clientId, req.body, { new: true });
        if (!updatedClient) {
            return res.status(404).send('Client not found');
        }
        res.status(200).json(updatedClient);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// 3rd API: Retrieve agency with top clients
app.get('/api/top-clients', async (req, res) => {
    try {
        const topClients = await Client.find().sort({ totalBill: -1 }).limit(5);
        const result = [];
        for (const client of topClients) {
            const agency = await Agency.findById(client.agencyId);
            result.push({
                agencyName: agency.name,
                clientName: client.name,
                totalBill: client.totalBill
            });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});