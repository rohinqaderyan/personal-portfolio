/**
 * API Error Handler
 * @module errorHandler
 * @description Centralized error handling for API routes
 */
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * HTTP Error Response
 */
export interface ErrorResponse {
  error: string;
  details?: Record<string, any> | string[];
  timestamp?: string;
  path?: string;
}

/**
 * Standard API error codes
 */
export enum ErrorCode {
  INVALID_INPUT = 'INVALID_INPUT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  SERVER_ERROR = 'SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  BAD_REQUEST = 'BAD_REQUEST',
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: ErrorCode,
    message: string,
    public details?: Record<string, any> | string[]
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  statusCode: number,
  message: string,
  details?: Record<string, any> | string[],
  path?: string
): ErrorResponse {
  return {
    error: message,
    ...(details && { details }),
    timestamp: new Date().toISOString(),
    ...(path && { path }),
  };
}

/**
 * Handle API errors and return standardized JSON response
 */
export function handleApiError(error: unknown, path?: string) {
  console.error('[API Error]', error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      createErrorResponse(
        400,
        'Validation failed',
        error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
          code: e.code,
        })),
        path
      ),
      { status: 400 }
    );
  }

  // Handle custom API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      createErrorResponse(error.statusCode, error.message, error.details, path),
      { status: error.statusCode }
    );
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    // Check for specific error patterns
    if (error.message.includes('JSON.parse')) {
      return NextResponse.json(
        createErrorResponse(400, 'Invalid JSON in request body', undefined, path),
        { status: 400 }
      );
    }

    if (error.message.includes('fetch')) {
      return NextResponse.json(
        createErrorResponse(
          503,
          'External service unavailable',
          { originalError: error.message },
          path
        ),
        { status: 503 }
      );
    }

    return NextResponse.json(
      createErrorResponse(
        500,
        process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
        undefined,
        path
      ),
      { status: 500 }
    );
  }

  // Handle unknown errors
  return NextResponse.json(
    createErrorResponse(
      500,
      'An unexpected error occurred',
      {
        errorType: typeof error,
        errorValue: String(error),
      },
      path
    ),
    { status: 500 }
  );
}

/**
 * Validate HTTP method
 */
export function validateMethod(allowedMethods: string[], actualMethod?: string): ApiError | null {
  if (!actualMethod || !allowedMethods.includes(actualMethod)) {
    return new ApiError(
      405,
      ErrorCode.BAD_REQUEST,
      `Method ${actualMethod || 'unknown'} not allowed`,
      { allowed: allowedMethods }
    );
  }
  return null;
}

/**
 * Safely parse JSON request body
 */
export async function parseJsonBody(request: Request): Promise<unknown> {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      throw new ApiError(400, ErrorCode.BAD_REQUEST, 'Content-Type must be application/json');
    }

    const body = await request.json();
    if (!body || typeof body !== 'object') {
      throw new ApiError(400, ErrorCode.BAD_REQUEST, 'Request body must be a JSON object');
    }

    return body;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(400, ErrorCode.INVALID_INPUT, 'Failed to parse request body');
  }
}

/**
 * Check for required environment variables
 */
export function checkEnvVariable(name: string, defaultValue?: string): string {
  const value = process.env[name] || defaultValue;
  if (!value) {
    throw new ApiError(
      500,
      ErrorCode.SERVER_ERROR,
      `Required environment variable ${name} is not configured`
    );
  }
  return value;
}

/**
 * Validate request has required fields
 */
export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): string[] {
  const missing = requiredFields.filter((field) => !data[field]);
  if (missing.length > 0) {
    throw new ApiError(400, ErrorCode.INVALID_INPUT, 'Missing required fields', { missing });
  }
  return missing;
}
