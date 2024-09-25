const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' } // reference back to the user
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
