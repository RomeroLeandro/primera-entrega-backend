const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = Schema({
  name: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  documents: [
    {
      name: String,
      reference: String
    }
  ],
  last_connection: {
    type: Date,
    default: null 
  },
  admin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'premium', 'user'],
    default: 'user',
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
});

module.exports = model("users", userSchema);
