import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<div className="p-10 text-2xl">Dashboard Working!</div>} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;