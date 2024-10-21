const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  streetAddress: { type: String, required: true },
  town: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true }, 
  nomineeName: { type: String, required: true },
  sponsorId: { type: String, required: true },
  vigilanceOfficer: { type: String, required: true },
  accountUsername: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user', // Default value is 'user'
    required: true 
},
});

// Create a User model
const User = mongoose.model('User', userSchema);

module.exports = User;
