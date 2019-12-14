const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentDate: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
  },
  collectorId: {
    type: String,
  },
  monthPaidFor: {
    type: String,
  },
  amount: {
    type: String,
  },
  yearPaidFor:{
      type:String
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

exports.Payment = Payment; 
