import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="fixed" className="z-50 bg-[#1976d2] shadow-md">
      <Toolbar>
        <Typography variant="h6" component="div" className="flex-grow font-bold tracking-wide">
          CSE Portal Admin
        </Typography>
        <Button color="inherit" onClick={handleLogout} className="font-semibold">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;