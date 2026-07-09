# ePharma Backend

A robust Node.js and Express backend for an e-commerce pharmacy platform. This service handles authentication, user management, product and category management, order processing, and secure Stripe-based payments.

## Overview

ePharma Backend provides the core API layer for the ePharma application. It is designed to support a modern online pharmacy experience with reliable data persistence, JWT-based authentication, and payment integration.

## Features

- User registration and authentication
- JWT-based authorization
- User profile management
- Product and category management
- Order creation and tracking
- Stripe payment integration
- MongoDB database support with Mongoose
- CORS-enabled API for frontend integration

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Stripe
- dotenv, cors, body-parser, cookie-parser

## Project Structure

```bash
.
├── app.js                  # Main server entry point
├── controllers/            # Request handlers and business logic
├── models/                 # Mongoose schemas and models
├── routes/                 # API route definitions
├── public/                 # Static assets
├── src/                    # Frontend-related source files
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Prerequisites

Before running this project, make sure you have:

- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string
- A Stripe account for payment integration

## Installation

```bash
git clone https://github.com/skzaffarekbal/ePharma-backend.git
cd ePharma-backend
npm install
```

## Environment Variables

Create a `.env` file in the project root and add the following values:

```env
DATABASE=<your-mongodb-connection-string>
PORT=8000
SECRET=your-jwt-secret-key
STRIPE_SK=<your-stripe-secret-key>
```

> Use your actual MongoDB connection string and Stripe secret key from your respective dashboards.

## Running the Application

```bash
npm start
```

The server will start on the port defined in your `.env` file or default to `8000`.

## API Modules

The application exposes REST APIs under the following route groups:

- `/api/auth` for authentication
- `/api/user` for user operations
- `/api/category` for categories
- `/api/product` for products
- `/api/order` for orders
- `/api/paymentStripe` for Stripe payments

## Repository Workflow

A recommended workflow for contributing to this repository:

1. Create a new branch from `main` for each feature or fix.
2. Make your changes and keep commits focused.
3. Run the app locally and verify the relevant endpoints.
4. Push your branch and open a pull request.
5. Include a clear summary of the change and any testing notes.

Example:

```bash
git checkout -b feature/add-product-search
git add .
git commit -m "Add product search support"
git push origin feature/add-product-search
```

## Contributing

Contributions are welcome. If you would like to improve this project:

- Fork the repository
- Create a feature branch
- Make your changes
- Submit a pull request with a clear description

## License

This project is licensed under the ISC License.
