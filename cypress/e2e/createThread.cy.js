/**
 * - Create Thread spec
 *   - should not display thread page when user not login
 *   - should display create thread page properly
 *   - should display error when not input title or body
 *   - should redirect to homepage(threads page) when input title and body
 */


describe('Create Thread spec', () => {
  const DUMMY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItNXMtVWxib3VKWHc4NExuTiIsImlhdCI6MTcxOTczNzc5OX0.1VALO__2rY7796Zal8OZth4wrXon0DznBfZ7ZPKWBXc';
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/new', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accessToken', DUMMY_TOKEN);
      }
    });

  });

  it('should navigate to homepage when user not login', () => {
    // Remove accessToken from localStorage
    window.localStorage.removeItem('accessToken');

    cy.get('[data-testid="nav-login"]').should('be.visible');
    cy.get('[data-testid="nav-Threads"]').should('be.visible');
    cy.get('[data-testid="nav-Leaderboards"]').should('be.visible');
  });

  it('should display create thread page properly when user login', () => {
    // should display create thread page
    cy.get('input[data-testid="title"]').should('be.visible');
    cy.get('input[data-testid="category"]').should('be.visible');
    cy.get('div[data-testid="body"]').should('be.visible');
    cy.get('[data-testid="nav-logout"]').should('be.visible');
    cy.get('[data-testid="nav-Threads"]').should('be.visible');
    cy.get('[data-testid="nav-Leaderboards"]').should('be.visible');
  });

  it('should display error when not input title', () => {
    cy.get('[data-testid="create-button"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"title" is not allowed to be empty');
    });
    
  });

  it('should display error when not input body', () => {
    cy.get('input[data-testid="title"]').type('title');

    cy.get('[data-testid="create-button"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"body" is not allowed to be empty');
    });
    
  });

  it('should success when input title and body', () => {
    const newText = 'New content';
    cy.get('input[data-testid="title"]').type('title');
    cy.get('input[data-testid="category"]').type('category');
    cy.get('[data-testid="body"]')
      .should('have.attr', 'contenteditable', 'true')
      .type(newText)
      .then(($div) => {
        expect($div.text()).to.equal(newText);
      });
    cy.get('[data-testid="create-button"]').click();

    cy.get('[data-testid="nav-logout"]').should('be.visible');
    cy.get('[data-testid="nav-Threads"]').should('be.visible');
    cy.get('[data-testid="nav-Leaderboards"]').should('be.visible');
  });

});