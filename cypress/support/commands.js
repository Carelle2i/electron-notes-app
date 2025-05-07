Cypress.Commands.add('addNote', (note) => {
    cy.get('#note-input').type(note);  // Saisie d'une note
    cy.get('#save-button').click();   // Clique sur le bouton de sauvegarde
  });
  
  Cypress.Commands.add('deleteNote', (note) => {
    cy.get('.delete-btn').click(); // Clique sur le bouton de suppression
    cy.get('.note').should('not.contain', note); // Vérifie que la note est supprimée
  });
  