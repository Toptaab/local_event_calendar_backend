const seedData = {
    province: require("./province/provinces"),
    district: require("./province/districts"),
    subDistrict: require("./province/subdistricts"),
    category: require('./category'),
    user: require('./users'),
    organizerInformation: require('./organizerInformations'),
    event: require('./events'),
    eventAddress: require('./eventAddress'),
    eventImage: require('./eventImage'),
    eventFacility: require('./eventFacility')
}

module.exports = seedData
