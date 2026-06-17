/// <reference types="vitest/globals" />

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders the input and calls onChange when typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox', { name: '' });
    await user.type(input, 'pikachu');

    expect(handleChange).toHaveBeenCalledTimes(7);
    expect(handleChange).toHaveBeenNthCalledWith(1, 'p');
    expect(handleChange).toHaveBeenNthCalledWith(7, 'u');
  });
});
