# GuisedUp Shopping

A full-stack e-commerce application with shopping cart and wallet functionality.

## Features

### Core Functionality
- Product listing and details
- Shopping cart management
- Wallet system with balance tracking
- Order history
- Responsive design

### Advanced Features
- Real-time inventory updates
- Order tracking
- In-memory data storage for easy testing

## Architecture

The application follows a simple but effective architecture:

1. **Frontend**
   - React-based single-page application
   - Responsive design
   - State management for cart and wallet
   - Real-time updates for inventory

2. **Backend**
   - Node.js REST API
   - Express framework
   - In-memory storage for products, cart, and wallet
   - RESTful endpoints for all operations

## Saga Pattern Implementation

The system implements a distributed transaction management pattern using the Saga pattern with choreography. This approach ensures reliable processing of business transactions across multiple services while maintaining data consistency.

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

## API Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product details

### Cart
- `GET /cart` - Get cart contents
- `POST /cart/add` - Add item to cart
- `POST /cart/remove` - Remove item from cart
- `POST /cart/update` - Update item quantity
- `GET /cart/validate` - Validate cart for checkout

### Wallet
- `GET /wallet` - Get wallet balance and transactions
- `POST /wallet/add` - Add funds to wallet

### Orders
- `GET /orders` - Get order history
- `GET /orders/:id` - Get order details
- `POST /checkout` - Process checkout
- `PUT /orders/:id` - Update order status

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/dpxcode/GuisedUp.git
   cd GuisedUp
   ```

2. Install dependencies for both frontend and backend
3. Start the backend server (runs on port 8000)
4. Start the frontend development server (runs on port 3001)
5. Access the application at http://localhost:3001

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. 