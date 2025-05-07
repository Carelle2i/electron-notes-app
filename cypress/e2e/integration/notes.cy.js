describe('Electron Notes App', () => {

  it('should load the main window and display existing notes', () => {
    cy.visit('index.html');
    cy.get('#note-input').should('be.visible');
    cy.get('#save-button').should('be.visible');
    cy.get('#notes-list').should('be.visible');
  });

  it('should add a new note', () => {
    const newNote = 'Test Note';
    cy.get('#note-input').type(newNote);
    cy.get('#save-button').click();
    cy.get('.note-item').should('contain', newNote);
  });

  it('should delete a note', () => {
    const supprimer = 'Note to Delete';
    cy.get('#note-input').type(supprimer);
    cy.get('#save-button').click();
    cy.get('.delete-button').last().click();
    cy.get('.note-item').should('not.contain', supprimer);
  });


});
