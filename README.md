# RecruitStore - Enterprise E-Commerce Application

RecruitStore is a full-stack e-commerce application designed to mimic a real-world enterprise platform. It features a complete user journey including secure authentication, product discovery, a digital wallet system, shopping cart management, and responsive design.

## 🚀 Live Demo
[Link to your Vercel App will go here]

## ✨ Key Features

- **Authentication & Security:** - Secure Login/Signup with Email & Password (Firebase Auth).
  - Form validation using Zod & React Hook Form.
  - Protected Routes ensuring secure session persistence.

- **Dynamic UI/UX:**
  - **Dark/Light Theme System:** System-wide color inversion using Tailwind CSS.
  - **Dynamic Pagination:** Custom hook that adjusts grid items based on screen width.
  - **Glassmorphism Navbar:** Sticky navigation with backdrop blur.
  - **Skeleton Loading:** Optimized data fetching feedback to reduce CLS.

- **Core E-Commerce Functionality:**
  - **Digital Wallet:** Real-time Firestore integration for store credit transactions.
  - **Shopping Cart:** Redux Toolkit implementation for global state management.
  - **Subscription Model:** "VIP" status toggles global pricing logic.
  - **Invoicing:** Custom print-ready invoice generation modal.

- **Advanced Data Handling:**
  - **TanStack Query (React Query):** For efficient server-state caching and background updates.
  - **Debounced Search:** URL-synchronized search filters for shareable links.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **State Management:** Redux Toolkit (Client), TanStack Query (Server)
- **Backend:** Firebase (Auth, Firestore)
- **UI Components:** Lucide React (Icons), React Hot Toast (Notifications)

## ⚡ Getting Started

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/recruit-store.git](https://github.com/your-username/recruit-store.git)
