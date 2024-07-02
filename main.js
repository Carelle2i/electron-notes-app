const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let notes = [];

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('load-notes', notes);
  });
}

app.whenReady().then(() => {
  loadNotes();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('save-note', (event, note) => {
  notes.push(note);
  saveNotes();
  event.reply('notes-updated', notes);
});

ipcMain.on('delete-note', (event, noteIndex) => {
  notes.splice(noteIndex, 1);
  saveNotes();
  event.reply('notes-updated', notes);
});

function loadNotes() {
  try {
    const data = fs.readFileSync('notes.json');
    notes = JSON.parse(data);
  } catch (error) {
    notes = [];
  }
}

function saveNotes() {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}
