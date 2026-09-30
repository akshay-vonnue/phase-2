export async function customFetch(
  url: string,
  method: string,
  body?: Record<string, unknown>,
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, options);
  console.log(`${import.meta.env.VITE_API_BASE_URL}${url}`)


  if (!response.ok) {
    return new Error(`HTTP error: status:${response.status} ${response}`);
  }

  return await response.json();
}
