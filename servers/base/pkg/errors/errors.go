package errors

import (
	"fmt"
	"net/http"
)

type ErrorCode int

const (
	ErrorCodeUnknown ErrorCode = iota
	ErrorCodeNotFound
	ErrorCodeInvalidInput
	ErrorCodeInternal
	ErrorCodeUnauthorized
	ErrorCodeForbidden
)

type Error struct {
	Code    ErrorCode
	Message string
	Err     error
}

func (e *Error) Error() string {
	if e.Err != nil {
		return fmt.Sprintf("%s: %v", e.Message, e.Err)
	}
	return e.Message
}

func NewError(code ErrorCode, message string, err error) *Error {
	return &Error{
		Code:    code,
		Message: message,
		Err:     err,
	}
}

func (e *Error) HTTPStatusCode() int {
	switch e.Code {
	case ErrorCodeNotFound:
		return http.StatusNotFound
	case ErrorCodeInvalidInput:
		return http.StatusBadRequest
	case ErrorCodeInternal:
		return http.StatusInternalServerError
	case ErrorCodeUnauthorized:
		return http.StatusUnauthorized
	case ErrorCodeForbidden:
		return http.StatusForbidden
	default:
		return http.StatusInternalServerError
	}
}

// Common error types
var (
	ErrBadRequest         = NewError(ErrorCodeInvalidInput, "Bad request", nil)
	ErrUnauthorized       = NewError(ErrorCodeUnauthorized, "Unauthorized", nil)
	ErrForbidden          = NewError(ErrorCodeForbidden, "Forbidden", nil)
	ErrNotFound           = NewError(ErrorCodeNotFound, "Resource not found", nil)
	ErrInternalServer     = NewError(ErrorCodeInternal, "Internal server error", nil)
	ErrServiceUnavailable = NewError(ErrorCodeInternal, "Service unavailable", nil)
)

// Database errors
func NewDatabaseError(err error) *Error {
	return NewError(ErrorCodeInternal, "Database error occurred", err)
}

// Validation errors
func NewValidationError(message string) *Error {
	return NewError(ErrorCodeInvalidInput, message, nil)
}

// Authentication errors
func NewAuthenticationError(message string) *Error {
	return NewError(ErrorCodeUnauthorized, message, nil)
}

// Authorization errors
func NewAuthorizationError(message string) *Error {
	return NewError(ErrorCodeForbidden, message, nil)
}
