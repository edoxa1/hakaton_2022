const { ipcMain, ipcRenderer} = require('electron')
const template = require(__dirname + "\\src\\local-templates.js")
const selectedDevices = require(__dirname + "\\src\\selectedDevices.js")
const events = require(__dirname + "\\src\\events.js")
const { categoriesList } = require(__dirname + "\\src\\csv-loader.js")

let categories_div = document.querySelector(".categories");
let devicesData = {};
let currencies = {};
let currectCurrency = 'USD';

const callCsvData = () => {
    ipcRenderer.send('get_csv_data', 'data');
}

const callCurrenciesData = () => {
    ipcRenderer.send('get_currencies', 'data');
}

window.addEventListener('DOMContentLoaded', () => {
    callCsvData();
    callCurrenciesData();
});
ipcRenderer.on('csv_data_reply', (event, devices) => {
    devicesData = devices;
    showCategories();
});

ipcRenderer.on('currencies_reply', (event, data) => {
    currencies = data;
    showCurrencies();
});

const showCurrencies = () => {
    document.querySelector('#currency_exchange').innerHTML += template.currenciesTemplate();
    document.querySelector('#currency_exchange').addEventListener('change', events.updateCurrency)
};

const showCategories = () => {
    for(const element of categoriesList) {
        categories_div.innerHTML += template.categoriesTemplate(element.filename, element.category, element.icon);
    }

    document.querySelectorAll('.category').forEach((query) => {
        console.log(query);
        console.log(events.selectCategory)
        query.addEventListener('click', events.selectCategory);
    });

    document.querySelector('.calculate_btn').addEventListener('click', events.calculateSpecs);
    document.querySelector('.reset_btn').addEventListener('click', events.refreshEverything);
};
