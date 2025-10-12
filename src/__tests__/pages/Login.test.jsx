
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import { AuthContext } from '../../context/AuthContext';

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login', () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockNavigate.mockClear();
  });

  const renderWithProviders = (ui) => {
    return render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={ui} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it('should render form elements', () => {
    renderWithProviders(<Login />);
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should allow user to type in fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call login and navigate on successful submission', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce(); // Simula una función de login exitosa

    renderWithProviders(<Login />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockLogin).toHaveBeenCalledTimes(1);
    });
    
    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should display an error message on failed login', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Invalid credentials';
    mockLogin.mockRejectedValueOnce(new Error(errorMessage));

    renderWithProviders(<Login />);

    await user.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
