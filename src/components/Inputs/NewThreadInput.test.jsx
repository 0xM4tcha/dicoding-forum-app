/**
 * skenario testing
 *
 * - NewThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call createThread function when Create Button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import NewThreadInput from './NewThreadInput';

expect.extend(matchers);

describe('NewThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<NewThreadInput createThread={() => {}} />);
    const titleInput = screen.getByTestId('title');

    // Action
    await userEvent.type(titleInput, 'ini judul thread');

    // Assert
    expect(titleInput).toHaveValue('ini judul thread');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<NewThreadInput createThread={() => {}} />);
    const categoryInput = screen.getByTestId('category');

    // Action
    await userEvent.type(categoryInput, 'Reactjs');

    // Assert
    expect(categoryInput).toHaveValue('Reactjs');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<NewThreadInput createThread={() => {}} />);
    const contentDiv = screen.getByTestId('body');

    // Action
    await userEvent.type(contentDiv, 'ini body thread');

    // Assert
    expect(contentDiv.textContent).toContain('ini body thread');
  });

  it(' should call comment function when send button is clicked', async () => {
    // Arrange
    const mockCreateThread = vi.fn();
    render(<NewThreadInput createThread={mockCreateThread} />);
    const titleInput = screen.getByTestId('title');
    await userEvent.type(titleInput, 'this is title');
    const categoryInput = screen.getByTestId('category');
    await userEvent.type(categoryInput, 'this is category');
    const bodyDiv = screen.getByTestId('body');
    await userEvent.type(bodyDiv, 'this is body');
    const creteButton = screen.getByTestId('create-button');
    
    // Action
    await userEvent.click(creteButton);
    
    // Assert
    expect(mockCreateThread).toBeCalledWith({
      title: 'this is title',
      category: 'this is category',
      body: 'this is body',
    });
  });

});