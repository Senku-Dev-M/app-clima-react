import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../../hooks/useFetch';

global.fetch = jest.fn();

describe('useFetch', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useFetch(null));
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should set isLoading to true when fetching', () => {
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    const { result } = renderHook(() => useFetch('https://api.example.com/data'));
    expect(result.current.isLoading).toBe(true);
  });

  it('should return data on successful fetch', async () => {
    const mockData = { message: 'Success' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
    });
  });

  it('should return error on failed fetch', async () => {
    const errorMessage = 'Request failed';
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: errorMessage }),
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it('should return a specific error message for 404 status', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBe('No se encontraron datos del clima para esta ciudad. Por favor, revisa el nombre.');
    });
  });
});