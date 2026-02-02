# Backend Integration Setup

## Installation

1. Install backend dependencies:
```bash
npm install express cors
npm install -D nodemon
```

2. Start the backend server:
```bash
node server.js
# or for development with auto-reload:
npx nodemon server.js
```

## API Endpoints

- `GET /api/products` - Get all products with optional filters
  - Query params: `category`, `sortBy`, `maxPrice`, `color`, `size`
- `GET /api/categories` - Get all categories with subcategories

## Frontend Changes

The CategoryPage now:
- Fetches data from backend API instead of using hardcoded arrays
- Includes loading states and error handling
- Automatically refetches data when filters change
- Uses TypeScript interfaces for type safety

## Next Steps

1. Replace the sample data in server.js with a real database
2. Add authentication and user management
3. Implement product search functionality
4. Add pagination for better performance