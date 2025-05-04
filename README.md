[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# Hosted WebApp URL = 
# REST Countries Explorer

A React application that allows users to explore countries around the world, search by various criteria, and save favorites. This project uses the [REST Countries API](https://restcountries.com/) to fetch and display country data.

![REST Countries Explorer](./screenshots/app-screenshot.png)

## Features

- Browse all countries with essential information
- Search countries by name
- Filter countries by region or language
- View detailed information about each country
- Toggle between light and dark mode
- User authentication (client-side)
- Save and manage favorite countries

## Technologies Used

- React 19
- React Router v7
- Tailwind CSS for styling
- REST Countries API for data
- Jest and React Testing Library for testing

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/rest-countries-app.git
cd rest-countries-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
rest-countries-app/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/             # React context providers
│   ├── pages/               # Top-level page components
│   ├── services/            # API service functions
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Entry point
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## API Integration

This project uses the [REST Countries API v3.1](https://restcountries.com/v3.1/), which provides comprehensive information about countries worldwide. The API is free to use and doesn't require authentication.

Key endpoints used:

- `/all` - Get all countries
- `/name/{name}` - Search by country name
- `/region/{region}` - Filter by region
- `/alpha/{code}` - Get country by code

## Authentication

The application implements a client-side authentication system using browser localStorage. In a production environment, this should be replaced with a secure backend authentication service.

Current features:

- User registration and login
- Session persistence
- Secure favorites management

## Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## Challenges and Solutions

### API Integration Challenges

**Challenge 1: Language Filtering**
The REST Countries API doesn't provide a direct endpoint for filtering countries by language.

**Solution:**
Implemented a client-side filtering solution by fetching all countries and then filtering them based on their language properties.

**Challenge 2: Performance with Large Datasets**
Loading all countries at once could lead to performance issues, especially on slower connections.

**Solution:**
Implemented efficient state management, loading indicators, and lazy-loaded images to improve the user experience.

### Testing Challenges

**Challenge: Mocking API Calls**
Testing components that make API calls required proper mocking of the fetch API.

**Solution:**
Used Jest's mocking capabilities to simulate API responses, allowing for reliable and consistent tests.

### Dark Mode Implementation

**Challenge: Consistent Theme Across Components**
Maintaining a consistent dark/light theme across all components was challenging.

**Solution:**
Used Tailwind CSS's dark mode utility and React context to provide a consistent theme experience across the entire application.

## Future Improvements

- Implement a backend service for secure authentication
- Add pagination for better performance with large datasets
- Enhance the favorites feature with categories or notes
- Add offline support using service workers
- Improve accessibility features

## License

This project is licensed under the MIT License - see the LICENSE file for details.
