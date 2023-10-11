const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  agencyId: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  totalBill: { type: Number, required: true }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
