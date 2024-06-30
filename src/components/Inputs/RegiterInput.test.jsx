/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call regist function when regist button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import RegisterInput from './RegisterInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput regist={() => {}} />);
    const nameInput = screen.getByTestId('name');

    // Action
    await userEvent.type(nameInput, 'name');

    // Assert
    expect(nameInput).toHaveValue('name');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput regist={() => {}} />);
    const emailInput = screen.getByTestId('email');

    // Action
    await userEvent.type(emailInput, 'myemail@gmail.com');

    // Assert
    expect(emailInput).toHaveValue('myemail@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput regist={() => {}} />);
    const passwordInput = screen.getByTestId('password');

    // Action
    await userEvent.type(passwordInput, 'mypasswordtest');

    // Assert
    expect(passwordInput).toHaveValue('mypasswordtest');
  });

  it('should call regist function when regist button is clicked', async () => {
    // Arrange
    const mockRegist = vi.fn();
    render(<RegisterInput regist={mockRegist} />);
    const nameInput = screen.getByTestId('name');
    await userEvent.type(nameInput, 'name');
    const emailInput = screen.getByTestId('email');
    await userEvent.type(emailInput, 'emailtest@gmail.com');
    const passwordInput = screen.getByTestId('password');
    await userEvent.type(passwordInput, 'passwordtest');
    const registButton = screen.getByRole('button', { name: 'Register' });
 
    // Action
    await userEvent.click(registButton);
 
    // Assert
    expect(mockRegist).toBeCalledWith({
      name: 'name',
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });

});
