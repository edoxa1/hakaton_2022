const path = require('path')

const { app, BrowserWindow, ipcMain, net } = require('electron')
const { loadCsvFiles, loadCurrencies, categoriesList } = require('./csv-loader.js')

var devices = [];
var currencies = {};

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: __dirname + '\\svg\\icon.jpg',
        webPreferences: {
            preload: path.join(__dirname, 'csv-loader.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile('index.html'); // load main file
}

app.whenReady().then(() => {
    createWindow()
    if(process.platform == 'darwin') {
        // createWindow for macOS users 
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        });
    }
    
    devices = loadCsvFiles(); // load csv file
    currencies = loadCurrencies();
});

// quit state for non-macOS users
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

// send database from main 
ipcMain.on('get_csv_data', (event, data) => {
    event.reply('csv_data_reply', devices);
});

ipcMain.on('get_currencies', (event, data) => {
    event.reply('currencies_reply', currencies);
});
