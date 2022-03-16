const path = require('path')

const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const csvLoader = require('./csv-loader.js')

var devices = [];

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
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
    
    devices = csvLoader.loadCsvFiles();
});

// quit state for non-macOS users
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});


ipcMain.on("get_csv_data", (event, data) => {
    event.reply("csv_data_reply", devices);
});


