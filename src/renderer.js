const { ipcMain, ipcRenderer} = require('electron')

// devices is defined already

let par = document.querySelector("#list");

const callCsvData = ()  => {
    par.innerHTML = "";
    ipcRenderer.send('get_csv_data', 'processors');
}

par.addEventListener('click', callCsvData);

ipcRenderer.on('csv_data_reply', (event, data) => {
    var last_type = data[0].type;
    data.forEach((device) => {
        if(device.type != last_type) {
            par.innerHTML += "<hr>";
        }
        par.innerHTML += device.type + " | " + device.name + "<br>";
        last_type = device.type;
    });
    par.removeEventListener('click', callCsvData);
});