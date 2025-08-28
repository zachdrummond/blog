/**
 * Base class for all application errors
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Authentication and authorization errors
 */
export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, "UNAUTHENTICATED", 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Access denied") {
    super(message, "FORBIDDEN", 403);
  }
}

/**
 * Input validation errors
 */
export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(field ? `${field}: ${message}` : message, "VALIDATION_ERROR", 400);
  }
}

/**
 * Resource not found errors
 */
export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    super(
      identifier
        ? `${resource} with identifier '${identifier}' not found`
        : `${resource} not found`,
      "NOT_FOUND",
      404
    );
  }
}

/**
 * Database operation errors
 */
export class DatabaseError extends AppError {
  constructor(message: string, operation?: string) {
    super(
      operation ? `Database ${operation} failed: ${message}` : message,
      "DATABASE_ERROR",
      500
    );
  }
}
