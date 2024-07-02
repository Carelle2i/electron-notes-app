const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const noteInput = document.getElementById('note-input');
  const saveButton = document.getElementById('save-button');
  const notesList = document.getElementById('notes-list');

  saveButton.addEventListener('click', () => {
    const note = noteInput.value;
    if (note) {
      ipcRenderer.send('save-note', note);
      noteInput.value = '';
    }
  });

  ipcRenderer.on('load-notes', (event, notes) => {
    displayNotes(notes);
  });

  ipcRenderer.on('notes-updated', (event, notes) => {
    displayNotes(notes);
  });

  function displayNotes(notes) {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
      const noteItem = document.createElement('div');
      noteItem.className = 'note-item';
      noteItem.innerHTML = `
        <span>${note}</span>
        <button class="delete-button" data-index="${index}">Supprimer</button>
      `;
      notesList.appendChild(noteItem);
    });

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const noteIndex = button.getAttribute('data-index');
        ipcRenderer.send('delete-note', noteIndex);
      });
    });
  }
});
