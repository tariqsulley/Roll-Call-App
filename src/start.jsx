const electron = require('electron')
const app = electron.app
const path = require('path')
const isDev = require('electron-is-dev')
const BrowserWindow = electron.BrowserWindow
require('electron-reload')
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'C:/Users/pc/my-app/electron-react-typescript-app/bulb.png',
    webPreferences: {
      nodeIntegration: true,
    },
  })
  mainWindow.setTitle("Roll Call App"); 
  mainWindow.setMenu(null);
  
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})