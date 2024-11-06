

export function generateURLParams<T>(
  ...values: [keyof T & string, string | unknown | null | undefined][]
): URLSearchParams {
  const searchParams = new URLSearchParams();
  for (const [key, value] of values) {
    if (value !== undefined && value !== null)
      searchParams.append(key, String(value));
  }
  return searchParams;
}
