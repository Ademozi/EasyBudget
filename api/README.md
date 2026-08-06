# server.js VS app.js
```
server.js
    |
    |-- Starts the server
    |-- Connects to database
    |-- Listens on a port
```
```
app.js
    |
    |-- Creates Express application
    |-- Adds middleware
    |-- Adds routes
```

# Optimization

This version is great, but there's a small performance improvement we can make.

Right now, these two database operations run one after the other:

```
const totalTransactions = await Transaction.countDocuments(filter);

const transactions = await Transaction.find(...);
```

Since they don't depend on each other, we can run them at the same time using Promise.all(), which reduces the total response time.

Example:
```
const [totalTransactions, transactions] = await Promise.all([
    Transaction.countDocuments(filter),
    Transaction.find(filter)
        .populate("category")
        .sort({ date: -1 })
        .skip(skip)
        .limit(Number(limit))
]);
```

This is a common optimization you'll see in production Node.js applications because it lets MongoDB handle both queries concurrently. After that, we'll move on to implementing Update and Delete while ensuring users can only modify or remove their own transactions.