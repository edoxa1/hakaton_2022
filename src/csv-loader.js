const path = require('path')
const csv = require('csv-parser');
const fs = require('fs');

const Device = require('./classes/Device')
const fetch = require('electron-fetch').default


var currencies = {};
var categoriesList = [
{
    filename: 'processors',
    category: 'Процессор',
    icon: __dirname + '\\svg\\cpu.svg'
},
{
    filename: 'videocards',
    category: 'Видеокарта',
    icon: __dirname + '\\svg\\harddrive.svg'
},
{
    filename: 'power_units',
    category: 'Блок питания',
    icon: __dirname + '\\svg\\powerunit.svg'
},
{
    filename: 'hard_drives',
    category: 'Жёсткие диски',
    icon: __dirname + '\\svg\\harddrive.svg'
},
{
    filename: 'rams',
    category: 'ОЗУ',
    icon: __dirname + '\\svg\\ram.svg'
}];

// предварительный ввод словаря [devices_list] даёт возможность 
// без изменения всего кода добавлять разные комплектующие
// вссего лишь неоходимо 
// добавить таблицу с товаром и добавить в вышенаписанный словарь 
// соответствующуе название файла и категории 

module.exports.loadCsvFiles = () => {
    var devices = {};
    categoriesList.forEach((element) => {
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
    
    return devices;
}

module.exports.loadCurrencies = () => {
    var data = {
        "BTC": 0.000024485191,
        "CNY": 6.347,
        "ETB": 50.88,
        "EUR": 0.898732,
        "GBP": 0.759388,
        "JPY": 118.47933333,
        "KZT": 509.180935,
        "RUB": 102.74998,
        "TWD": 28.230501,
        "TZS": 2317,
        "UAH": 29.61356,
        "UGX": 3584.751489,
        "USD": 1,
        "UYU": 42.658887,
        "UZS": 10877.410354
      };
    return data;
}


module.exports.categoriesList = categoriesList;
