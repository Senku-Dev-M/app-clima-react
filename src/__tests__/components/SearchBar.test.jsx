
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../components/SearchBar';

describe('SearchBar', () => {
  it('should render input and button', () => {
    render(<SearchBar />);
    expect(screen.getByRole('textbox', { name: /buscar ciudad/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('should allow user to type in the input', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByRole('textbox', { name: /buscar ciudad/i });
    await user.type(input, 'New York');
    expect(input).toHaveValue('New York');
  });

  it('should call onSearch with the input value on submit', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    const input = screen.getByRole('textbox', { name: /buscar ciudad/i });
    const button = screen.getByRole('button', { name: /buscar/i });

    await user.type(input, 'London');
    await user.click(button);

    expect(handleSearch).toHaveBeenCalledWith('London');
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('should not call onSearch if input is empty', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    const button = screen.getByRole('button', { name: /buscar/i });

    await user.click(button);

    expect(handleSearch).not.toHaveBeenCalled();
  });

  it('should not call onSearch if input is only whitespace', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    const input = screen.getByRole('textbox', { name: /buscar ciudad/i });
    const button = screen.getByRole('button', { name: /buscar/i });

    await user.type(input, '   ');
    await user.click(button);

    expect(handleSearch).not.toHaveBeenCalled();
  });

  it('should clear the input after submission', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByRole('textbox', { name: /buscar ciudad/i });
    const button = screen.getByRole('button', { name: /buscar/i });

    await user.type(input, 'Paris');
    await user.click(button);

    expect(input).toHaveValue('');
  });
});
