/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import LoginInput from './LoginInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByTestId('email');

    // Action
    await userEvent.type(emailInput, 'myemail@gmail.com');

    // Assert
    expect(emailInput).toHaveValue('myemail@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByTestId('password');

    // Action
    await userEvent.type(passwordInput, 'mypasswordtest');

    // Assert
    expect(passwordInput).toHaveValue('mypasswordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByTestId('email');
    await userEvent.type(emailInput, 'emailtest@gmail.com');
    const passwordInput = screen.getByTestId('password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = screen.getByRole('button', { name: 'Login' });
 
    // Action
    await userEvent.click(loginButton);
 
    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });

});
