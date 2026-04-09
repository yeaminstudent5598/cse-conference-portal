import { Outlet, Navigate } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

const AppShell = () => {
  const token = localStorage.getItem('token');

  // টোকেন না থাকলে লগিন পেজে পাঠিয়ে দিবে
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Topbar />
      <Sidebar />
      {/* মেইন কন্টেন্ট এরিয়া (Topbar এর নিচে এবং Sidebar এর ডানে) */}
      <main className="flex-1 pt-20 pl-64 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;