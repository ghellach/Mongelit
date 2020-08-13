const {app, BrowserWindow} = require('electron');
const webServer = require('./web/server');

const fs = require('fs');
const path = require('path');
const os = require('os');

webServer();

function initWin () {
  
    let win = new BrowserWindow({
        width: "100%",
        height: "100%",
        webPreferences: {
          nodeIntegration: true
        }
    })
      // and load the index.html of the app.
    win.loadURL('http://localhost:3000');
    
}

// * creates appropriate directories
try {
  fs.mkdirSync(path.join(os.homedir(), "./documents", "./mongelit"))
}catch{

}


app.whenReady().then(initWin);

  