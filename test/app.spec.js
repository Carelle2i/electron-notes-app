const Application = require('spectron').Application;
const assert = require('assert');
const path = require('path');

describe('Electron Notes App', function() {
  this.timeout(30000); s

  let app;

  // Avant chaque test, démarre l'application Electron
  beforeEach(() => {
    app = new Application({
      path: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'), // Le chemin vers Electron
      args: [path.join(__dirname, '..')] 
    });
    return app.start();
  });

  // Après chaque test, arrête l'application Electron
  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  // Test pour vérifier que la fenêtre principale se charge
  it('should load the main window', async () => {
    const windowCount = await app.client.getWindowCount();
    assert.strictEqual(windowCount, 1); 
  });

  // Test pour ajouter une note
  it('should add a note', async () => {
    const note = 'Test Note';
    await app.client.setValue('#note-input', note);  
    await app.client.click('#save-button'); 
    
    // Vérifie que la note a bien été ajoutée dans la liste
    const notes = await app.client.getText('.note'); 
    assert(notes.includes(note));  
  });

  // Test pour supprimer une note
  it('should delete a note', async () => {
    const note = 'Note to Delete';
    await app.client.setValue('#note-input', note);
    await app.client.click('#save-button');
    
    // Clique sur un bouton pour supprimer la note
    await app.client.click('.delete-btn'); 
    
    // Vérifie que la note a bien été supprimée
    const notes = await app.client.getText('.note');
    assert(!notes.includes(note)); 
  });
});
