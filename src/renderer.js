const { ipcMain, ipcRenderer} = require('electron')
const template = require(__dirname + "\\src\\local-templates.js")
const selectedDevices = require(__dirname + "\\src\\selectedDevices.js")
const events = require(__dirname + "\\src\\events.js")

let categories_div = document.querySelector(".categories");
let devicesData = {};

// handlebars template

const callCsvData = ()  => {
    ipcRenderer.send('get_csv_data', 'processors');
}

window.addEventListener('DOMContentLoaded', callCsvData);
ipcRenderer.on('csv_data_reply', (event, devices) => {
    devicesData = devices;
    showCategories();
});

const showCategories = () => {
    console.log(devicesData);
    for(const key in devicesData) {
        type = devicesData[key][0].type;
        category = devicesData[key][0].category;
        categories_div.innerHTML += template.categoriesTemplate(type, category);
    }

    document.querySelectorAll('.category').forEach((query) => {
        console.log(query);
        console.log(events.selectCategory)
        query.addEventListener('click', events.selectCategory);
    });
};

