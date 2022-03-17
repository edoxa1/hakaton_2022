const { ipcMain, ipcRenderer} = require('electron')
const template = require(__dirname + "\\src\\local-templates.js")

let categories_div = document.querySelector(".categories");
let devicesData = {};
let userSelectedDevices;

// handlebars template

const callCsvData = ()  => {
    ipcRenderer.send('get_csv_data', 'processors');
}

window.addEventListener('DOMContentLoaded', callCsvData);
ipcRenderer.on('csv_data_reply', (event, devices, userSelectedDevices) => {
    devicesData = devices;
    userSelectedDevices = userSelectedDevices;
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
        query.addEventListener('click', selectCategory);
    });
};
