export const DEFAULT_TOAST_MESSAGE = {
  loading: 'Loading...',
  success: 'Success',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (err: any) =>
    err?.response?.data?.message ?? 'An error encountered. Please try again',
};
