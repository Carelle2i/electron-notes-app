// describe('Electron Notes App', () => {
//   it('should load the main window', () => {
//     cy.visit('index.html'); // Charge la page index de ton application Electron

//     // Vérifie que l'élément avec l'ID "note-input" est visible
//     cy.get('#note-input').should('be.visible');
//   });

//   it('should add a note', () => {
//     const note = 'Test Note';

//     // Saisie de la note dans l'input
//     cy.get('#note-input').type(note);

//     // Clique sur le bouton pour enregistrer la note
//     cy.get('#save-button').click();

//     // Vérifie que la note a bien été ajoutée dans la liste
//     cy.get('.note').should('contain', note);
//   });

//   it('should delete a note', () => {
//     const note = 'Note to Delete';

//     // Saisie de la note dans l'input
//     cy.get('#note-input').type(note);

//     // Clique sur le bouton pour enregistrer la note
//     cy.get('#save-button').click();

//     // Clique sur le bouton de suppression (suppose qu'il ait la classe .delete-btn)
//     cy.get('.delete-btn').click();

//     // Vérifie que la note a bien été supprimée
//     cy.get('.note').should('not.contain', note);
//   });
// });
