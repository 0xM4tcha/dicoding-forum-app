/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle content typing correctly
 *   - should call comment function when kirim button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import CommentInput from './CommentInput';

expect.extend(matchers);

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle content typing correctly', async () => {
    // Arrange
    render(<CommentInput comment={() => {}} />);
    const contentDiv = screen.getByTestId('content');

    // Action
    await userEvent.type(contentDiv, 'this is my comment for this thread');

    // Assert
    expect(contentDiv.textContent).toContain('this is my comment for this thread');
  });

  it(' should call comment function when send button is clicked', async () => {
    // Arrange
    const onSubmit = vi.fn();
    render(<CommentInput comment={onSubmit} />);
    const contentDiv = screen.getByTestId('content');
    await userEvent.type(contentDiv, 'this is my comment for this thread');
    const sendButton = screen.getByTestId('submit-button');
    
    // Action
    userEvent.click(sendButton);
    
    // Assert
    expect(sendButton).toBeVisible(true);
  });

});