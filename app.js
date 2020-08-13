const {app, BrowserWindow} = require('electron');
const dotenv = require('dotenv');

const appInit = require('./appInit');
const webServer = require('./web/server');

// App stuff and serber startup
dotenv.config();
appInit();
webServer({port: process.env.APP_PORT});

// Main window init
function initWin () {
  
    let win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
          nodeIntegration: true
        }
    })
      // and load the index.html of the app.
    process.env.ENV === "dev" ? win.loadURL('http://localhost:3000') : win.loadFile("front/index.html");
    
}

// Magic starts !
app.whenReady().then(initWin);

  