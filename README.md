# Tastique — Frontend 🍽️

> A modern, responsive food ordering UI built with React and Stripe. Customers can explore the menu, manage their cart, pay securely, and track orders. Admins manage orders via a dashboard.

---
🌐 **Website Live Link:** [Testique Food Resturent](https://testique.netlify.app/)

## ✨ Tech Stack

- React 18, React Router
- Context API (Auth, Cart)
- Firebase Authentication (email/password)
- Stripe (client) — @stripe/react-stripe-js
- Styling: Tailwind CSS utility classes
- UI/UX: Framer Motion, SweetAlert2
- HTTP: fetch / axios (admin views)

Companion backend: Node.js, Express, MongoDB
- Users live in `UsersDB`
- Orders live in `OrdersDB` (`OrdersCollection`)

## 🚀 Core Features

- Customer
  - Browse menu and view item details
  - Add to cart, update quantities, view order summary
  - Checkout with Stripe (PaymentIntent flow)
  - Place orders; each item has a unique productId
  - View “My Orders” with per-item details (productId, name, price, qty)
- Admin
  - Orders management table (status update, delete)
  - Displays user name and timestamps
- General
  - Auth-protected routes and dashboards
  - Responsive UI with smooth interactions

## 🧭 Project Structure (Frontend)

- src/Pages/* — top-level pages (Menu, Cart, CheckOut, etc.)
- src/Components/AdminDashboard/* — admin views (Orders, Users, Analytics)
- src/Components/Customers/* — customer views (Orders, Profile, Favorites)
- src/Provider/* — global contexts (Auth, Cart)
- src/Routes/Routes.jsx — route configuration

## 🧱 Orders Data Model

Stored in OrdersDB.OrdersCollection:
- userId — MongoDB user _id
- orderId — app-level order identifier (e.g., ORD-...)
- items[] — { productId, name, price, quantity }
- totalAmount, status, address, createdAt, updatedAt

## 🛠️ Getting Started

Prerequisites
- Node.js 18+
- Backend API running at https://testique-backend.onrender.com

Install & Run
```
npm install
npm run dev
```

Authentication
- Email/password via Firebase
- On login, the app fetches the user from backend and stores the Mongo _id as user.id

Payments
- Requests a PaymentIntent from backend (/stripe/create-payment-intent) and confirms payment via Stripe Elements

## ⚙️ Configuration

- API base URL is currently https://testique-backend.onrender.com in several components (e.g., CheckOut.jsx, admin orders). For deployment, centralize this with an env var and a single HTTP client.
- Firebase config is in src/firebase/firebase.init.js — set your environment values accordingly.

## 🧪 Scripts

- npm run dev — start development server
- npm run build — create production build
- npm run preview — preview production build

## 🔭 Future Roadmap (Planned Upgrades)

- Developer Experience and Architecture
  - Centralized API client with interceptors, typed responses
  - Environment-driven config for API and Stripe keys
  - Monorepo-ready structure and modular services

- Customer Experience
  - Menu pagination
  - Favorites with personalization and recommendations
  - Address book and saved payment methods
  - Order tracking timeline with real-time status updates
  - Coupon codes, discounts, and loyalty points
  - Multi-currency and localization (i18n)

- Admin & Operations
  - Advanced analytics and export (CSV/PDF)
  - Bulk status updates and order batching
  - Inventory hooks and low-stock alerts

- Quality, Performance, and Reliability
  - Error boundaries and retry/backoff for network requests
  - Unit/integration tests (Jest + React Testing Library)
  - E2E tests (Playwright/Cypress) and visual regression
  - Code-splitting, image optimization, performance budgets
  - Accessibility improvements (focus states, keyboard nav, ARIA)
  - PWA support: offline cart and order history

## 📝 Notes

- Backend generates unique productId values when missing and persists orders in OrdersDB. Ensure backend is running with correct Mongo and Stripe credentials.
