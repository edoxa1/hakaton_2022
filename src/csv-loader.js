const path = require('path')
const csv = require('csv-parser');
const fs = require('fs');

const Device = require('./classes/Device')

devices_list = [
{
    filename: 'processors',
    category: 'Процессор'
},
{
    filename: 'videocards',
    category: 'Видеокарта'
},
{
    filename: 'power_units',
    category: 'Блок питания'
},
{
    filename: 'rams',
    category: 'ОЗУ'
}];

module.exports.loadCsvFiles = () => {
    var devices = {};
    devices_list.forEach((element) => {
        var _devicesArray = [];
        fs.createReadStream(path.format({
            root: 'data/',
            name: element.filename,
            ext: '.csv'
        }))
        .pipe(csv())
        .on('data', (row) => {
            let device = new Device(element.filename, row.name, element.category, row.consumption, row.revenue);
            _devicesArray.push(device);
        });
        devices[element.filename] = _devicesArray;
    });
    
    return devices;
}
