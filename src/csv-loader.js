const path = require('path')
const csv = require('csv-parser');
const fs = require('fs');

const Device = require('./classes/Device')
const UserDeviceSelection = require('./classes/UserDeviceSelection.js')

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
    filename: 'hard_drives',
    category: 'Жёсткие диски'
},
{
    filename: 'rams',
    category: 'ОЗУ'
}];

// предварительный ввод словаря [devices_list] даёт возможность 
// без изменения всего кода добавлять разные комплектующие
// вссего лишь неоходимо 
// добавить таблицу с товаром и добавить в вышенаписанный словарь 
// соответствующуе название файла и категории 

module.exports.loadCsvFiles = () => {
    var devices = {};
    devices_list.forEach((element) => {
        let _devicesArray = [];
        let _deviceId = 0; // stores device id 
        fs.createReadStream(path.format({
            root: 'data/',
            name: element.filename,
            ext: '.csv'
        }))
        .pipe(csv())
        .on('data', (row) => {
            let device = new Device(element.filename, _deviceId, row.name, element.category, row.consumption, row.revenue);
            _devicesArray.push(device);
            _deviceId++;
        });
        devices[element.filename] = _devicesArray;
    });
    
    var userSelectedDevices = new UserDeviceSelection();
    return devices, userSelectedDevices;
}
