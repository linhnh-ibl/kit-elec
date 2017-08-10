/*
* @Author: ibl
* @Date:   2017-08-10 15:32:08
* @Last Modified by:   ibl
* @Last Modified time: 2017-08-10 15:46:42
*/

'use strict';
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.ejs'),
    protocol: 'file:',
    slashes: true
  }));
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if(process.platform != 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if(win === null) {
    createWindow();
  }
});

// app.on('ready', () => {
//   mainWindow = new BrowserWindow({
//     height: 400,
//     width: 400
//   })

//   // load the local HTML file
//   let url = require('url').format({
//     protocol: 'file',
//     slashes: true,
//     pathname: require('path').join(__dirname, 'index.html')
//   })
//   console.log(url)
//   mainWindow.loadURL(url)
// })
