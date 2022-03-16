const { ipcMain, ipcRenderer} = require('electron')
const template = require(__dirname + "\\src\\local-templates.js")


let categories_div = document.querySelector(".categories");
let devicesData = {};

// handlebars template

const callCsvData = ()  => {
    console.log("a");   
    ipcRenderer.send('get_csv_data', 'processors');
}

window.addEventListener('DOMContentLoaded', callCsvData);
ipcRenderer.on('csv_data_reply', (event, data) => {
    devicesData = data;
    showCategories();
});

const showCategories = () => {
    console.log(devicesData);
    for(const key in devicesData) {
        type = devicesData[key][0].type;
        category = devicesData[key][0].category;
        categories_div.innerHTML += template.categoriesTemplate(type, category);
    }
};

/*

console.log(data);
    for(const key in data) {
        c = data[key][0].category;
        options_temp = "";

        data[key].forEach((device) => {
            options_temp += 
            `
                <option value="${device.name}">${device.name}</option>
            `
        });

        categories_div.innerHTML += 
        `
            <br>
            <label  for="${c}">${c}</label>
            <select name="${c}">${options_temp}</select><br>
        `;
    }

    categories_div.removeEventListener('click', callCsvData);
*/
