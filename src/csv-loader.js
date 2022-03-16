const path = require('path')
const csv = require('csv-parser');
const fs = require('fs');

const Device = require('./classes/Device')

devices_list = ['processors', 'power_units', 'hard_drives', 'videocards'];

module.exports.loadCsvFiles = () => {
    var devices = [];
    devices_list.forEach((element) => {
        fs.createReadStream(path.format({
            root: 'data/',
            name: element,
            ext: '.csv'
        }))
        .pipe(csv())
        .on('data', (row) => {
            let device = new Device(element, row.name, row.consumption, row.revenue);
            devices.push(device);
        });
    });
    
    return devices;
}
