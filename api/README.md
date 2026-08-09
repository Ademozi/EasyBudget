# EasyBudget

A simple and personal expense tracker designed to make managing everyday money easier.

EasyBudget allows users to track their income and expenses, organize transactions with reusable categories, monitor their current balance, and create savings goals for things they want to buy or experiences they want to fund.

The project is designed with a RESTful backend so the same API can later be used by both a web application and a mobile application.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* Password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* Get currently authenticated user

### 💰 Transactions

* Add income
* Add expenses
* Categorize transactions
* Reuse previously created categories
* Update transactions
* Delete transactions
* View transaction history
* Filter transactions
* Pagination
* User ownership protection

### 📊 Dashboard

The dashboard provides an overview of the user's finances:

* Total balance
* Total income
* Total expenses
* Recent transactions
* Savings goals overview

### 🎯 Savings Goals

Create goals for things you want to save money for.

Examples:

* Gaming chair
* Vacation
* Online course
* New phone
* Personal project

Each goal supports:

* Target amount
* Current saved amount
* Remaining amount
* Progress percentage
* Optional deadline
* Adding money toward the goal
* Deleting a goal

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* express-validator

### Development

* Nodemon
* Postman
* Git / GitHub

### Frontend

The frontend will be developed separately using React and will consume the REST API.

### Future Mobile Application

The backend API is designed to be reusable by a future mobile application.

---

## 🏗️ Architecture

EasyBudget follows a modular REST API architecture.

```text
                         EasyBudget
                             │
                    ┌────────┴────────┐
                    │                 │
               Web Client        Mobile Client
                 React              Future
                    │                 │
                    └────────┬────────┘
                             │
                         REST API
                             │
                    Node.js + Express
                             │
                    ┌────────┴────────┐
                    │                 │
                 MongoDB          JWT Auth
```

The backend is responsible for authentication, business logic, validation, data persistence, and authorization.

---

## 📁 Project Structure

```text
api/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── transactionController.js
│   │   ├── dashboardController.js
│   │   └── goalController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   ├── Category.js
│   │   └── Goal.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── goalRoutes.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── findOrCreateCategory.js
│   │   ├── ownership.js
│   │   └── formatGoal.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── transactionValidator.js
│   │   └── goalValidator.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# 🔑 Authentication

EasyBudget uses JWT authentication.

After successfully logging in, the server returns a JWT:

```text
Authorization: Bearer <token>
```

Protected endpoints use authentication middleware to identify the current user.

User-owned resources are always queried using both:

```javascript
{
    _id: resourceId,
    user: req.user._id
}
```

This prevents users from accessing or modifying resources belonging to another user.

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint             | Description         | Protected |
| ------ | -------------------- | ------------------- | --------- |
| POST   | `/api/auth/register` | Register a new user | ❌         |
| POST   | `/api/auth/login`    | Login               | ❌         |
| GET    | `/api/auth/me`       | Get current user    | ✅         |

---

## Transactions

| Method | Endpoint                | Description         | Protected |
| ------ | ----------------------- | ------------------- | --------- |
| POST   | `/api/transactions`     | Create transaction  | ✅         |
| GET    | `/api/transactions`     | Get transactions    | ✅         |
| GET    | `/api/transactions/:id` | Get one transaction | ✅         |
| PATCH  | `/api/transactions/:id` | Update transaction  | ✅         |
| DELETE | `/api/transactions/:id` | Delete transaction  | ✅         |

Transactions support filtering and pagination.

Example:

```http
GET /api/transactions?page=1&limit=20
```

---

## Dashboard

| Method | Endpoint         | Description            | Protected |
| ------ | ---------------- | ---------------------- | --------- |
| GET    | `/api/dashboard` | Get financial overview | ✅         |

The dashboard provides aggregated information such as:

```text
Total Income
Total Expenses
Balance
Recent Transactions
Savings Goals
```

---

## Savings Goals

| Method | Endpoint                   | Description         | Protected |
| ------ | -------------------------- | ------------------- | --------- |
| POST   | `/api/goals`               | Create a goal       | ✅         |
| GET    | `/api/goals`               | Get user's goals    | ✅         |
| PATCH  | `/api/goals/:id/add-money` | Add money to a goal | ✅         |
| DELETE | `/api/goals/:id`           | Delete a goal       | ✅         |

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB or a MongoDB Atlas account
* Git

---

## 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd EasyBudget
```

---

## 2. Install dependencies

```bash
cd api
npm install
```

---

## 3. Configure environment variables

Create a `.env` file inside the `api` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit your `.env` file.

---

## 4. Start the development server

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:5000
```

You should see:

```text
EasyBudget API is running...
```

---

# 🧪 API Testing

The backend can be tested using Postman.

Recommended testing flow:

```text
Register
   ↓
Login
   ↓
Copy JWT token
   ↓
Authorize protected requests
   ↓
Create transaction
   ↓
View transactions
   ↓
Update / delete transaction
   ↓
View dashboard
   ↓
Create savings goal
   ↓
Add money to goal
   ↓
View goals
```

---

# 🔒 Security

EasyBudget implements several security practices:

* Passwords are hashed using bcrypt.
* Passwords are never returned through authentication responses.
* JWT is used for authentication.
* Protected routes require a valid token.
* User-owned resources are protected using ownership checks.
* Request data is validated using `express-validator`.
* Sensitive configuration is stored in environment variables.

---

# 🧠 Design Principles

The project follows several backend development principles:

### Separation of concerns

Controllers, models, routes, middleware, validators, and utilities are separated.

### Reusable logic

Common functionality such as JWT generation, ownership checks, category creation, and goal formatting is extracted into reusable utilities.

### Data integrity

Derived values such as:

```text
Progress
Remaining amount
Completion status
```

are calculated from the stored source data instead of being duplicated in the database.

### User isolation

Every user can only access their own:

```text
Transactions
Categories
Goals
Dashboard data
```

---

# 🚧 Roadmap

## Backend

* [x] User registration
* [x] User login
* [x] JWT authentication
* [x] Transaction CRUD
* [x] Category reuse
* [x] Transaction filtering
* [x] Pagination
* [x] Dashboard
* [x] Savings goals
* [x] Goal progress tracking
* [x] Ownership protection

## Frontend

* [ ] React application
* [ ] Authentication pages
* [ ] Dashboard
* [ ] Transaction management
* [ ] Transaction history
* [ ] Savings goals
* [ ] Responsive design
* [ ] API integration

## Future

* [ ] Mobile application
* [ ] Todo / Sada9a feature
* [ ] Recurring transactions
* [ ] Monthly budgets
* [ ] Financial statistics
* [ ] Notifications

---

# 📱 Future Mobile Support

One of the goals of EasyBudget is to eventually make the application available on mobile.

The backend is intentionally built as a REST API so it can be consumed by different clients.

```text
                    EasyBudget API
                          │
             ┌────────────┼────────────┐
             │            │            │
           React        Mobile       Future
            Web           App        Clients
```

This means the business logic and database do not need to be rebuilt when a mobile application is introduced.

---

# 🤝 Contributing

This project is primarily a personal project, but suggestions and improvements are welcome.

If you want to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit your changes.
5. Push the branch.
6. Open a Pull Request.

---

# 📄 License

This project is currently intended for personal and educational use.
