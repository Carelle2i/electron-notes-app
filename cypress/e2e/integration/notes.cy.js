describe('Renderer Test for Electron Notes App', () => {

  beforeEach(() => {
    cy.visit('index.html');
  });

  it('should load the main window and display UI elements', () => {
    cy.get('#note-input').should('be.visible');
    cy.get('#save-button').should('be.visible');
    cy.get('#notes-list').should('be.visible');
  });

  it('should add a new note and display it in the list', () => {
    const newNote = 'Test Note';

    cy.get('#note-input').type(newNote);
    cy.get('#save-button').click();

    cy.get('.note-item').last().should('contain', newNote);
  });

  it('should delete a note and remove it from the list', () => {
    const noteToDelete = 'Note to Delete';
    
    cy.get('#note-input').type(noteToDelete);
    cy.get('#save-button').click();

    cy.get('.delete-button').last().click();

    cy.get('.note-item').should('not.contain', noteToDelete);
  });

  it('should not add an empty note', () => {
    cy.get('#note-input').type('  ');
    cy.get('#save-button').click();
    
    cy.get('.note-item').should('not.exist');
  });

});
