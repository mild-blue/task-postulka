import { renderHook, act, waitFor } from '@testing-library/react-native';
import useFetch from '@/hooks/useFetch';

describe('useFetch custom hook', () => {
  it('fetches on mount and sets data', async (): Promise<void> => {
    const fetchFn = jest.fn().mockResolvedValueOnce(['cat']);
    const { result } = renderHook(() => useFetch(fetchFn));

    expect(fetchFn).toHaveBeenCalledTimes(1);
    // loading flips to true after effect runs; allow a tick
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(['cat']);
    expect(result.current.error).toBeNull();
  });

  it('sets error when fetch rejects', async (): Promise<void> => {
    const err = new Error('boom');
    const fetchFn = jest.fn().mockRejectedValueOnce(err);
    const { result } = renderHook(() => useFetch(fetchFn));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe(err);
    expect(result.current.data).toBeNull();
  });

  it('refetch updates data', async (): Promise<void> => {
    const fetchFn = jest
      .fn()
      .mockResolvedValueOnce(['first'])
      .mockResolvedValueOnce(['second']);

    const { result } = renderHook(() => useFetch(fetchFn));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(['first']);
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(['second']);
    expect(result.current.error).toBeNull();
  });
});
