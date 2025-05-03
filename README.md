# POS Padi Express Backend

A robust backend service for managing POS operations, built with Node.js, TypeScript, and Prisma.

## 🚀 Project Overview

POS Padi Express provides a secure and scalable API for handling core features related to transactions, disputes, and notifications within a POS (Point of Sale) ecosystem.

### Key features include:
- Transaction creation, listing, and per-agent analytics
- Dispute management (create, view, update, delete, statistics)
- Notification system with read tracking

## 🛠️ Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **MySQL**
- **Jest** (for testing)


## 📦 Getting Started

### Prerequisites

- Node.js ≥ 16.x
- npm or yarn
- MySQL
- [Prisma CLI](https://www.prisma.io/docs/reference/api-reference/command-reference)


## Installation Instructions

1. Clone the repository:

```bash
git clone https://github.com/InternPulse/pos-padi-express-backend.git
```

2. Change into the parent directory:

```bash
cd pos-padi-express-backend
```

3. Set appropriate values for the following Compulsory Environment Variables:

```txt
# Postgres connection string
DATABASE_URL=""
# Secret key for signing JWTs
JWT_SECRET_KEY=
# API Port
PORT=5000
```

4. Install the App dependencies:

```bash
npm install
```

5. Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

6. Start the App:

```bash
npm run dev
```

The API should now be running locally at [http://localhost:5000/](http://localhost:5000/)

## 📄 API Documentation
You can explore and test the endpoints via the live Postman documentation:

🔗 [View Postman Collection](https://documenter.getpostman.com/view/43614350/2sB2ixjZkQ)

##  🔌 Available Endpoints
Here's an overview of available routes:

### 📁 Disputes
```
GET /api/v1/disputes – List all disputes

GET /api/v1/disputes/:id – Get a single dispute by ID

POST /api/v1/disputes – Create a new dispute

PUT /api/v1/disputes/:id – Update a dispute

DELETE /api/v1/disputes/:id – Delete a dispute

GET /api/v1/disputes/stats – Get dispute statistics
```
### 🔔 Notifications
```
POST /api/v1/notifications – Create a new notification

GET /api/v1/notifications – Get all notifications (with query filters)

GET /api/v1/notifications/:id – Get a single notification by ID

PATCH /api/v1/notifications/:id/read – Mark a notification as read
```

### 💳 Transactions
```
POST /api/v1/transactions – Create a new transaction

GET /api/v1/transactions – List all transactions

GET /api/v1/transactions/:id – Get a transaction by ID

PUT /api/v1/transactions/:id – Update a transaction

DELETE /api/v1/transactions/:id – Delete a transaction

GET /api/v1/transactions/stats – Get overall transaction statistics

GET /api/v1/transactions/agent/:agent_id/stats – Get transaction stats for a specific agent
```
#### (More endpoints available in the Postman Docs)

## 🧪 Running Tests
```npm test```

## 🧑‍💻 Contributing

- Fork the repo
- Create your branch (git checkout -b feat/feature-name)
- Commit your changes
- Push and open a Pull Request
