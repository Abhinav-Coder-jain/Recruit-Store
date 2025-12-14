import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RequireAuth from './features/auth/RequireAuth.jsx';
import ProductListingPage from './pages/ProductListingPage.jsx';
import ProductDetailPage from './pages/ProductDetailsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/CartPage.jsx';
import WalletPage from './pages/WalletPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import SubscriptionPage from './pages/SubscriptionPage.jsx';





const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div className="p-10 text-center text-red-600">404: Page Not Found</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductListingPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "category/:categoryName",
        element: <ProductListingPage />, // Reusing Listing page for filtered views
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      // Protected Routes (We will wrap these in a RequireAuth component later)
      {
        path: "cart",
        element: (
        <RequireAuth>
        <CartPage />
        </RequireAuth>),
      },
      {
        path: "checkout",
        element:  <RequireAuth>
        <CheckoutPage />
        </RequireAuth>,
      },
      {
        path: "wallet",
        element:  <RequireAuth>
        <WalletPage />
        </RequireAuth>,
      },
      {
        path: "orders",
        element: <RequireAuth>
        <OrdersPage />
        </RequireAuth>,
      }
      , {
        path: "subscription",
        element: <RequireAuth>
        <SubscriptionPage />
        </RequireAuth>,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;  