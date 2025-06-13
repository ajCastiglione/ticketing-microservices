# Microservices Ticketing Platform

A modern, scalable microservices-based ticketing platform built with Kubernetes and Skaffold.

## Architecture Overview

This project implements a microservices architecture using Kubernetes for orchestration and Skaffold for development workflow automation. The system is designed to be scalable, maintainable, and follows cloud-native best practices.

### Current Services

- **Auth Service**: Handles user authentication and authorization
  - MongoDB database for user data storage
  - JWT-based authentication
  - RESTful API endpoints

## Prerequisites

- Docker Desktop with Kubernetes enabled
- Skaffold
- kubectl
- Node.js (for local development)

## Project Structure

```
.
├── auth/                 # Authentication service
├── infra/               # Infrastructure configuration
│   └── k8s/            # Kubernetes manifests
│       ├── auth-depl.yml
│       ├── auth-mongo-depl.yml
│       └── ingress-srv.yml
└── skaffold.yml        # Skaffold configuration
```

## Getting Started

1. **Enable Kubernetes in Docker Desktop**
   - Open Docker Desktop
   - Go to Settings > Kubernetes
   - Enable Kubernetes
   - Wait for Kubernetes to start

2. **Run the application using Skaffold**
   ```bash
   skaffold dev
   ```

3. **Access the application**
   The services will be available through the configured ingress.

## Development

### Local Development

Skaffold is configured for local development with the following features:
- Hot reloading for TypeScript files
- Automatic container rebuilding
- Kubernetes deployment automation

### Adding New Services

To add a new service:
1. Create a new service directory
2. Add Dockerfile
3. Create Kubernetes manifests in `infra/k8s/`
4. Update `skaffold.yml` with the new service configuration

## Infrastructure

### Kubernetes Resources

- Deployments for each service
- Services for internal communication
- Ingress for external access
- ConfigMaps and Secrets for configuration

### Database

- MongoDB for the auth service
- Each service can have its own database instance

## Security

- JWT-based authentication
- Secrets management for sensitive data
- Secure communication between services

## API Documentation

### Auth Service API

#### Authentication Endpoints

```typescript
POST /api/users/signup
Content-Type: application/json

Request Body:
{
  email: string;
  password: string;
}

Response:
{
  user: {
    id: string;
    email: string;
  };
  token: string;
}
```

```typescript
POST /api/users/signin
Content-Type: application/json

Request Body:
{
  email: string;
  password: string;
}

Response:
{
  user: {
    id: string;
    email: string;
  };
  token: string;
}
```

```typescript
POST /api/users/signout
Authorization: Bearer <token>

Response:
{
  message: string;
}
```

```typescript
GET /api/users/currentuser
Authorization: Bearer <token>

Response:
{
  currentUser: {
    id: string;
    email: string;
  } | null;
}
```

### Error Responses

All endpoints may return the following error responses:

```typescript
{
  errors: {
    message: string;
    field?: string;
  }[];
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

### Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 