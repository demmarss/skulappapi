const express = require('express');
const router = express.Router();
const {TimeRecord} = require('../models/timeRecord')
    

// get all the times
router.get('/', async (req, res) => {
    const timeRecords = await TimeRecord.find()
    res.send(timeRecords)
  });


router.post('/', async (req, res) => {

  //    Get all records
  const timeRecords = await TimeRecord.find()
  //    Get all records for this user
  const userRecords = timeRecords.filter(record=> record.userId == req.body.userID)
  
  // Try to see if there is any record to update the timeOut
  let recordToUdate = []
  for (x=0; x< userRecords.length; x++){
    let hourDiff = ((new Date().getTime() - new Date(userRecords[x].timeIn).getTime())/3600000)
    if(hourDiff < 6){
      recordToUdate.push(userRecords[x])
    }
  }

  // Update any record with timeOut, else create a new record
  if (recordToUdate.length >0) {
    TimeRecord.where({ _id: recordToUdate[0]._id }).updateOne({ timeOut: new Date() }).exec()
    const timeRecord = await TimeRecord.findById(recordToUdate[0]._id)  
    res.send(timeRecord)
  }else{
    let timeRecord = new TimeRecord({ 
      userId: req.body.userID,
      timeIn:new Date(),
      timeOut: ''
    });

    timeRecord = await timeRecord.save();
    res.send(timeRecord)
  }
    
});

module.exports = router; 