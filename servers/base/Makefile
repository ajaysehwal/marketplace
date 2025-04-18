.PHONY: dev build run test clean

# Development mode with hot reload
dev:
	@echo "Starting server in development mode with hot reload..."
	@if command -v air >/dev/null 2>&1; then \
		air; \
	else \
		echo "Air is not installed. Installing Air..."; \
		go install github.com/cosmtrek/air@latest; \
		air; \
	fi

# Build the application
build:
	@echo "Building application..."
	go build -o bin/search-engine cmd/api/main.go

# Run the application
run: build
	@echo "Running application..."
	./bin/search-engine

# Run tests
test:
	@echo "Running tests..."
	go test -v ./...

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf bin/ tmp/
	go clean

# Install dependencies
deps:
	@echo "Installing dependencies..."
	go mod download
	go mod tidy

# Generate Swagger documentation
swagger:
	@echo "Generating Swagger documentation..."
	@if command -v swag >/dev/null 2>&1; then \
		swag init -g cmd/api/main.go -o docs/swagger; \
	else \
		echo "Swag is not installed. Installing Swag..."; \
		go install github.com/swaggo/swag/cmd/swag@latest; \
		swag init -g cmd/api/main.go -o docs/swagger; \
	fi 