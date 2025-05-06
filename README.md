# GuisedUp Shopping

A full-stack e-commerce application built with React, Node.js, and AWS services.

## Features

- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart functionality
- Order management
- Payment processing
- Inventory management
- Real-time notifications

## Architecture

The application follows a microservices architecture with the following components:

1. **Frontend**
   - React-based single-page application
   - Responsive design
   - State management with Redux
   - Real-time updates with WebSocket

2. **Backend**
   - Node.js REST API
   - Express framework
   - MongoDB database
   - Redis caching
   - JWT authentication

3. **AWS Integration**
   - S3 for static assets
   - CloudFront for CDN
   - Route 53 for DNS
   - CloudWatch for monitoring
   - Lambda for serverless functions

## Saga Pattern Implementation

The system implements a distributed transaction management pattern using the Saga pattern with choreography. This approach ensures reliable processing of business transactions across multiple microservices while maintaining data consistency.

### Key Components

1. **Kafka Integration**
   - Central message broker for event communication
   - Topics for different event types
   - Secure communication
   - Configurable settings

2. **Saga Event Handlers**
   - Order Service
   - Payment Service
   - Inventory Service
   - Event-driven communication

3. **Compensation Logic**
   - Automatic rollback mechanisms
   - Compensation handlers
   - Event-based triggers
   - Recovery procedures

4. **Event Store**
   - Persistent storage
   - Event sourcing
   - Version control
   - Audit trail

## Circuit Breaker Pattern

The system implements a circuit breaker pattern to prevent cascading failures and provide graceful degradation when services are under stress.

### Key Features

1. **Failure Threshold**
   - Configurable error rate
   - Time-based counting
   - State transitions
   - Health checks

2. **Fallback Mechanisms**
   - Service degradation
   - Cached responses
   - Default values
   - Alternative routing

3. **Monitoring**
   - State tracking
   - Error monitoring
   - Latency measurement
   - Health reporting

4. **Implementation**
   - Service-level breakers
   - Dependency isolation
   - Automatic recovery
   - Manual override

## Getting Started

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the development servers
5. Access the application

## API Endpoints

- Authentication: `/auth/*`
- Products: `/products/*`
- Cart: `/cart/*`
- Orders: `/orders/*`
- Users: `/users/*`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. 