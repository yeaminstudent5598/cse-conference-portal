import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import AppShell from './components/layout/AppShell';
import OverviewPage from './features/dashboard/OverviewPage';
import CoursesPage from './features/courses/CoursesPage';
import CategoriesPage from './features/categories/CategoriesPage';
import EnrollmentsPage from './features/enrollments/EnrollmentsPage';
import UsersPage from './features/users/UsersPage';
import RolesPage from './features/roles/RolesPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<OverviewPage />} />
        <Route path="/courses" element={<CoursesPage />} /> 
        <Route path="/categories" element={<CategoriesPage />} /> 
        <Route path="/enrollments" element={<EnrollmentsPage />} /> 
        <Route path="/users" element={<UsersPage />} /> 
        <Route path="/roles" element={<RolesPage />} /> 
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
export default App;