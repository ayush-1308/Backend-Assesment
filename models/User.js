const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }] // references addresses
});

const User = mongoose.model('User', userSchema);
module.exports = User;
