const mongoose = require('mongoose');

const lcycleSchema = new mongoose.Schema({
  authorId: {
    type: String
  },
  lcycleTitle: {
    type: String,
    required: true,
  },
  members: {
    type: []
  },
  task: {
    type: []
  },
  code: {
    type: String,
    required: true,
  },

});

const Lcycle = mongoose.model('Lcycle', lcycleSchema);

exports.Lcycle = Lcycle; 

