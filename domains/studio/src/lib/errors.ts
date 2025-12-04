export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function errorResponse(error: unknown) {
  if (error instanceof APIError) {
    return Response.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }

  return Response.json(
    {
      error: 'Unknown error occurred',
    },
    { status: 500 }
  );
}
