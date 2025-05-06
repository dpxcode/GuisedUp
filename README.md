# GuisedUp Shopping

A full-stack e-commerce application with shopping cart and wallet functionality.

## Project Structure

```
gusip/
├── backend/           # Node.js/Express.js backend
│   ├── src/          # Source code
│   ├── package.json  # Backend dependencies
│   └── README.md     # Backend documentation
├── frontend/         # React/TypeScript frontend
│   ├── src/         # Source code
│   ├── public/      # Static files
│   └── package.json # Frontend dependencies
└── README.md        # Project documentation
```

## Features

- Product listing and details
- Shopping cart management
- Wallet system with balance tracking
- Order history
- Responsive design

## High-Level Design (HLD)

### a. Components Required in Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            Client Layer                                  │
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐ │
│  │  Web App    │    │ Mobile App  │    │  Admin UI   │    │  CDN     │ │
│  │ (React)     │    │ (React      │    │ (React)     │    │ (Cloud   │ │
│  │             │    │ Native)     │    │             │    │ Front)   │ │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘    └────┬─────┘ │
│         │                  │                   │                 │       │
└─────────┼──────────────────┼───────────────────┼─────────────────┼───────┘
          │                  │                   │                 │
┌─────────┼──────────────────┼───────────────────┼─────────────────┼───────┐
│         │                  │                   │                 │       │
│  ┌──────┴──────┐    ┌─────┴──────┐    ┌──────┴──────┐    ┌─────┴─────┐ │
│  │ API Gateway │    │  Load      │    │  API        │    │  WAF      │ │
│  │ (AWS)       │    │  Balancer  │    │  Gateway    │    │  (AWS)    │ │
│  └──────┬──────┘    └─────┬──────┘    └──────┬──────┘    └─────┬─────┘ │
│         │                  │                   │                 │       │
└─────────┼──────────────────┼───────────────────┼─────────────────┼───────┘
          │                  │                   │                 │
┌─────────┼──────────────────┼───────────────────┼─────────────────┼───────┐
│         │                  │                   │                 │       │
│  ┌──────┴──────┐    ┌─────┴──────┐    ┌──────┴──────┐    ┌─────┴─────┐ │
│  │  Backend    │    │  Cache     │    │  Auth       │    │  Search    │ │
│  │ Services    │    │  (Redis)   │    │  Service    │    │  Service   │ │
│  └──────┬──────┘    └─────┬──────┘    └──────┬──────┘    └─────┬─────┘ │
│         │                  │                   │                 │       │
└─────────┼──────────────────┼───────────────────┼─────────────────┼───────┘
          │                  │                   │                 │
┌─────────┼──────────────────┼───────────────────┼─────────────────┼───────┐
│         │                  │                   │                 │       │
│  ┌──────┴──────┐    ┌─────┴──────┐    ┌──────┴──────┐    ┌─────┴─────┐ │
│  │  Database   │    │  File      │    │  Message    │    │  Logging   │ │
│  │ (DynamoDB)  │    │  Storage   │    │  Queue      │    │  Service   │ │
│  │             │    │  (S3)      │    │  (SQS)      │    │  (Cloud    │ │
│  └─────────────┘    └────────────┘    └─────────────┘    └───────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### b. AWS Optimizations

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            AWS Optimization Layer                        │
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐ │
│  │  Auto       │    │  Cloud      │    │  Elastic    │    │  AWS     │ │
│  │  Scaling    │    │  Watch      │    │  Cache      │    │  WAF     │ │
│  │  Groups     │    │  Metrics    │    │  (Redis)    │    │          │ │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘    └────┬─────┘ │
│         │                  │                   │                 │       │
└─────────┼──────────────────┼───────────────────┼─────────────────┼───────┘
          │                  │                   │                 │
┌─────────┼──────────────────┼───────────────────┼─────────────────┼───────┐
│         │                  │                   │                 │       │
│  ┌──────┴──────┐    ┌─────┴──────┐    ┌──────┴──────┐    ┌─────┴─────┐ │
│  │  Route 53   │    │  Cloud     │    │  AWS        │    │  AWS      │ │
│  │  (DNS)      │    │  Front     │    │  Shield     │    │  KMS      │ │
│  └──────┬──────┘    └─────┬──────┘    └──────┬──────┘    └─────┬─────┘ │
│         │                  │                   │                 │       │
└─────────┼──────────────────┼───────────────────┼─────────────────┼───────┘
          │                  │                   │                 │
┌─────────┼──────────────────┼───────────────────┼─────────────────┼───────┐
│         │                  │                   │                 │       │
│  ┌──────┴──────┐    ┌─────┴──────┐    ┌──────┴──────┐    ┌─────┴─────┐ │
│  │  AWS        │    │  AWS       │    │  AWS        │    │  AWS       │ │
│  │  Lambda     │    │  S3        │    │  SQS        │    │  Cloud     │ │
│  │  (Serverless│    │  (Storage) │    │  (Queues)   │    │  Trail     │ │
│  └─────────────┘    └────────────┘    └─────────────┘    └───────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

Key AWS Optimizations:
1. **Scalability & Performance**
   - Auto Scaling Groups for dynamic resource allocation
   - CloudFront for global content delivery
   - Elastic Cache (Redis) for session management and caching
   - Route 53 for DNS management and traffic routing

2. **Security**
   - AWS WAF for web application firewall
   - AWS Shield for DDoS protection
   - AWS KMS for key management
   - CloudTrail for audit logging

3. **Monitoring & Management**
   - CloudWatch for metrics and monitoring
   - SQS for message queuing
   - Lambda for serverless functions
   - S3 for static file storage

### c. Deployment Choices

#### 1. Containerization with AWS ECS
- **Pros**:
  - Consistent environment across development and production
  - Easy scaling and management
  - Integration with AWS services
  - Cost-effective for microservices
- **Implementation**:
  - Docker containers for both frontend and backend
  - ECS Fargate for serverless container management
  - ECR for container registry

#### 2. Serverless Architecture with AWS Lambda
- **Pros**:
  - Pay-per-use pricing model
  - Automatic scaling
  - No server management
  - High availability
- **Implementation**:
  - API Gateway + Lambda for backend services
  - S3 + CloudFront for frontend static files
  - DynamoDB for database

#### 3. Traditional EC2 Deployment
- **Pros**:
  - Full control over the environment
  - Predictable pricing
  - Easy to implement
- **Implementation**:
  - EC2 instances for both frontend and backend
  - Auto Scaling Groups for load management
  - RDS for database

#### Recommended Deployment Strategy
For this application, we recommend a hybrid approach:
1. **Frontend**: 
   - Static files served via S3 + CloudFront
   - CI/CD pipeline using AWS CodePipeline
   - Automated deployments using AWS CodeBuild

2. **Backend**:
   - Containerized deployment using ECS Fargate
   - Auto Scaling based on CloudWatch metrics
   - Multi-AZ deployment for high availability

3. **Database**:
   - DynamoDB for main data storage
   - Redis (ElastiCache) for caching
   - S3 for file storage

4. **Monitoring & Management**:
   - CloudWatch for metrics and logging
   - AWS X-Ray for distributed tracing
   - CloudTrail for audit logging

## Low-Level Design (LLD) Constraints and Implementation

### 1. Code Structure and Organization

```
src/
├── config/                 # Configuration files
│   ├── aws.config.ts      # AWS service configurations
│   ├── constants.ts       # Application constants
│   └── secrets.ts         # Environment variables and secrets
├── services/              # External service integrations
│   ├── aws/              # AWS service clients
│   │   ├── dynamodb.ts
│   │   ├── s3.ts
│   │   └── cognito.ts
│   └── third-party/      # Other service integrations
├── models/               # Data models and interfaces
│   ├── user.ts
│   ├── product.ts
│   └── order.ts
├── utils/               # Utility functions
│   ├── validation.ts
│   ├── error-handling.ts
│   └── logging.ts
├── middleware/          # Express middleware
│   ├── auth.ts
│   ├── rate-limit.ts
│   └── error.ts
└── routes/             # API routes
    ├── products.ts
    ├── cart.ts
    └── orders.ts
```

#### Key Implementation Patterns:
1. **Service Layer Pattern**
```typescript
// services/aws/dynamodb.ts
import { DynamoDB } from 'aws-sdk';
import { config } from '../config/aws.config';

export class DynamoDBService {
  private client: DynamoDB.DocumentClient;

  constructor() {
    this.client = new DynamoDB.DocumentClient(config);
  }

  async getItem(params: DynamoDB.DocumentClient.GetItemInput) {
    try {
      return await this.client.get(params).promise();
    } catch (error) {
      this.handleError(error);
    }
  }
}
```

2. **Constants and Configuration**
```typescript
// config/constants.ts
export const API_CONSTANTS = {
  MAX_RETRIES: 3,
  TIMEOUT: 5000,
  CACHE_TTL: 3600,
};

// config/secrets.ts
import * as dotenv from 'dotenv';
dotenv.config();

export const AWS_CONFIG = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
```

### 2. AWS Service Integration

#### Data Generation and Storage
```typescript
// services/data/generator.ts
import { faker } from '@faker-js/faker';
import { DynamoDBService } from '../aws/dynamodb';

export class DataGenerator {
  private dynamoDB: DynamoDBService;

  async generateProducts(count: number) {
    const products = Array(count).fill(null).map(() => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      image: faker.image.url(),
    }));

    await this.dynamoDB.batchWrite({
      RequestItems: {
        'Products': products.map(product => ({
          PutRequest: { Item: product }
        }))
      }
    });
  }
}
```

### 3. Authentication and Security

#### AWS Cognito Integration
```typescript
// services/auth/cognito.ts
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { config } from '../config/aws.config';

export class AuthService {
  private cognito: CognitoIdentityServiceProvider;

  constructor() {
    this.cognito = new CognitoIdentityServiceProvider(config);
  }

  async authenticateUser(username: string, password: string) {
    try {
      const result = await this.cognito.initiateAuth({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID!,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      }).promise();

      return this.handleAuthResponse(result);
    } catch (error) {
      this.handleAuthError(error);
    }
  }
}
```

#### Security Measures:
1. **JWT Token Validation**
```typescript
// middleware/auth.ts
import { verify } from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
```

### 4. Service Degradation Guard Rails

#### Circuit Breaker Pattern
The system implements the Circuit Breaker pattern to prevent cascading failures and provide graceful degradation. Key features include:

1. **Failure Threshold**
   - Configurable failure count limit
   - Automatic circuit opening
   - Timeout-based reset
   - State monitoring

2. **Fallback Mechanisms**
   - Alternative service providers
   - Cached responses
   - Graceful degradation
   - Service recovery

3. **Monitoring**
   - Circuit state tracking
   - Failure rate monitoring
   - Recovery metrics
   - Performance impact analysis

4. **Implementation Strategy**
   - Service-level circuit breakers
   - Dependency isolation
   - Automatic recovery
   - Health check integration

### 5. Performance Monitoring and SLA Metrics

#### CloudWatch Metrics Integration
```typescript
// utils/metrics.ts
import { CloudWatch } from 'aws-sdk';

export class MetricsCollector {
  private cloudWatch: CloudWatch;

  async recordMetric(
    namespace: string,
    metricName: string,
    value: number,
    dimensions: Record<string, string>
  ) {
    await this.cloudWatch.putMetricData({
      Namespace: namespace,
      MetricData: [{
        MetricName: metricName,
        Value: value,
        Dimensions: Object.entries(dimensions).map(([Name, Value]) => ({
          Name,
          Value
        }))
      }]
    }).promise();
  }
}
```

#### Key Performance Indicators (KPIs):
1. **Response Time Metrics**
```typescript
// middleware/metrics.ts
export const responseTimeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    metrics.recordMetric('API', 'ResponseTime', duration, {
      route: req.path,
      method: req.method
    });
  });

  next();
};
```

2. **Error Rate Monitoring**
```typescript
// utils/error-handling.ts
export const errorHandler = (error: Error, req: Request, res: Response) => {
  metrics.recordMetric('API', 'ErrorRate', 1, {
    route: req.path,
    errorType: error.name
  });

  // Log error details
  logger.error({
    message: error.message,
    stack: error.stack,
    route: req.path,
    method: req.method
  });

  res.status(500).json({ error: 'Internal server error' });
};
```

#### SLA Monitoring Dashboard:
1. **Response Time SLA**: 95% of requests under 200ms
2. **Error Rate SLA**: Less than 1% error rate
3. **Availability SLA**: 99.9% uptime
4. **Throughput SLA**: Handle 1000 requests per second

#### Bottleneck Identification:
1. **Database Performance**
   - Monitor DynamoDB read/write capacity
   - Track query execution times
   - Identify hot partitions

2. **API Performance**
   - Track endpoint response times
   - Monitor concurrent connections
   - Identify slow queries

3. **Cache Performance**
   - Monitor cache hit/miss ratios
   - Track cache eviction rates
   - Measure cache response times

## Incident Response and Troubleshooting

### OTP Service Outage: A Case Study

#### 1. Initial Triage and Communication

**Immediate Actions:**
1. **Incident Declaration**
   - Declare a P1 incident (Critical - Service Impacting)
   - Activate the incident response team
   - Set up a war room for real-time collaboration

2. **Stakeholder Communication**
```typescript
// utils/incident-notification.ts
export class IncidentNotifier {
  async notifyStakeholders(incident: Incident) {
    // Notify technical team
    await this.notifySlackChannel('tech-alerts', {
      severity: incident.severity,
      description: incident.description,
      impact: incident.impact
    });

    // Notify business stakeholders
    await this.notifyEmailGroup('business-stakeholders', {
      subject: `[URGENT] ${incident.title}`,
      body: this.generateBusinessUpdate(incident)
    });

    // Update status page
    await this.updateStatusPage(incident);
  }
}
```

3. **Customer Communication**
   - Deploy a maintenance banner on the application
   - Update social media channels
   - Prepare customer support scripts

#### 2. Root Cause Analysis

**Monitoring and Logging Tools:**
```typescript
// utils/monitoring.ts
export class MonitoringService {
  async analyzeOTPFlow() {
    // Check AWS CloudWatch metrics
    const metrics = await this.cloudWatch.getMetricData({
      MetricDataQueries: [
        {
          Id: 'otpRequests',
          MetricStat: {
            Metric: {
              Namespace: 'OTP',
              MetricName: 'RequestCount'
            },
            Period: 300,
            Stat: 'Sum'
          }
        },
        {
          Id: 'otpFailures',
          MetricStat: {
            Metric: {
              Namespace: 'OTP',
              MetricName: 'FailureCount'
            },
            Period: 300,
            Stat: 'Sum'
          }
        }
      ]
    }).promise();

    // Analyze logs
    const logs = await this.cloudWatchLogs.filterLogEvents({
      logGroupName: '/aws/lambda/otp-service',
      filterPattern: 'ERROR|FAILURE|EXCEPTION',
      startTime: Date.now() - 3600000 // Last hour
    }).promise();

    return this.analyzeMetricsAndLogs(metrics, logs);
  }
}
```

**Diagnostic Checklist:**
1. **Infrastructure Layer**
   - Check AWS SES/SNS quotas and limits
   - Verify IAM permissions
   - Monitor network connectivity
   - Check region availability

2. **Application Layer**
   - Review OTP service logs
   - Check rate limiting
   - Verify message templates
   - Test authentication flows

3. **Third-Party Services**
   - Verify SMS gateway status
   - Check email service provider
   - Monitor API response times
   - Validate credentials

#### 3. Service Differentiation

**Failure Pattern Analysis:**
```typescript
// utils/diagnostic.ts
export class DiagnosticService {
  async identifyFailureType() {
    // Infrastructure Check
    const infraStatus = await this.checkInfrastructure();
    
    // Code Check
    const codeStatus = await this.analyzeCode();
    
    // Third-Party Check
    const thirdPartyStatus = await this.verifyThirdPartyServices();

    return {
      isInfrastructure: infraStatus.hasIssues,
      isCode: codeStatus.hasIssues,
      isThirdParty: thirdPartyStatus.hasIssues,
      details: {
        infrastructure: infraStatus.details,
        code: codeStatus.details,
        thirdParty: thirdPartyStatus.details
      }
    };
  }
}
```

#### 4. Immediate and Future-Proof Fixes

**Short-term Mitigation:**
```typescript
// services/otp/fallback.ts
export class OTPFallbackService {
  private primaryProvider: OTPProvider;
  private secondaryProvider: OTPProvider;
  private cache: CacheService;

  async sendOTP(userId: string) {
    try {
      // Try primary provider
      return await this.primaryProvider.sendOTP(userId);
    } catch (error) {
      // Fallback to secondary provider
      return await this.secondaryProvider.sendOTP(userId);
    }
  }
}
```

**Long-term Improvements:**
1. **Resilience Patterns**
```typescript
// utils/circuit-breaker.ts
export class OTPServiceCircuitBreaker extends CircuitBreaker {
  constructor() {
    super({
      failureThreshold: 5,
      resetTimeout: 60000,
      fallback: async () => {
        // Implement fallback mechanism
        return this.fallbackProvider.sendOTP();
      }
    });
  }
}
```

2. **Monitoring Enhancements**
```typescript
// utils/health-check.ts
export class OTPHealthCheck {
  async performHealthCheck() {
    return {
      status: await this.checkServiceStatus(),
      metrics: await this.collectMetrics(),
      dependencies: await this.checkDependencies(),
      lastIncident: await this.getLastIncident()
    };
  }
}
```

#### 5. Preventative Strategies

**Implementation Plan:**
1. **Automated Testing**
```typescript
// tests/otp-service.test.ts
describe('OTP Service', () => {
  it('should handle provider failures gracefully', async () => {
    const mockProvider = new MockOTPProvider();
    mockProvider.failNextRequest();
    
    const service = new OTPService(mockProvider);
    const result = await service.sendOTP('test-user');
    
    expect(result).toHaveProperty('fallbackUsed', true);
  });
});
```

2. **Rate Limiting and Quota Management**
```typescript
// middleware/rate-limit.ts
export const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many OTP requests, please try again later'
});
```

3. **Alerting System**
```typescript
// utils/alerting.ts
export class OTPAlertingSystem {
  async setupAlerts() {
    await this.cloudWatch.putMetricAlarm({
      AlarmName: 'OTP-Failure-Rate',
      MetricName: 'FailureCount',
      Namespace: 'OTP',
      Statistic: 'Sum',
      Period: 300,
      EvaluationPeriods: 2,
      Threshold: 10,
      ComparisonOperator: 'GreaterThanThreshold',
      AlarmActions: ['arn:aws:sns:region:account-id:otp-alerts']
    }).promise();
  }
}
```

**Preventative Measures:**
1. **Regular Health Checks**
   - Automated daily testing of OTP flow
   - Provider status monitoring
   - Quota usage tracking

2. **Capacity Planning**
   - Monitor growth trends
   - Set up auto-scaling
   - Implement request queuing

3. **Documentation and Runbooks**
   - Incident response procedures
   - Troubleshooting guides
   - Recovery steps

4. **Training and Drills**
   - Regular incident response drills
   - Cross-team training
   - Post-mortem reviews

## Saga Pattern Implementation with Choreography and Kafka

### Architecture Overview

The system implements a distributed transaction management pattern using the Saga pattern with choreography. This approach ensures reliable processing of business transactions across multiple microservices while maintaining data consistency.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            Event-Driven Architecture                     │
│                                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐ │
│  │  Order      │    │  Payment    │    │  Inventory  │    │  Kafka   │ │
│  │  Service    │    │  Service    │    │  Service    │    │  Broker  │ │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘    └────┬─────┘ │
│         │                  │                   │                 │       │
└─────────┼──────────────────┼───────────────────┼─────────────────┼───────┘
          │                  │                   │                 │
┌─────────┼──────────────────┼───────────────────┼─────────────────┼───────┐
│         │                  │                   │                 │       │
│  ┌──────┴──────┐    ┌─────┴──────┐    ┌──────┴──────┐    ┌─────┴─────┐ │
│  │  Order      │    │  Payment   │    │  Inventory  │    │  Event    │ │
│  │  Created    │    │  Processed │    │  Updated    │    │  Store    │ │
│  └─────────────┘    └────────────┘    └─────────────┘    └───────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Components

1. **Kafka Integration**
   - Central message broker for event communication
   - Topics for different event types (Order, Payment, Inventory)
   - Secure communication with SSL and SASL authentication
   - Configurable brokers and client settings

2. **Saga Event Handlers**
   - Order Service: Initiates the saga and manages order lifecycle
   - Payment Service: Handles payment processing and validation
   - Inventory Service: Manages stock updates and reservations
   - Event-driven communication between services

3. **Compensation Logic**
   - Automatic rollback mechanisms for failed transactions
   - Compensation handlers for each service
   - Event-based compensation triggers
   - Transaction recovery procedures

4. **Event Store**
   - Persistent storage of all domain events
   - Event sourcing implementation
   - Version control for events
   - Audit trail for all transactions

### Benefits

1. **Reliability**
   - Loose coupling between services
   - Guaranteed message delivery
   - Graceful failure handling
   - Transaction consistency

2. **Scalability**
   - Independent service scaling
   - Kafka's partitioning enables parallel processing
   - Event sourcing provides audit trail

3. **Maintainability**
   - Clear service boundaries
   - Easy service addition
   - Simplified debugging
   - Event-based logging

4. **Resilience**
   - Automatic retry mechanisms
   - Dead letter queues
   - Circuit breakers
   - Service protection

### Monitoring and Observability

The system implements comprehensive monitoring through:
- CloudWatch metrics for saga progress
- Performance tracking
- Error rate monitoring
- Transaction duration analysis
- Service health checks

### Best Practices

1. **Event Design**
   - Immutable event structure
   - Correlation IDs for tracking
   - Event versioning
   - Clear event schemas

2. **Error Handling**
   - Configurable retry policies
   - Dead letter queue management
   - Compensation logging
   - Error tracking

3. **Performance**
   - Event batching
   - Efficient serialization
   - Backlog monitoring
   - Resource optimization

4. **Security**
   - Data encryption
   - Access control
   - Event auditing
   - Secure communication

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dpxcode/GuisedUp.git
cd GuisedUp
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```
The backend will run on http://localhost:8000

2. Start the frontend development server:
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3001

## API Endpoints

### Products
- `GET /products` - Get all products

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
- `POST /checkout` - Process checkout

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 