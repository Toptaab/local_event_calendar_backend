const events = require('./events')



module.exports =  eventFalcilities = events.map((value,index) =>  { return {eventId: index+1, parking: Math.random() < 0.5,toilet:Math.random() < 0.5,prayerRoom:Math.random() < 0.5,food:Math.random() < 0.5,entranceFee:Math.random() < 0.5,wifi:Math.random() < 0.5,medicalService:Math.random() < 0.5,petFriend:Math.random() < 0.5} })

