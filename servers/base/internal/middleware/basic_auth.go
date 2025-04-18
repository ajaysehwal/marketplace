package middleware

import (
	"crypto/subtle"
	"encoding/base64"
	"net/http"
	"strings"
)

// BasicAuthMiddleware provides basic authentication for routes
func BasicAuthMiddleware(username, password string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			auth := r.Header.Get("Authorization")
			if auth == "" {
				w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			// Check if the Authorization header has the correct format
			if !strings.HasPrefix(auth, "Basic ") {
				http.Error(w, "Invalid authorization header", http.StatusUnauthorized)
				return
			}

			// Decode the credentials
			payload, err := base64.StdEncoding.DecodeString(auth[6:])
			if err != nil {
				http.Error(w, "Invalid authorization header", http.StatusUnauthorized)
				return
			}

			// Split the credentials
			pair := strings.SplitN(string(payload), ":", 2)
			if len(pair) != 2 {
				http.Error(w, "Invalid authorization header", http.StatusUnauthorized)
				return
			}

			// Compare the credentials using constant-time comparison
			if subtle.ConstantTimeCompare([]byte(pair[0]), []byte(username)) != 1 ||
				subtle.ConstantTimeCompare([]byte(pair[1]), []byte(password)) != 1 {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
