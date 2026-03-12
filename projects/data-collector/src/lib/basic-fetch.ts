export abstract class BasicAPIFetch {
  protected constructor(
    private readonly apiBaseUrl: string,
    private readonly headers: RequestInit["headers"] = { },
  ) { }

  protected async get<TResponse>(endpoint: string, query?: URLSearchParams): Promise<TResponse | number> {
    const normalizedEndpoint = endpoint.replace(/^\/+/, "");
    const url = new URL(`${this.apiBaseUrl}/${normalizedEndpoint}`);
    if(query) {
      url.search = query.toString();
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
      },
    });

    if(!response.ok) {
      console.error(`API request failed: ${response.status} ${response.statusText}`);
      return response.status;
    }

    return await response.json() as TResponse;
  }
}
