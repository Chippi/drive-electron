const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');
const url = require('url');

require('dotenv').config();

let win = null;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800
  });

  if (process.env.PACKAGE === 'true') {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    win.loadURL(process.env.HOST);
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });

  app.on('active', () => {

    if (win === null) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
      app.quit();
    }
  });
});
