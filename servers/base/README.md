# Search Engine Service

A production-grade Go microservice for document search and management.

## Features

- Clean Architecture
- RESTful API with Gin
- MongoDB Integration
- JWT Authentication
- Swagger Documentation
- Structured Logging
- Error Handling
- Environment Configuration
- Graceful Shutdown

## Prerequisites

- Go 1.24 or higher
- MongoDB 4.4 or higher
- Make (optional)

## Project Structure

```
.
├── cmd/
│   └── api/            # Application entry point
├── internal/
│   ├── config/         # Configuration
│   ├── domain/         # Domain models
│   ├── handler/        # HTTP handlers
│   ├── middleware/     # Middleware
│   ├── repository/     # Data access layer
│   └── service/        # Business logic
├── pkg/
│   ├── database/       # Database utilities
│   ├── errors/         # Error handling
│   └── logger/         # Logging
├── docs/               # Documentation
├── .env               # Environment variables
├── go.mod             # Go modules
└── README.md          # This file
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/search-engine.git
   cd search-engine
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start MongoDB:
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

## Running the Application

1. Development mode:
   ```bash
   go run cmd/api/main.go
   ```

2. Production mode:
   ```bash
   go build -o search-engine cmd/api/main.go
   ./search-engine
   ```

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:8080/swagger/index.html
```

## API Endpoints

- `POST /api/v1/documents` - Create a new document
- `GET /api/v1/documents/:id` - Get a document by ID
- `PUT /api/v1/documents/:id` - Update a document
- `DELETE /api/v1/documents/:id` - Delete a document
- `GET /api/v1/documents/search` - Search documents
- `GET /api/v1/documents` - List documents

## Authentication

The API uses JWT for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Error Handling

The API returns consistent error responses in the following format:
```json
{
  "code": 400,
  "message": "Error message"
}
```

## Logging

The application uses structured logging with different levels:
- DEBUG: Detailed information for debugging
- INFO: General operational information
- WARN: Warning messages
- ERROR: Error messages

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 