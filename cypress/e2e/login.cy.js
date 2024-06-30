/**
 * - Login spec
 *   - should display login page correctly
 *   - should display error when not input email or password
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should redirect to homepage(threads page) when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config().baseUrl}/login`);
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[data-testid="email"]').should('be.visible');
    cy.get('input[data-testid="password"]').should('be.visible');
    cy.get('[data-testid="login-button"]').should('be.visible');
    cy.get('[data-testid="nav-login"]').should('be.visible');
    cy.get('[data-testid="nav-Threads"]').should('be.visible');
    cy.get('[data-testid="nav-Leaderboards"]').should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('[data-testid="login-button"]').click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('[data-testid="login-button"]').click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('input[data-testid="email"]').type('wrong_email');
 
    // mengisi password yang salah
    cy.get('input[data-testid="password"]').type('wrong_password');
 
    // menekan tombol Login
    cy.get('[data-testid="login-button"]').click();
 
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should redirect to homepage when email and password are correct', () => {
    // cy.visit('/login');
    // mengisi email
    cy.get('input[data-testid="email"]').type('test555@gmail.com');
 
    // mengisi password
    cy.get('input[data-testid="password"]').type('password');
 
    // menekan tombol Login
    cy.get('[data-testid="login-button"]').click();
 
    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('[data-testid="nav-logout"]').should('be.visible');
    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
  });
});