# Group Expense Splitter

A web application for managing user groups, creating transactions, and splitting expenses between group members.

- **Frontend:** React + TypeScript + Tailwind CSS  
- **Backend:** ASP.NET Core Web API + EF Core In Memory Database  
- **Logic:** All calculation rules handled in backend

## Features

### Groups Page
- View all your groups with the amount you owe or are owed in each.
- Create a new group (title only).
- Amount indicators show debts/credits per group.

### Group Details Page
- View group title and members with owed/owing amounts.
- Settle amounts if not null.
- View transactions for the group.
- Add new members.
- Remove members (only if settled with everyone).
- Create a new transaction.

### New Transaction Page
- Choose payer.
- Enter total amount.
- Split options:
  - **Equally** – divides amount equally among members.
  - **Percentage** – assign percentage to each member, converted to amounts.
  - **Dynamic** – manually enter exact amount for each member (including payer).

## Technical Details
- Backend: ASP.NET Core + EF Core In-Memory DB for storage.
- Frontend: React with chosen UI library.
- All calculation logic lives in the backend.
- No authentication for demo purposes.

## Backend Repository
[Group Expense Splitter Backend](https://github.com/aldask/Group-Expenses-API)

## Getting Started

### Clone the repository

```bash
git clone https://github.com/aldask/GroupsExpenses_FE.git
```

### Install dependencies
```bash
npm install
```

### Run the app
```bash
npm run dev
```
Runs at: [http://localhost:5173](http://localhost:5173)
