import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import LoginPage from './pages/Auth/LoginPage.tsx';
import ProductsPage from './pages/Products/ProductsPage';
import UsersPage from './pages/Users/UsersPage';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import ProductFormPage from './pages/Products/ProductFormPage';
import UserFormPage from './pages/Users/UserFormPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';
import RootInitializer from '@/components/RootInitializer.tsx';
import './index.css';

function Router() {
  return (
    <BrowserRouter>
      <RootInitializer>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/products" replace />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/create" element={<ProductFormPage />} />
            <Route path="products/edit/:id" element={<ProductFormPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/create" element={<UserFormPage />} />
            <Route path="users/edit/:id" element={<UserFormPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </RootInitializer>
    </BrowserRouter>
  );
}

export default Router;
