const mongoose = require('mongoose');

const reportschema = new mongoose.Schema({
  reportsenderusername: {
    type: String,
    required: true
  },
  reportrecieverusername: {
    type: String,
    required: true
  },
  reportsenderid: {
    type: String,
    required: true
  },
  reportreceiverid: {
    type: String,
    required: true
  },
  reportreason: {
    type: String,
    required: true
  }
},
{
    timestamps:true
   }
   );

module.exports = mongoose.model('Reports', reportschema);
