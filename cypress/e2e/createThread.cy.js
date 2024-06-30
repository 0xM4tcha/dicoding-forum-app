/**
 * - Create Thread spec
 *   - should navigate to homepage when user not yet login
 *   - should display create thread page properly
 *   - should display error when not input title or body
 *   - should redirect to homepage(threads page) when input title and body
 */


describe('Create Thread spec', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config().baseUrl}/new`);
  });

  it('should navigate to homepage when user not yet login', () => {

  });

  it('should display create thread page properly', () => {
    
  });

  it('should display error when not input title or body', () => {
    
  });

  it('should redirect to homepage(threads page) when input title and body', () => {
    
  });

});